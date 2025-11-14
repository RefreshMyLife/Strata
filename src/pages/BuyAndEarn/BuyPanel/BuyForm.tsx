/** @jsxImportSource @emotion/react */

/*
 * TRANSACTION STATUS MODAL DEMO SYSTEM
 *
 * This component includes a demo system for testing the transaction modal UI states for ALL flows:
 * 1. PRE-APPROVED TOKENS (Single Step): Only "Transaction Execution" step
 * 2. NON-APPROVED TOKENS (Two Steps): "Token Approval" → "Transaction Execution"
 * 3. FAILURE MODAL: Shows "Transaction Failed" with token amounts
 *
 * QUICK SETUP FOR TESTING PRE-APPROVED TOKENS:
 * 1. Set demoMode = true (line ~181)
 * 2. Set DEMO_MODE = 'preapproved' (line ~180)
 * 3. Change DEMO_STEP value (line ~179) to see different states:
 *    - 0: Modal closed
 *    - 1: Transaction Execution in progress (single step with spinner)
 *    - 2: Transaction Execution completed (checkmark)
 *    - 3: Success modal with "Transaction Successful" message
 *
 * QUICK SETUP FOR TESTING NON-APPROVED TOKENS:
 * 1. Set demoMode = true (line ~181)
 * 2. Set DEMO_MODE = 'not_approved' (line ~180)
 * 3. Change DEMO_STEP value (line ~179) to see different states:
 *    - 0: Modal closed
 *    - 1: Token Approval in progress (spinner on right)
 *    - 2: Token Approval completed (checkmark), Transaction Execution in progress
 *    - 3: Both steps completed
 *    - 4: Success modal
 *
 * QUICK SETUP FOR TESTING FAILURE MODAL:
 * 1. Set demoMode = true (line ~181)
 * 2. Set DEMO_MODE = 'failure' (line ~180)
 * 3. DEMO_STEP can be any value - shows failure modal with "2,938 USDe → 2,338 srUSDe" text
 *
 * FOR PRODUCTION:
 * 1. Set demoMode = false
 * 2. Remove demo-related code (marked with // DEMO comments)
 * 3. Use the progression system in handleApprove() and handleDeposit() functions
 */
import { Box } from '@mui/material';
import { getTransaction, getTransactionReceipt } from '@wagmi/core';
import BigNumber from 'bignumber.js';
import {
    ApproveTokenStepsProps,
    Icon,
    Modal,
    PrimaryButton,
    TextButton,
    TransactionStep,
} from 'components';
import { $bigint } from 'dequanto/utils/$bigint';
import { ContractReceipt } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import config from 'src/config';
import web3Config from 'src/libs/wallet/Web3Wrapper/config';
import { getUniqueContract } from 'src/packages/contracts';
import { CommonService } from 'src/services/CommonService';
import { OracleService } from 'src/services/OracleService';
import { PermitService } from 'src/services/PermitService';
import { TokenService } from 'src/services/TokenService';
import { TrancheService } from 'src/services/TrancheService';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertTokensToWei, convertWeiToTokens } from 'utilities';
import { useAccount } from 'wagmi';

import { TokenSelectPanel } from '../components/TokenSelectPanel';
import img_chevronDown from 'assets/img/icons/chevron-down.svg';
import img_doubleArrow from 'assets/img/icons/double-arrow.svg';
import { AmountForm } from 'containers/AmountForm';
import { useAuth, useAuthModal } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';
import useTokenApproval from 'hooks/useTokenApproval';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import addTokenToWallet from 'src/clients/web3/addTokenToWallet';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { TOKENS } from 'src/constants/tokens';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { PromiseUtil } from 'src/utilities/PromiseUtil';

import { useQuoteState } from '../state/QuoteState';
import { useStyles } from './styles';

