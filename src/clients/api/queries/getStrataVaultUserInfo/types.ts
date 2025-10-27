import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';

export interface GetStrataVaultUserInfoInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  rewardTokenAddress: string;
  poolIndex: number;
  accountAddress: string;
}

export interface GetStrataVaultUserInfoOutput {
  stakedAmountWei: BigNumber;
  pendingWithdrawalsTotalAmountWei: BigNumber;
  rewardDebtAmountWei: BigNumber;
}
