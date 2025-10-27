/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import {
  ApproveTokenSteps,
  ApproveTokenStepsProps,
  FormikSubmitButton,
  FormikTokenTextField,
  Icon,
  LabeledInlineContent,
  Modal,
  PrimaryButton,
  QuinaryButton,
  SpendingLimit,
  TertiaryButton,
  TextButton,
} from 'components';
import { ContractReceipt } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertTokensToWei, convertWeiToTokens } from 'utilities';

import { AmountForm } from 'containers/AmountForm';
import { useAuth } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';
import useTokenApproval from 'hooks/useTokenApproval';

import { useStyles } from './styles';
import TEST_IDS from './testIds';
import { TokenSelectPanel } from '../components/TokenSelectPanel';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { TOKENS } from 'src/constants/tokens';
import { TokenService } from 'src/services/TokenService';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { queryClient } from 'src/clients/api';
import FunctionKey from 'src/constants/functionKey';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { getUniqueContract } from 'src/packages/contracts';
import config from 'src/config';
import img_gear from 'assets/img/icons/gear.svg';
import { Box } from '@mui/material';
import addTokenToWallet from 'src/clients/web3/addTokenToWallet';

export interface PreDepositFormUiProps {
  predeposit: TPreDepositData
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
}

export const PreDepositFormUi: React.FC<PreDepositFormUiProps> = ({
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
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { accountAddress, signer } = useAuth();
  const [ selectedToken, setSelectedToken ] = useState(token);
  const [ selectedAmount, setSelectedAmount ] = useState(null);
  const { data: allowanceWei } = TokenService.useGetAllowance(selectedToken, predeposit.pUSDeDepositorContract.address, accountAddress);
  const [ isSubmitting, setLoadingState ] = useState(false);
  const [ action, setAction ] = useState<'connect' | 'approve' | 'deposit'>(!accountAddress ? 'connect' : 'deposit');

  const [ hasError, setHasError ] = useState(false);
  const [ errMessage, setErrorMessage ] = useState('');

  const { data: usdeBalance } = TokenService.useGetBalance(TOKENS.usde, accountAddress);
  const { data: eusdeBalance } = TokenService.useGetBalance(TOKENS.eusde, accountAddress);


  useEffect(() => {
    ensureAction(selectedAmount);
  }, [accountAddress]);

  const availableTokensWei = predeposit.balances?.[selectedToken.symbol] ?? BigNumber(0);


  const handleTransactionMutation = useHandleTransactionMutation();

  const invalidateQueries = () => {
      PromiseUtil.clearMemoized();
      PromiseUtil.clearTrackedQuery();
  };


  const onDeposit = async (token: Token, amountWei: BigNumber) => {
      setLoadingState(true);
      try {
          const depositor = getUniqueContract({
              name: 'pUSDeDepositor',
              signerOrProvider: signer,
              chainId: config.networkId
          });
          let tx = await depositor['deposit(address,uint256,address)'](token.address, amountWei.toString(10), accountAddress);
          let result = await tx.wait();
          setSelectedAmount(null);
          return result;
      } finally {
          invalidateQueries();
          setLoadingState(false);
          setAction('approve');
      }
  };

  const onApprove = async (token: Token, amountWei: BigNumber) => {
      setLoadingState(true);
      try {
          let tx = await TokenService.doApprove(signer, token,predeposit.pUSDeDepositorContract.address, amountWei.toString(10));
          return await tx.wait();
      } finally {
          invalidateQueries();
          setLoadingState(false);
          setAction('deposit');
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

  const minimumTokensFormatted = minimumTokens ? useConvertWeiToReadableTokenString({
    valueWei: new BigNumber(minimumTokens).shiftedBy(token.decimals),
    token,
  }) : null;

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

  const handleDeposit = async (mix?: { selectedToken?: Token, selectedAmount?: string }) => {

    const token = mix?.selectedToken ?? selectedToken;
    const amountTokens = mix?.selectedAmount ?? selectedAmount;

    const amountWei = convertTokensToWei({
      value: new BigNumber(amountTokens),
      token: selectedToken,
    });

    return handleTransactionMutation({
      label: 'Processing Deposit',
      labelSuccess: 'Deposit Successful',
      mutate: () => onDeposit(token, amountWei),
      successTransactionModalProps: contractReceipt => ({
        title: 'Deposit Successful',
        content: 'Deposited',
        amount: {
          valueWei: amountWei,
          token,
        },
        transactionHash: contractReceipt.transactionHash,
        button: (onClick) => <TextButton onClick={onClick} className='transparent'>
          <Icon name="wallet" />&nbsp;Add pUSDe to Wallet
        </TextButton>,
        buttonClicked: (close) => {
          addTokenToWallet(TOKENS.pusde);
        }
      }),
    });
  };

  const handleApprove = async (amountTokens: string) => {
    const token = selectedToken;

    const amountWei = convertTokensToWei({
      value: BigNumberUtil.from(selectedAmount),
      token,
    });
    console.log(`AmountWei: ${amountWei.toString(10)}`);
    return handleTransactionMutation({
      label: 'Processing Approval',
      labelSuccess: 'Approval Successful',
      mutate: () => onApprove(selectedToken, amountWei),
      onComplete: (receipt) => {
        handleDeposit({selectedToken: token, selectedAmount });
      }
      // successTransactionModalProps: contractReceipt => ({
      //   title: 'Approval Successful',
      //   content: 'Continue to deposit',
      //   amount: {
      //     valueWei: amountWei,
      //     token,
      //   },
      //   transactionHash: contractReceipt.transactionHash,
      //   button: (onClick) => <PrimaryButton onClick={onClick} style={{marginTop: '6px'}}>Deposit</PrimaryButton>,
      //   buttonClicked: (close) => {
      //     close();
      //     handleDeposit({selectedToken: token, selectedAmount });
      //   }
      // }),
    });
  };

  const setSelectedTokenHandler = (t: Token) => {
    let selected = tokens.find(x => x.address === t.address);
    setSelectedToken(selected);
  };
  const setSelectedAmountHandler = (e) => {
    let selected = Number(e);
    ensureAction(selected);
    setSelectedAmount(selected);

    let balance = selectedToken?.address === TOKENS.usde.address? usdeBalance : eusdeBalance;

    let _hasError = balance != null && selected > balance;
    let _errMessage = _hasError ? 'Insufficient Balance' : '';
    if (hasError != _hasError) {
      setHasError(_hasError);
      setErrorMessage(_errMessage);
    }
  };


  function ensureAction(amount: number) {
    if (!accountAddress || allowanceWei == null) {
      if (accountAddress && action === 'connect') {
        setAction('deposit');
      }
      if (!accountAddress) {
        setAction('connect');
      }
      return;
    }
    let selectedWei = convertTokensToWei({
      value: BigNumberUtil.from(amount),
      token: selectedToken,
    });

    let isApproved = BigNumberUtil.from(allowanceWei).gte(selectedWei);
    let newAction = isApproved ? 'deposit' : 'approve';
    if (action != newAction) {
      setAction(newAction);
    }
  }

  return (<div css={styles.formContainer}>
    {/* <QuinaryButton css={styles.optionsButton}><img src={img_gear} alt="Options" /></QuinaryButton> */}
    <AmountForm onSubmit={handleDeposit} initialToken={selectedToken}>
        {({ dirty, isValid, setFieldValue, values, errors }) => (
            <>
                <TokenSelectPanel
                    label = 'From'
                    token = {selectedToken}
                    tokens = {tokens}
                    onTokenSelected = { setSelectedTokenHandler }
                    onInput = { setSelectedAmountHandler }
                    disabled = {false}
                    readonly = {isSubmitting}
                    showPercentButtons = {true}
                    name='amountFrom'
                />

                <TokenSelectPanel
                    value={selectedAmount}
                    label = 'To'
                    token = {TOKENS.pusde}
                    tokens = {[TOKENS.pusde]}
                    disabled = {true}
                    showPercentButtons = {false}
                />

                {action === 'connect' && (
                  <ConnectButton fullWidth style={{'margin': '0'}} variant="primary"/>
                )}
                { action === 'approve' &&  <PrimaryButton
                  onClick={handleApprove}
                  loading={isSubmitting}
                  disabled={hasError || isSubmitting}
                  fullWidth
                >
                    {isSubmitting ? 'Approve' : (hasError ? errMessage : 'Deposit') }
                  </PrimaryButton>}
                {action === 'deposit' && (
                  // <FormikSubmitButton
                  //   loading={isSubmitting}
                  //   disabled={!selectedAmount || isSubmitting}
                  //   fullWidth
                  //   enabledLabel='Deposit'
                  //   disabledLabel={'Deposit: ' + selectedAmount}
                  // />
                  <PrimaryButton
                    onClick={handleDeposit}
                    loading={isSubmitting}
                    disabled={!selectedAmount || isSubmitting || hasError}
                    fullWidth
                  >
                      {hasError ? errMessage : 'Deposit'}
                  </PrimaryButton>
                )}
            </>
        )}
    </AmountForm>
    {/* <OptionsModal /> */}
  </div>)


  return (
    <AmountForm onSubmit={handleDeposit} maxAmount={limitTokens.toFixed()} minAmount={minimumTokens?.toFixed()}>
      {({ dirty, isValid, setFieldValue }) => (
        <>
          <FormikTokenTextField
            name="amount"
            token={token}
            disabled={isSubmitting}
            rightMaxButton={{
              label: t('vault.PreDepositForm.rightMaxButtonLabel'),
              onClick: () => setFieldValue('amount', limitTokens.toFixed()),
            }}
            max={limitTokens.toFixed()}
            //min={minimumTokens?.toFixed()}
            data-testid={TEST_IDS.tokenTextField}
            css={styles.tokenTextField}
          />

          <div css={styles.getRow({ isLast: true })}>
            <LabeledInlineContent
              data-testid={TEST_IDS.availableTokens}
              iconSrc={token}
              label={availableTokensLabel}
              css={styles.getRow({ isLast: false })}
            >
              {readableavailableTokens}
            </LabeledInlineContent>

            {minimumTokens && minimumTokensLabel && (
              <LabeledInlineContent
                iconSrc={token}
                label={minimumTokensLabel}
                css={styles.getRow({ isLast: false })}
              >
                {minimumTokensFormatted}
              </LabeledInlineContent>
            )}

            {tokenNeedsToBeApproved && (
              <SpendingLimit
                token={token}
                walletBalanceTokens={availableTokens}
                walletSpendingLimitTokens={walletSpendingLimitTokens}
                onRevoke={revokeWalletSpendingLimit}
                isRevokeLoading={isRevokeWalletSpendingLimitLoading}
                css={styles.getRow({ isLast: false })}
                data-testid={TEST_IDS.spendingLimit}
              />
            )}

            {readableLockingPeriod && (
              <LabeledInlineContent
                data-testid={TEST_IDS.lockingPeriod}
                label={t('vault.PreDepositForm.lockingPeriod.label')}
                css={styles.getRow({ isLast: false })}
              >
                {readableLockingPeriod}
              </LabeledInlineContent>
            )}
          </div>

          {tokenNeedsToBeApproved ? (
            <ApproveTokenSteps
              token={token}
              hideTokenEnablingStep={!isValid || !dirty}
              isTokenApproved={isTokenApproved}
              approveToken={approveToken}
              isApproveTokenLoading={isApproveTokenLoading}
              isWalletSpendingLimitLoading={isWalletSpendingLimitLoading}
            >
              <FormikSubmitButton
                loading={isSubmitting}
                disabled={
                  !isValid ||
                  !dirty ||
                  isSubmitting ||
                  !isTokenApproved ||
                  isApproveTokenLoading ||
                  isWalletSpendingLimitLoading ||
                  isRevokeWalletSpendingLimitLoading
                }
                fullWidth
                enabledLabel={submitButtonLabel}
                disabledLabel={submitButtonDisabledLabel}
              />
            </ApproveTokenSteps>
          ) : (
            <FormikSubmitButton
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              fullWidth
              enabledLabel={submitButtonLabel}
              disabledLabel={submitButtonDisabledLabel}
            />
          )}
        </>
      )}
    </AmountForm>
  );
};

export interface PreDepositFormProps
  extends Omit<
    PreDepositFormUiProps,
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

const PreDepositForm: React.FC<PreDepositFormProps> = ({
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
    <PreDepositFormUi
      token={token}
      tokenNeedsToBeApproved={tokenNeedsToBeApproved}
      {...tokenApprovalProps}
      {...otherProps}
    />
  );
};


const OptionsModal: React.FC<any> = ({
    isOpen = true,
    handleClose,
}) => {
    const styles = useStyles();
  return (
    <Modal isOpen={isOpen} title={"Strata Points Farm"} handleClose={handleClose}>
        <Box css={styles.moreInfoContainer}>
            <h3>How it works</h3>
            <p>
                <h5>1. Deposit USDe/sUSDe or ang other asset</h5>
                <span>
                    Mint pUSDe to earn Strata Points + Ethena rewards boosted up
                    to 50x.
                </span>
            </p>
            <p>
                <h5>2. Earn Points Daily</h5>
                <span>Earn 30x Strata Points and 30x Ethena Rewards daily on your
                pUSDe.
                </span>
            </p>
            <p>
                <h5>3. Maximize your reward</h5>
                <span>Boost your rewards the longer you hold pUSDe.
                Earn even more bu participating in upcoming integrations
                with partner protocols
                </span>
            </p>
            <p>
                <h5>4. Withdraw anytime.</h5>
                <span>Withdraw instantly to sUSDe at any time. USDe withdrawal
                requires a 7 day cooldown period.
                </span>
            </p>
            <PrimaryButton onClick={handleClose} fullWidth>DEPOSIT</PrimaryButton>
        </Box>
    </Modal>
  );
};

export default PreDepositForm;
