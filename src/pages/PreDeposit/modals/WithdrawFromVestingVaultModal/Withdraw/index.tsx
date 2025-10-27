/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { ConnectWallet, LabeledInlineContent, PrimaryButton, Spinner } from 'components';
import isBefore from 'date-fns/isBefore';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';

import { useExecuteWithdrawalFromStrataVault, useGetStrataVaultLockedDeposits } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { useAuth } from 'context/AuthContext';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';

import { useStyles } from './styles';
import TEST_IDS from './testIds';

export interface WithdrawUiProps {
  stakedToken: Token;
  isInitialLoading: boolean;
  onSubmitSuccess: () => void;
  onSubmit: () => Promise<unknown>;
  isSubmitting: boolean;
  withdrawableWei?: BigNumber;
}

const WithdrawUi: React.FC<WithdrawUiProps> = ({
  stakedToken,
  isInitialLoading,
  onSubmit,
  onSubmitSuccess,
  isSubmitting,
  withdrawableWei,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const handleSubmit = async () => {
    await onSubmit();

    onSubmitSuccess();
  };

  const readableWithdrawableTokens = useConvertWeiToReadableTokenString({
    valueWei: withdrawableWei,
    token: stakedToken,
  });

  return (
    <>
      {isInitialLoading || !withdrawableWei ? (
        <Spinner />
      ) : (
        <>
          <LabeledInlineContent
            css={styles.content}
            iconSrc={stakedToken}
            data-testid={TEST_IDS.availableTokens}
            label={t('withdrawFromVestingVaultModalModal.withdrawTab.availableTokens', {
              tokenSymbol: stakedToken.symbol,
            })}
          >
            {readableWithdrawableTokens}
          </LabeledInlineContent>

          <PrimaryButton
            type="submit"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={withdrawableWei.isEqualTo(0)}
            fullWidth
          >
            {t('withdrawFromVestingVaultModalModal.withdrawTab.submitButton')}
          </PrimaryButton>
        </>
      )}
    </>
  );
};

export interface WithdrawProps {
  stakedToken: Token;
  poolIndex: number;
  handleClose: () => void;
}

const Withdraw: React.FC<WithdrawProps> = ({ stakedToken, poolIndex, handleClose }) => {
  const { t } = useTranslation();
  const { accountAddress } = useAuth();

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

  const withdrawableWei = useMemo(() => {
    const now = new Date();

    return strataVaultUserLockedDepositsData.lockedDeposits.reduce(
      (acc, strataVaultUserLockedDeposit) =>
        isBefore(strataVaultUserLockedDeposit.unlockedAt, now)
          ? acc.plus(strataVaultUserLockedDeposit.amountWei)
          : acc,
      new BigNumber(0),
    );
  }, [JSON.stringify(strataVaultUserLockedDepositsData.lockedDeposits)]);

  const {
    mutateAsync: executeWithdrawalFromStrataVault,
    isLoading: isExecutingWithdrawalFromStrataVault,
  } = useExecuteWithdrawalFromStrataVault({
    stakedToken,
  });

  const handleSubmit = () =>
    executeWithdrawalFromStrataVault({
      poolIndex,
      rewardTokenAddress: TOKENS.strata.address,
    });

  return (
    <ConnectWallet
      message={t(
        'withdrawFromVestingVaultModalModal.withdrawTab.approveToken.connectWalletMessage',
      )}
    >
      <WithdrawUi
        stakedToken={stakedToken}
        isInitialLoading={isGetStrataVaultUserLockedDepositsLoading}
        isSubmitting={isExecutingWithdrawalFromStrataVault}
        withdrawableWei={withdrawableWei}
        onSubmit={handleSubmit}
        onSubmitSuccess={handleClose}
      />
    </ConnectWallet>
  );
};

export default Withdraw;