export interface BuyFormUiProps {
    predeposit: TPreDepositData;
    token: Token;
    tokens: Token[];
    tokenNeedsToBeApproved?: boolean;
    submitButtonLabel: string;
    submitButtonDisabledLabel: string;
    successfulTransactionTitle: string;
    successfulTransactionDescription: string;
    onSubmit: (token: Token, amountWei: BigNumber) => Promise<ContractReceipt>;
    isSubmitting: boolean;
    availableTokensLabel: string;
    minimumTokens?: number;
    minimumTokensLabel?: string;
    isTokenApproved: ApproveTokenStepsProps['isTokenApproved'];
    approveToken: ApproveTokenStepsProps['approveToken'];
    isApproveTokenLoading: ApproveTokenStepsProps['isApproveTokenLoading'];
    isWalletSpendingLimitLoading: ApproveTokenStepsProps['isWalletSpendingLimitLoading'];
    revokeWalletSpendingLimit: () => Promise<unknown>;
    isRevokeWalletSpendingLimitLoading: boolean;
    walletSpendingLimitTokens?: BigNumber;
    lockingPeriodMs?: number;
    transactionModalProps?: {
        showTransactionModal: boolean;
        setShowTransactionModal: (show: boolean) => void;
        transactionSteps: TransactionStep[];
        setTransactionSteps: (steps: TransactionStep[]) => void;
    };
    tokenSelectModalProps?: {
        showTokenSelectModal: boolean;
        setShowTokenSelectModal: (show: boolean) => void;
        tokenSelectData: any;
        setTokenSelectData: (data: any) => void;
    };
}

