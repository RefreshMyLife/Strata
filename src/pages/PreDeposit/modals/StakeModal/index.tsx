/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';

import { queryClient, useGetBalanceOf, useStakeInPreDeposit } from 'clients/api';
import { useAuth } from 'context/AuthContext';
import useGetUniqueContractAddress from 'hooks/useGetUniqueContractAddress';

import ActionModal, { ActionModalProps } from '../ActionModal';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import FunctionKey from 'src/constants/functionKey';

export interface StakeModalProps extends Pick<ActionModalProps, 'handleClose'> {
  preDeposit: TPreDepositData;
}

const StakeModal: React.FC<StakeModalProps> = ({
  preDeposit,
  handleClose,
}) => {
  const { t } = useTranslation();
  const { accountAddress } = useAuth();

  const stakedToken = preDeposit.USDe;

  const spenderAddress = preDeposit.pUSDe.address;
  const availableBalance = preDeposit.balances?.USDe ?? BigNumber(0);


  const { mutateAsync: stake, isLoading: isStakeLoading } = useStakeInPreDeposit({
    stakedToken: preDeposit.USDe,
    receiver: accountAddress,
  });

   const invalidateQueries = () => {
        queryClient.invalidateQueries([
            FunctionKey.GET_PRE_DEPOSIT_ACCOUNT_STAKED,
            accountAddress,
        ]);
        queryClient.invalidateQueries([
            FunctionKey.GET_SUSD_DEPOSIT_ACCOUNT_STAKED,
            accountAddress,
        ]);
        queryClient.invalidateQueries([
            FunctionKey.GET_PRE_DEPOSIT_TOTALS
        ]);
    };

  const handleStake = async (amountWei: BigNumber) => {
    // Send request to stake
    const res = await stake({
      amountWei,
    });

    invalidateQueries();
    // Close modal
    handleClose();

    return res;
  };

  return (
    <ActionModal
      title={t('preDepositItem.stakeModal.title', { tokenSymbol: stakedToken.symbol })}
      token={stakedToken}
      minimumTokens={1}
      minimumTokensLabel={t('preDepositItem.stakeModal.minimumTokensLabel')}
      handleClose={handleClose}
      availableTokensWei={availableBalance}
      isInitialLoading={false}
      onSubmit={handleStake}
      isSubmitting={isStakeLoading}
      connectWalletMessage={t('preDepositItem.stakeModal.connectWalletMessage', {
        tokenSymbol: stakedToken.symbol,
      })}
      tokenNeedsToBeApproved
      spenderAddress={spenderAddress}
      availableTokensLabel={t('preDepositItem.stakeModal.availableTokensLabel', {
        tokenSymbol: stakedToken.symbol,
      })}
      submitButtonLabel={t('preDepositItem.stakeModal.submitButtonLabel')}
      submitButtonDisabledLabel={t('preDepositItem.stakeModal.submitButtonDisabledLabel')}
      successfulTransactionTitle={t('preDepositItem.stakeModal.successfulTransactionModal.title')}
      successfulTransactionDescription={t('preDepositItem.stakeModal.successfulTransactionModal.description')}
    />
  );
};

export default StakeModal;
