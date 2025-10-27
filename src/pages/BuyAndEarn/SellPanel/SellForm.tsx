// SellFormUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button, ConnectWallet, FormikSubmitButton, InfoAlert, LabeledInlineContent, Notice, PrimaryButton, TokenIcon } from 'components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertTokensToWei, convertWeiToTokens, formatTokensToReadableValue } from 'utilities';

import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';

import { useStyles } from '../BuyPanel/styles';
import TransactionForm, { TransactionFormUi } from '../TransactionForm';
import { StakeModal } from '../modals';
import { useAuth } from 'src/context/AuthContext';
import useGetUniqueContract from 'src/hooks/useGetUniqueContract';
import useHandleTransactionMutation from 'src/hooks/useHandleTransactionMutation';
import { Formik } from 'formik';
import formatToReadableDate from 'src/components/charts/ApyChart/formatToReadableDate';
import { queryClient } from 'src/clients/api';
import FunctionKey from 'src/constants/functionKey';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { TOKENS } from 'src/constants/tokens';
import { AmountForm } from 'src/containers/AmountForm';
import { TokenSelectPanel } from '../components/TokenSelectPanel';
import { getGenericContract, getUniqueContract } from 'src/packages/contracts';
import config from 'src/config';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { TokenService } from 'src/services/TokenService';
import img_doubleArrow from 'assets/img/icons/double-arrow.svg';
import { sellButtonStyles, enterAmountButtonStyles } from './styles';
import img_chevronDown from 'assets/img/icons/chevron-down.svg';
import { OracleService } from 'src/services/OracleService';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { useQuoteState } from '../state/QuoteState';
import { TrancheService } from 'src/services/TrancheService';
import { $rpc } from 'src/utilities/$rpc';

type ActiveModal = 'stake' | 'withdraw';

export interface SellFormUiProps {
    preDeposit: TPreDepositData;

    onStake: () => void;
    onWithdraw: () => void;
    closeActiveModal: () => void;
    canWithdraw?: boolean;
    poolIndex?: number;
    activeModal?: ActiveModal;
    className?: string;
    tokenSelectModalProps?: {
        showTokenSelectModal: boolean;
        setShowTokenSelectModal: (show: boolean) => void;
        tokenSelectData: any;
        setTokenSelectData: (data: any) => void;
    };
}

enum PreDepositStatus {
    Pending = 'pending',
    Active = 'active',
    Ended = 'ended',
}

