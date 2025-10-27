/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { ConnectWallet, Spinner, TextButton } from 'components';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';

import {
  useGetStrataVaultLockedDeposits,
  useGetStrataVaultPoolInfo,
  useGetStrataVaultUserInfo,
} from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { useAuth } from 'context/AuthContext';

import TransactionForm, { TransactionFormProps } from '../../../TransactionForm';
import { useStyles as useSharedStyles } from '../styles';

export interface RequestWithdrawalUiProps {
  stakedToken: Token;
  isInitialLoading: boolean;
  requestableWei: BigNumber;
  onSubmitSuccess: () => void;
  onSubmit: TransactionFormProps['onSubmit'];
  isSubmitting: boolean;
  displayWithdrawalRequestList: () => void;
  lockingPeriodMs: number | undefined;
}

export const RequestWithdrawalUi: React.FC<RequestWithdrawalUiProps> = ({
  stakedToken,
  isInitialLoading,
  requestableWei,
  lockingPeriodMs,
  onSubmitSuccess,
  onSubmit,
  isSubmitting,
  displayWithdrawalRequestList,
}) => {
  const { t } = useTranslation();
  const sharedStyles = useSharedStyles();

  const handleSubmit: TransactionFormProps['onSubmit'] = async amountWei => {
    const res = await onSubmit(amountWei);
    onSubmitSuccess();
    return res;
  };

  return (
    <>
      {isInitialLoading || !lockingPeriodMs ? (
        <Spinner />
      ) : (
        <>
          <TransactionForm
            token={stakedToken}
            availableTokensLabel={t(
              'withdrawFromVestingVaultModalModal.requestWithdrawalTab.availableTokensLabel',
              { tokenSymbol: stakedToken.symbol },
            )}
            availableTokensWei={requestableWei}
            submitButtonLabel={t(
              'withdrawFromVestingVaultModalModal.requestWithdrawalTab.submitButtonLabel',
            )}
            submitButtonDisabledLabel={t(
              'withdrawFromVestingVaultModalModal.requestWithdrawalTab.submitButtonDisabledLabel',
            )}
            successfulTransactionTitle={t(
              'withdrawFromVestingVaultModalModal.requestWithdrawalTab.successfulTransactionTitle',
            )}
            successfulTransactionDescription={t(
              'withdrawFromVestingVaultModalModal.requestWithdrawalTab.successfulTransactionDescription',
            )}
            lockingPeriodMs={lockingPeriodMs}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          <TextButton
            onClick={displayWithdrawalRequestList}
            css={sharedStyles.displayWithdrawalRequestListButton}
          >
            {t(
              'withdrawFromVestingVaultModalModal.requestWithdrawalTab.displayWithdrawalRequestListButton',
            )}
          </TextButton>
        </>
      )}
    </>
  );
};

export interface RequestWithdrawalProps {
  stakedToken: Token;
  poolIndex: number;
  handleClose: () => void;
  handleDisplayWithdrawalRequestList: () => void;
}

const RequestWithdrawal: React.FC<RequestWithdrawalProps> = ({
  stakedToken,
  poolIndex,
  handleDisplayWithdrawalRequestList,
  handleClose,
}) => {
  const { accountAddress } = useAuth();
  const { t } = useTranslation();

  const {
    mutateAsync: requestWithdrawalFromStrataVault,
    isLoading: isRequestingWithdrawalFromStrataVault,
  } = useRequestWithdrawalFromStrataVault();

  const {
    data: strataVaultUserLockedDepositsData = {
      lockedDeposits: [],
    },
    isLoading: isGetStrataVaultUserLockedDepositsLoading,
  } = useGetStrataVaultLockedDeposits(
    {
      poolIndex,
      rewardTokenAddress: TOKENS.strata.address,
      accountAddress,
    },
    {
      placeholderData: {
        lockedDeposits: [],
      },
      enabled: !!accountAddress,
    },
  );

  const { data: strataVaultUserInfo, isLoading: isGetStrataVaultUserInfoLoading } =
    useGetStrataVaultUserInfo(
      {
        poolIndex,
        rewardTokenAddress: TOKENS.strata.address,
        accountAddress,
      },
      {
        enabled: !!accountAddress,
      },
    );

  const requestableWei = useMemo(() => {
    if (!strataVaultUserInfo?.stakedAmountWei) {
      return new BigNumber(0);
    }

    // Subtract sum of all active withdrawal requests amounts to amount of
    // tokens staked by user
    const pendingLockedDepositsSum = strataVaultUserLockedDepositsData.lockedDeposits.reduce(
      (acc, strataVaultUserLockedDeposit) => acc.plus(strataVaultUserLockedDeposit.amountWei),
      new BigNumber(0),
    );
    return strataVaultUserInfo.stakedAmountWei.minus(pendingLockedDepositsSum);
  }, [
    JSON.stringify(strataVaultUserLockedDepositsData.lockedDeposits),
    JSON.stringify(strataVaultUserInfo),
  ]);

  const { data: strataVaultPoolInfo, isLoading: isGetStrataVaultPoolInfoLoading } =
    useGetStrataVaultPoolInfo(
      {
        poolIndex,
        rewardTokenAddress: TOKENS.strata.address,
      },
      {
        enabled: !!accountAddress,
      },
    );

  const isInitialLoading =
    isGetStrataVaultPoolInfoLoading ||
    isGetStrataVaultUserInfoLoading ||
    isGetStrataVaultUserLockedDepositsLoading;

  const handleSubmit: TransactionFormProps['onSubmit'] = async amountWei =>
    requestWithdrawalFromStrataVault({
      poolIndex,
      rewardTokenAddress: TOKENS.strata.address,
      amountWei,
    });

  return (
    <ConnectWallet
      message={t(
        'withdrawFromVestingVaultModalModal.requestWithdrawalTab.approveToken.connectWalletMessage',
      )}
    >
      <RequestWithdrawalUi
        stakedToken={stakedToken}
        isInitialLoading={isInitialLoading}
        requestableWei={requestableWei}
        lockingPeriodMs={strataVaultPoolInfo?.lockingPeriodMs}
        onSubmitSuccess={handleClose}
        onSubmit={handleSubmit}
        isSubmitting={isRequestingWithdrawalFromStrataVault}
        displayWithdrawalRequestList={handleDisplayWithdrawalRequestList}
      />
    </ConnectWallet>
  );
};

export default RequestWithdrawal;
