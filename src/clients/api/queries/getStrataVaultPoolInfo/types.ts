import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';

export interface GetStrataVaultPoolInfoInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  rewardTokenAddress: string;
  poolIndex: number;
}

export interface GetStrataVaultPoolInfoOutput {
  stakedTokenAddress: string;
  allocationPoint: number;
  lastRewardBlock: number;
  accRewardPerShare: BigNumber;
  lockingPeriodMs: number;
}