const PanelSection = ({ title }) => {
    const styles = useStyles();
    return (
        <>

            <div css={styles.header} style={{ marginTop: 10 }}>
                <div css={styles.title}>
                    <div
                        style={{
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 10,
                            paddingBottom: 10,
                            background: '#0C1215',
                            borderRadius: 50,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 10,
                            display: 'inline-flex',
                            fontWeight: '600',
                        }}
                    >
                        <div style={{}}>{title}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

const PanelHr = ({ }) => {
    return <div style={{ borderTop: '1px #F3F3F7 solid', marginTop: '10px' }}></div>;
};


export const SellFormUi: React.FC<SellFormUiProps> = ({
    preDeposit,

    onStake,
    activeModal,
    closeActiveModal,
    className,
    tokenSelectModalProps,
}) => {

    const tokensTo = [TOKENS.usde, TOKENS.susde];
    const tokensFrom = [TOKENS.srusde, TOKENS.jrusde];

    const styles = useStyles();
    const { t } = useTranslation();
    const handleTransactionMutation = useHandleTransactionMutation();
    const { accountAddress, signer } = useAuth();

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
    } = useQuoteState(TOKENS.srusde, TOKENS.susde);


    const [hasError, setHasError] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const alertMessage = useMemo(() => {
        if (selectedToToken.symbol === 'USDe') {
            return `USDe will be available to claim 7 days after redemption`;
        }
        if (selectedToToken.symbol === 'sUSDe' && selectedFromToken.symbol === 'jrUSDe') {
            return `sUSDe will be available to claim 7 days after redemption`;
        }
        return null;
    },[selectedFromToken, selectedToToken]);




    const { data: fromBalances } = TokenService.useGetBalances(tokensFrom, accountAddress);
    const { data: erc4626PPS } = OracleService.useGetERC4626PricePerShareMany([
        TOKENS.srusde,
        TOKENS.jrusde,
        TOKENS.susde,
    ]);
    const { data: maxRedeem } = TrancheService.useMaxRedeem(accountAddress);

    const warningMessage = useMemo(() => {
        if (maxRedeem == null || fromBalances == null) {
            return null;
        }
        let balance = fromBalances.find(x => x.symbol === selectedFromToken.symbol)?.balance;
        let max = selectedFromToken.symbol === 'srUSDe' ? maxRedeem.srt : maxRedeem.jrt;
        let diff = Math.abs(max - balance);
        if (diff < 0.01) {
            return null;
        }
        return `${NumberUtil.round(max, 3)} ${selectedFromToken.symbol} redeemable`;
    }, [maxRedeem, selectedFromToken])

     const validation = useMemo(() => {
        if (!selectedFromAmount) {
            return { valid: false, message: 'Enter Amount' };
        }
        // Check quote error
        if (error)  {
          return { valid: false, message: error };
        }
        // Check balance
        if (fromBalances != null) {
            let balance = fromBalances.find(x => x.symbol === selectedFromToken.symbol)?.balance;
            let hasError = selectedFromAmount > balance;
            if (hasError) {
                return { valid: false, message: 'Insufficient Balance' };
            }
        }

        // Check max redeemable
        if (maxRedeem != null && fromBalances != null) {
            let maxCap = selectedFromToken.symbol === 'srUSDe' ? maxRedeem.srt : maxRedeem.jrt;
            let hasError = selectedFromAmount > maxCap;
            if (hasError) {
                return {
                    valid: false,
                    message: `${selectedFromToken.symbol} redemption limit (${NumberUtil.round(maxCap, 3)}) reached`,
                };
            }
        }
        return { valid: true, message: '' };

      }, [selectedFromToken, selectedFromAmount, selectedToToken, selectedToAmount, fromBalances, error]);

    const stakedToken = preDeposit.pUSDe;

    const readableUserStakedTokens = useConvertWeiToReadableTokenString({
        token: preDeposit.pUSDe,
        valueWei: preDeposit.accountStaked,
        addSymbol: false,
    });

    const selectedToPps = useMemo(() => {
        if (erc4626PPS == null) {
            return null;
        }
        let fromPps = erc4626PPS.find(x => x.symbol === selectedFromToken.symbol)?.pps;
        let toPps = selectedToToken.symbol === 'USDe' ? 1 : erc4626PPS.find(x => x.symbol === selectedToToken.symbol)?.pps;
        return fromPps / toPps;
    }, [erc4626PPS, selectedFromToken, selectedToToken]);


    const pUSDeVaultContract = useGetUniqueContract({
        name: 'pUSDeVault',
        passSigner: true,
    });
    const sUSDeContract = useGetUniqueContract({
        name: 'sUSDe',
        passSigner: true,
    });

    const invalidateQueries = () => {
        queryClient.invalidateQueries({
            queryKey: [
                FunctionKey.GET_PRE_DEPOSIT_ACCOUNT_STAKED,
                accountAddress,
            ]
        });
        queryClient.invalidateQueries({
            queryKey: [
                FunctionKey.GET_SUSD_DEPOSIT_ACCOUNT_STAKED,
                accountAddress,
            ]
        });
        queryClient.invalidateQueries({
            queryKey: [
                FunctionKey.GET_PRE_DEPOSIT_TOTALS
            ]
        });
        PromiseUtil.clearMemoized();
        PromiseUtil.clearTrackedQuery();
    };

    const [isSubmitting, setSubmittingProgress] = useState(false);
    const doRedeem = async (tokenFrom: Token, amountWei: BigNumber, tokenTo: Token) => {
        setSubmittingProgress(true);
        try {
            const vault = getGenericContract({
                name: 'tranche',
                address: tokenFrom.address,
                signerOrProvider: signer
            });
            // const strategy = $rpc.contract({ name: 'strategy' });
            // let outBase = await vault.previewRedeem(amountWei.toString(10));
            // let outTokens = await strategy.convertToTokens(tokenTo.address, outBase, 0);
            // console.log(`Preview Redeem`, outTokens.toString());
            let tx = await vault['redeem(address,uint256,address,address)'](tokenTo.address, amountWei.toString(10), accountAddress, accountAddress);
            return await tx.wait();
        } finally {
            invalidateQueries();
            setSubmittingProgress(false);
        }
    };

    const handleRedeem = async () => {
        const amountFromWei = convertTokensToWei({
            value: new BigNumber(selectedFromAmount),
            token: TOKENS.pusde,
        });
        console.log(`AmountWei`, amountFromWei.toString(10));
        const tokenTo = selectedToToken;
        const tokenFrom = selectedFromToken;
        const hintContent = $helpers.getHintContent(tokenFrom, tokenTo);
        return handleTransactionMutation({
            label: 'Processing Order',
            labelSuccess: 'Transaction Successful',
            mutate: () => doRedeem(tokenFrom, amountFromWei, tokenTo),
            successTransactionModalProps: contractReceipt => ({
                title: 'Transaction Successful',
                content: 'Sold',
                amount: {
                    valueWei: amountFromWei,
                    token: tokenFrom,
                },
                hintContent: hintContent,
                transactionHash: contractReceipt.transactionHash,
            }),
        });
    };

    const setFromSelectedTokenHandler = (t: Token) => {
        let selected = tokensFrom.find(x => x.address === t.address);
        setFromSelectedToken(selected);
        tokenSelectModalProps.setShowTokenSelectModal(false);
    };
    const setToSelectedTokenHandler = (t: Token) => {
        let selected = tokensTo.find(x => x.address === t.address);
        setToSelectedToken(selected);
        tokenSelectModalProps.setShowTokenSelectModal(false);
    };
    const setSelectedFromAmountHandler = (e: string | number) => {
        let selected = Number(e);
        setFromSelectedAmount(e === '' ? null : selected);
        //setToSelectedAmount(selected);


    };

    return (
        <>
            <Paper css={styles.container} className={className}>
                <div css={[styles.panelSection]}>
                    <AmountForm
                        onSubmit={handleRedeem}
                        onChange={() => { }}
                        initialToken={selectedFromToken}
                        initialAmount='1'
                        initialAmountIn='2'
                        initialAmountOut='3'
                    >
                        {({ dirty, isValid, setFieldValue, values, errors }) => (
                            <>
                                <TokenSelectPanel
                                    value={selectedFromAmount}
                                    label='From'
                                    name='amountFrom'
                                    token={selectedFromToken}
                                    tokens={tokensFrom}
                                    onTokenSelected={setFromSelectedTokenHandler}
                                    onInput={setSelectedFromAmountHandler}
                                    disabled={false}
                                    readonly={isSubmitting}
                                    showPercentButtons={true}
                                    tokenSelectModalProps={tokenSelectModalProps}
                                />

                                <div css={styles.arrowContainer}>
                                    <img src={img_doubleArrow} alt="Exchange" css={styles.arrowIcon} />
                                </div>

                                <TokenSelectPanel
                                    value={selectedToAmount}
                                    label='To'
                                    name='amountTo'
                                    token={selectedToToken}
                                    tokens={tokensTo}
                                    onTokenSelected={setToSelectedTokenHandler}
                                    readonly={isSubmitting}
                                    disabled={true}
                                    showPercentButtons={false}
                                    tokenSelectModalProps={tokenSelectModalProps}
                                    isLoading={isLoading}
                                />

                                <div css={styles.expandedDetails}>
                                    <div css={styles.expandToggle} onClick={() => setIsExpanded(!isExpanded)}>
                                        <span css={styles.expandToggleText}>
                                            {!selectedToPps && <SvgLoadingInlined /> }
                                            {selectedToPps && (<>
                                                1 {selectedFromToken.symbol} = {NumberUtil.formatPrice(selectedToPps)} {selectedToToken.symbol}
                                            </>)}
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
                                                <span css={styles.detailValue}>Redemption</span>
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

                                {/* { warningMessage && <Notice description={warningMessage} variant='warning'/> } */}
                                { alertMessage && <InfoAlert message={alertMessage} /> }


                                {!accountAddress && <ConnectButton fullWidth style={{ 'margin': '0' }} variant="primary" />}

                                {/* {accountAddress && (selectedFromAmount === null || selectedFromAmount === 0 || selectedFromAmount === '') && (
                                    <Button
                                        fullWidth
                                        disabled={false}
                                        css={enterAmountButtonStyles}
                                    >
                                        Enter Amount
                                    </Button>
                                )} */}

                                {/* {accountAddress && selectedFromAmount && selectedFromAmount > 0 && (
                                    <FormikSubmitButton
                                        loading={isSubmitting}
                                        disabled={hasError || isSubmitting}
                                        fullWidth
                                        enabledLabel={hasError ? errMessage : 'Sell'}
                                        disabledLabel={hasError ? errMessage : 'Sell'}
                                        css={sellButtonStyles}
                                    />
                                ) || ''} */}
                                { accountAddress && (<PrimaryButton
                                        onClick={() => handleRedeem()}
                                        loading={isSubmitting}
                                        disabled={isSubmitting || validation.valid !== true}
                                        fullWidth
                                        css={[
                                        (!selectedFromAmount) ? styles.enterAmountButton : styles.buyButton,

                                        ]}
                                    >
                                        { validation.valid ? 'Sell' : validation.message }
                                    </PrimaryButton>)
                                }

                                {/* Suppress form errors for demo */}
                            </>
                        )}
                    </AmountForm>
                </div>
            </Paper>


        </>
    );
};

export type SellFormProps = Omit<
    SellFormUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

const SellForm: React.FC<SellFormProps> = ({
    preDeposit,
    ...sellFormUiProps
}) => {
    const [activeModal, setActiveModal] = useState<ActiveModal | undefined>();
    const onStake = () => {
        // Block action is user has LUNA or UST enabled as collateral
        setActiveModal('stake');
    };

    const onWithdraw = async () => {
        // Block action is user has LUNA or UST enabled as collateral
        setActiveModal('withdraw');
    };

    const closeActiveModal = () => setActiveModal(undefined);

    return (
        <SellFormUi
            onStake={onStake}
            onWithdraw={onWithdraw}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            preDeposit={preDeposit}
            {...sellFormUiProps}
        />
    );
};

export const Timer: React.FC<{ deadline: number; startsAt: number; before: string; after: string }> = ({
    startsAt,
    deadline,
    before,
    after,
}) => {
    // if (deadline == null || deadline <= Date.now()) {
    //     return;
    // }

    function serialize(span: number) {
        const SECOND = 1_000;
        const MINUTE = SECOND * 60;
        const HOUR = MINUTE * 60;
        const DAY = HOUR * 24;

        let days = Math.floor(span / DAY);
        let hours = Math.floor((span / HOUR) % 24);
        let minutes = Math.floor((span / MINUTE) % 60);
        let seconds = Math.floor((span / SECOND) % 60);
        let str = '';
        if (days > 0) {
            //str += `${days}d `;
            hours += days * 24;
        }
        str += hours > 0 ? hours.toString().padStart(2, '0') : '00';
        str += ':';
        str += minutes > 0 ? minutes.toString().padStart(2, '0') : '00';
        str += ':';
        str += seconds > 0 ? seconds.toString().padStart(2, '0') : '00';
        return str;
    }
    function getText() {
        let now = Date.now();
        if (now < startsAt) {
            return before;
        }
        if (now > deadline) {
            return after;
        }
        return serialize(deadline - Date.now());
    }

    const [timer, setTimer] = useState('');
    function updateTime() {
        setTimer(getText());
    }

    useEffect(() => {
        const interval = setInterval(() => updateTime(), 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return <span>{timer}</span>;
};

export default SellForm;


namespace $helpers {
    export function getHintContent(fromToken: Token, toToken: Token): string {
        if (fromToken.symbol === 'srUSDe' && toToken.symbol === 'sUSDe') {
            return null;
        }
        return `${toToken.symbol} will be available to claim after 7 days in “View History” section.`;
    }
}
