import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';

import { GetStrataVaultUserInfoOutput } from './types';

const formatToUserInfo = ({
  amount,
  pendingWithdrawals,
  rewardDebt,
}: Awaited<
  ReturnType<ContractTypeByName<'strataVault'>['getUserInfo']>
>): GetStrataVaultUserInfoOutput => ({
  stakedAmountWei: new BigNumber(amount.toString()),
  pendingWithdrawalsTotalAmountWei: new BigNumber(pendingWithdrawals.toString()),
  rewardDebtAmountWei: new BigNumber(rewardDebt.toString()),
});

export default formatToUserInfo;