export const BuyFormUi: React.FC<BuyFormUiProps> = ({
    predeposit,
    token,
    tokens,
    tokenNeedsToBeApproved = false,
    availableTokensLabel,
    minimumTokens,
    minimumTokensLabel,
    submitButtonLabel,
    submitButtonDisabledLabel,
    successfulTransactionTitle,
    successfulTransactionDescription,
    onSubmit,
    isTokenApproved,
    approveToken,
    isApproveTokenLoading,
    isWalletSpendingLimitLoading,
    walletSpendingLimitTokens,
    revokeWalletSpendingLimit,
    isRevokeWalletSpendingLimitLoading,
    lockingPeriodMs,
    transactionModalProps,
    tokenSelectModalProps,
}) => {
    const toTokens = [TOKENS.jrusde, TOKENS.srusde];
    tokens = [TOKENS.usde, TOKENS.susde, TOKENS.pusde];

    const depositor = predeposit.trancheDepositorContract;

    const { t } = useTranslation();
    const styles = useStyles();
    const { accountAddress, signer } = useAuth();
    const { connector } = useAccount();
    const { openAuthModal } = useAuthModal();
    if (accountAddress && connector != null) {
        console.info('CONNECTOR', connector.name, connector.id);
    }
    const avoidPermitWallet = useMemo(() => {
        if (connector == null) {
            return false;
        }
        let isOkx = /OKX/i.test(connector?.name) || /okex/i.test(connector?.id);
        let shouldAvoid = isOkx;
        return shouldAvoid;
    }, [connector]);

    const {
        tokenFrom: selectedFromToken,
        tokenTo: selectedToToken,
        amountFrom: selectedFromAmount,
        amountTo: selectedToAmount,
        isLoading,
        error,
        // setters you call from UI
        setFromAmount: setFromSelectedAmount,
        setToAmount: setToSelectedAmount,
        setFromToken: setFromSelectedToken,
        setToToken: setToSelectedToken,
        swapTokens,
    } = useQuoteState(TOKENS.usde, CommonService.preferredTranche);

    const { data: allowanceWei } = TokenService.useGetAllowance(
        selectedFromToken,
        predeposit.trancheDepositorContract.address,
        accountAddress,
    );
    const [isSubmitting, setLoadingState] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [hasError, setHasError] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const { data: erc4626PPS } = OracleService.useGetERC4626PricePerShareMany([
        TOKENS.srusde,
        TOKENS.jrusde,
        TOKENS.susde,
    ]);
    const action = !accountAddress ? 'connect' : 'deposit';

    const { data: balances } = TokenService.useGetBalances(
        [TOKENS.susde, TOKENS.usde, TOKENS.pusde],
        accountAddress,
    );

    const { data: maxMint } = TrancheService.useMaxMint(accountAddress);

    const validation = useMemo(() => {
        if (!selectedFromAmount) {
            return { valid: false, message: 'Enter Amount' };
        }
        // Check quote error
        if (error) {
            return { valid: false, message: error };
        }
        if (balances != null) {
            let balance = balances.find(x => x.symbol === selectedFromToken.symbol)?.balance;
            let hasError = selectedFromAmount > balance;
            if (hasError) {
                return { valid: false, message: 'Insufficient Balance' };
            }
        }
        if (maxMint != null) {
            let maxCap = selectedToToken.symbol === 'srUSDe' ? maxMint.srt : maxMint.jrt;
            let hasError = selectedToAmount > maxCap;
            if (hasError) {
                return {
                    valid: false,
                    message: `${selectedToToken.symbol} minting limit (${NumberUtil.round(maxCap, 3)}) reached`,
                };
            }
        }
        return { valid: true };
    }, [selectedFromToken, selectedFromAmount, selectedToToken, selectedToAmount, balances, error]);

    // Transaction Status Modal states from props
    const { showTransactionModal, setShowTransactionModal, transactionSteps, setTransactionSteps } =
        transactionModalProps || {};

    const selectedToPps = useMemo(() => {
        if (erc4626PPS == null) {
            return null;
        }
        let fromPps =
            selectedFromToken.symbol === 'USDe' || selectedFromToken.symbol === 'pUSDe'
                ? 1
                : erc4626PPS.find(x => x.symbol === selectedFromToken.symbol)?.pps;

        let toPps = erc4626PPS.find(x => x.symbol === selectedToToken.symbol)?.pps;
        return fromPps / toPps;
    }, [erc4626PPS, selectedFromToken, selectedToToken]);

    const availableTokensWei = predeposit.balances?.[selectedFromToken.symbol] ?? BigNumber(0);
    const handleTransactionMutation = useHandleTransactionMutation();
    const invalidateQueries = () => {
        PromiseUtil.clearMemoized();
        PromiseUtil.clearTrackedQuery();
    };

    // useMemo(() => {
    //     handleTransactionMutation({
    //         label: 'Processing Order',
    //         labelSuccess: 'Transaction Successful',
    //         mutate: async () => {
    //             let receipt = await getTransactionReceipt(web3Config, { hash: '0x92602206a871253d3d010dfc81d4900a3b8a9b484f87fa7742417c9a2615b45e' })
    //             console.log(`Rec`, receipt);
    //             return receipt;;
    //         },
    //         successTransactionModalProps: contractReceipt => ({
    //             title: 'Transaction Successful',
    //             content: 'Bought',
    //             amount: {
    //                 valueWei: BigNumberUtil.toWei(20),
    //                 token: TOKENS.usde,
    //             },
    //             transactionHash: contractReceipt.transactionHash,
    //             button: onClick => (
    //                 <TextButton onClick={onClick} className="transparent">
    //                     <Icon name="wallet" />
    //                     &nbsp;Add {TOKENS.srusde.symbol} to Wallet
    //                 </TextButton>
    //             ),
    //             buttonClicked: close => {
    //                 addTokenToWallet(TOKENS.srusde);
    //             },
    //         }),
    //     });
    // },[1]);

    const doDeposit = async (
        vault: Token,
        token: Token,
        amountWei: bigint,
        permitData: null | { deadline; v; r; s },
    ) => {
        setLoadingState(true);
        try {
            const depositor = getUniqueContract({
                name: 'trancheDepositor',
                signerOrProvider: signer,
                chainId: config.networkId,
            });

            let tx =
                permitData == null
                    ? await depositor.deposit(
                          vault.address,
                          token.address,
                          amountWei.toString(10),
                          accountAddress,
                          {
                              swapDeadline: 0,
                              swapAmountOutMinimum: 0,
                              swapTokenOut: '0x0000000000000000000000000000000000000000',
                              minShares: 0,
                          },
                      )
                    : await depositor.depositWithPermit(
                          vault.address,
                          token.address,
                          amountWei.toString(10),
                          accountAddress,
                          {
                              swapDeadline: 0,
                              swapAmountOutMinimum: 0,
                              swapTokenOut: '0x0000000000000000000000000000000000000000',
                              minShares: 0,
                          },
                          permitData.deadline,
                          permitData.v,
                          permitData.r,
                          permitData.s,
                      );
            let result = await tx.wait();
            return result;
        } finally {
            setFromSelectedAmount(0);
            invalidateQueries();
            setLoadingState(false);
        }
    };

    const availableTokens = React.useMemo(
        () =>
            convertWeiToTokens({
                valueWei: availableTokensWei,
                token,
            }),
        [availableTokensWei],
    );

    const minimumTokensFormatted = minimumTokens
        ? useConvertWeiToReadableTokenString({
              valueWei: new BigNumber(minimumTokens).shiftedBy(token.decimals),
              token,
          })
        : null;

    const limitTokens = useMemo(() => {
        if (isTokenApproved && walletSpendingLimitTokens) {
            return BigNumber.minimum(availableTokens, walletSpendingLimitTokens);
        }

        return availableTokens;
    }, [availableTokens, isTokenApproved, walletSpendingLimitTokens]);

    const readableavailableTokens = useConvertWeiToReadableTokenString({
        valueWei: availableTokensWei,
        token,
    });

    const readableLockingPeriod = React.useMemo(() => {
        if (!lockingPeriodMs) {
            return undefined;
        }

        const now = new Date();
        const unlockingDate = new Date(now.getTime() + lockingPeriodMs);

        return t('vault.PreDepositForm.lockingPeriod.duration', { date: unlockingDate });
    }, [lockingPeriodMs?.toFixed()]);

    const handleDeposit = async () => {
        const tokenFrom = selectedFromToken;
        const tokenTo = selectedToToken;
        const amountFrom = selectedFromAmount;
        const amountTo = selectedToAmount;
        const amountWei = BigNumberUtil.toWeiN(amountFrom, tokenFrom.decimals);
        const supportsPermit = !avoidPermitWallet && PermitService.supports(tokenFrom);
        const STEP_APPROVE = supportsPermit ? 'Permit Signature' : 'Token Approval';
        const STEP_TX = 'Transaction Execution';

        setLoadingState(true);
        setShowTransactionModal(true);
        setTransactionSteps([
            { status: 'in_progress', title: STEP_APPROVE },
            { status: 'pending', title: STEP_TX },
        ]);

        let permitData: { deadline; v; r; s };

        if (supportsPermit) {
            try {
                permitData = await PermitService.signPermitEip2612({
                    token: tokenFrom,
                    owner: accountAddress,
                    amountWei: amountWei,
                    signer: signer,
                    spender: depositor.address,
                });
                console.log(`Permit data`, permitData);
            } catch (error) {
                console.error(`Error permit`, error);
                setTransactionSteps([
                    { status: 'failed', title: STEP_APPROVE },
                    { status: 'pending', title: STEP_TX },
                ]);
                setTimeout(() => setShowTransactionModal(false), 2000);
                setLoadingState(false);
                throw error;
            }
        } else {
            try {
                let allowanceWei = await TokenService.getAllowance(
                    tokenFrom,
                    depositor.address,
                    accountAddress,
                );
                let approvalReceipt = await handleTransactionMutation({
                    label: 'Processing Approval',
                    labelSuccess: 'Approval Successful',
                    mutate: async () => {
                        let tx = await TokenService.doApprove(
                            signer,
                            tokenFrom,
                            depositor.address,
                            amountWei.toString(),
                        );
                        return await tx.wait();
                    },
                });
            } catch (error) {
                console.error(`Error processing approval`, error);
                setTransactionSteps([
                    { status: 'failed', title: STEP_APPROVE },
                    { status: 'in_progress', title: STEP_TX },
                ]);
                setTimeout(() => setShowTransactionModal(false), 2000);
                setLoadingState(false);
                throw error;
            }
        }

        setTransactionSteps([
            { status: 'completed', title: STEP_APPROVE },
            { status: 'in_progress', title: STEP_TX },
        ]);

        try {
            await handleTransactionMutation({
                label: 'Processing Order',
                labelSuccess: 'Transaction Successful',
                mutate: async () => {
                    return doDeposit(tokenTo, tokenFrom, amountWei, permitData);
                },
                successTransactionModalProps: contractReceipt => ({
                    title: 'Transaction Successful',
                    content: 'Bought',
                    amount: {
                        valueWei: BigNumberUtil.toWei(selectedToAmount, tokenTo.decimals),
                        token: tokenTo,
                    },
                    transactionHash: contractReceipt.transactionHash,
                    button: onClick => (
                        <TextButton onClick={onClick} className="transparent">
                            <Icon name="wallet" />
                            &nbsp;Add {tokenTo.symbol} to Wallet
                        </TextButton>
                    ),
                    buttonClicked: close => {
                        addTokenToWallet(tokenTo);
                    },
                }),
            });
            setShowTransactionModal(false);
        } catch (error) {
            console.error(`Error processing deposit`, error);
            setTransactionSteps([
                { status: 'completed', title: STEP_APPROVE },
                { status: 'failed', title: STEP_TX },
            ]);
            setTimeout(() => setShowTransactionModal(false), 2000);
            setLoadingState(false);
            throw error;
        }
    };

    const setFromSelectedTokenHandler = (t: Token) => {
        let selected = tokens.find(x => x.address === t.address);
        setFromSelectedToken(selected);
        tokenSelectModalProps.setShowTokenSelectModal(false);
    };
    const setToSelectedTokenHandler = (t: Token) => {
        let selected = toTokens.find(x => x.address === t.address);
        setToSelectedToken(selected);
        tokenSelectModalProps.setShowTokenSelectModal(false);
    };
    const setSelectedAmountHandler = e => {
        let selected = Number(e);
        setFromSelectedAmount(e === '' ? null : selected);
    };

    function formatBuyButtonTitle() {
        if (hasError) {
            return errMessage;
        }
        if (validation?.valid === false) {
            return validation.message;
        }
        if (!selectedFromAmount) {
            return 'Enter Amount';
        }
        return 'Buy';
    }

    if (CommonService.getConnectTick()) {
        openAuthModal();
    }

    return (
        <div css={styles.formContainer}>
            {/* <QuinaryButton css={styles.optionsButton}><img src={img_gear} alt="Options" /></QuinaryButton> */}
            <AmountForm
                //onSubmit={(amount: string) => handleDeposit({ selectedAmount: amount })}
                onSubmit={(amount: string) => handleDeposit()}
                onChange={() => {}}
                initialToken={selectedFromToken}
                initialAmountIn="2"
                initialAmountOut="3"
            >
                {({ dirty, isValid, setFieldValue, values, errors }) => (
                    <>
                        <TokenSelectPanel
                            value={selectedFromAmount}
                            label="From"
                            token={selectedFromToken}
                            tokens={tokens}
                            onTokenSelected={setFromSelectedTokenHandler}
                            onInput={setSelectedAmountHandler}
                            disabled={false}
                            readonly={isSubmitting}
                            showPercentButtons={true}
                            name="amountFrom"
                            tokenSelectModalProps={tokenSelectModalProps}
                        />

                        <div css={styles.arrowContainer}>
                            <img src={img_doubleArrow} alt="Exchange" css={styles.arrowIcon} />
                        </div>

                        <TokenSelectPanel
                            value={selectedToAmount}
                            label="To"
                            token={selectedToToken}
                            tokens={toTokens}
                            onTokenSelected={setToSelectedTokenHandler}
                            //onInput={setSelectedAmountOutHandler}
                            disabled={true}
                            name="amountTo"
                            showPercentButtons={false}
                            tokenSelectModalProps={tokenSelectModalProps}
                            isLoading={isLoading}
                        />

                        <div css={styles.expandedDetails}>
                            <div
                                css={styles.expandToggle}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                <span css={styles.expandToggleText}>
                                    {!selectedToPps && <SvgLoadingInlined />}
                                    {selectedToPps && (
                                        <>
                                            1 {selectedFromToken.symbol} ={' '}
                                            {NumberUtil.formatPrice(selectedToPps)}{' '}
                                            {selectedToToken.symbol}
                                        </>
                                    )}
                                </span>
                                {/* <span css={styles.expandIcon}>
                <img
                  src={img_chevronDown}
                  alt={isExpanded ? "Collapse" : "Expand"}
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    width: '12px',
                    height: '12px',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </span> */}
                            </div>

                            {isExpanded && (
                                <div css={styles.detailsGrid}>
                                    <div css={styles.detailRow}>
                                        <span css={styles.detailLabel}>Method</span>
                                        <span css={styles.detailValue}>Mint</span>
                                    </div>
                                    <div css={styles.detailRow}>
                                        <span css={styles.detailLabel}>Receive at least</span>
                                        <span css={styles.detailValue}>22.84</span>
                                    </div>
                                    <div css={styles.detailRow}>
                                        <span css={styles.detailLabel}>Max Slippage</span>
                                        <span css={styles.detailValue}>0.03%</span>
                                    </div>
                                    <div css={styles.detailRow}>
                                        <span css={styles.detailLabel}>Gas Fee</span>
                                        <span css={styles.detailValue}>$0.16</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* NOTE : Uncomment to see Info Alert */}
                        {/* <InfoAlert message="USDe will be available to claim 7 days after redemption" /> */}

                        {action === 'connect' && (
                            <ConnectButton fullWidth style={{ margin: '0' }} variant="primary" />
                        )}
                        {/* {action === 'approve' && <PrimaryButton
            onClick={() => handleApprove(selectedFromAmount)}
            loading={isSubmitting}
            disabled={hasError || isSubmitting || validation?.valid === false }
            fullWidth
            css={[
              styles.buyButton,
              showTransactionModal && styles.buyButtonModalOpen
            ]}
          >
            {isSubmitting ? 'Approve' : formatBuyButtonTitle()}
          </PrimaryButton>} */}
                        {action === 'deposit' && (
                            <PrimaryButton
                                onClick={() => handleDeposit()}
                                loading={isSubmitting}
                                disabled={validation.valid !== true}
                                fullWidth
                                css={[
                                    !selectedFromAmount
                                        ? styles.enterAmountButton
                                        : styles.buyButton,
                                    showTransactionModal && styles.buyButtonModalOpen,
                                ]}
                            >
                                {formatBuyButtonTitle()}
                            </PrimaryButton>
                        )}
                    </>
                )}
            </AmountForm>

            {/* <OptionsModal /> */}
        </div>
    );
};

export interface BuyFormProps
    extends Omit<
        BuyFormUiProps,
        | 'isTokenApproved'
        | 'approveToken'
        | 'isApproveTokenLoading'
        | 'isWalletSpendingLimitLoading'
        | 'isWalletSpendingLimitLoading'
        | 'revokeWalletSpendingLimit'
        | 'isRevokeWalletSpendingLimitLoading'
    > {
    spenderAddress?: string;
}

const BuyForm: React.FC<BuyFormProps> = ({
    token,
    tokenNeedsToBeApproved = false,
    spenderAddress,
    ...otherProps
}) => {
    const { accountAddress } = useAuth();

    const tokenApprovalProps = useTokenApproval({
        token,
        spenderAddress,
        accountAddress,
    });

    return (
        <BuyFormUi
            token={token}
            tokenNeedsToBeApproved={tokenNeedsToBeApproved}
            {...tokenApprovalProps}
            {...otherProps}
        />
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OptionsModal: React.FC<any> = ({ isOpen = true, handleClose }) => {
    const styles = useStyles();
    return (
        <Modal isOpen={isOpen} title={'Strata Points Farm'} handleClose={handleClose}>
            <Box css={styles.moreInfoContainer}>
                <h3>How it works</h3>
                <p>
                    <h5>1. Deposit USDe/sUSDe or ang other asset</h5>
                    <span>
                        Mint pUSDe to earn Strata Points + Ethena rewards boosted up to 50x.
                    </span>
                </p>
                <p>
                    <h5>2. Earn Points Daily</h5>
                    <span>Earn 30x Strata Points and 30x Ethena Rewards daily on your pUSDe.</span>
                </p>
                <p>
                    <h5>3. Maximize your reward</h5>
                    <span>
                        Boost your rewards the longer you hold pUSDe. Earn even more bu
                        participating in upcoming integrations with partner protocols
                    </span>
                </p>
                <p>
                    <h5>4. Withdraw anytime.</h5>
                    <span>
                        Withdraw instantly to sUSDe at any time. USDe withdrawal requires a 7 day
                        cooldown period.
                    </span>
                </p>
                <PrimaryButton onClick={handleClose} fullWidth>
                    DEPOSIT
                </PrimaryButton>
            </Box>
        </Modal>
    );
};

export default BuyForm;
