import { ContractTypeByName } from 'packages/contracts';
import { LockedDeposit } from 'types';

export interface GetStrataVaultLockedDepositsInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  rewardTokenAddress: string;
  poolIndex: number;
  accountAddress: string;
}

export type GetStrataVaultLockedDepositsOutput = {
  lockedDeposits: LockedDeposit[];
};
