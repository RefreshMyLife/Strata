import BigNumber from 'bignumber.js';
import { checkForStrataVaultProxyTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';
import { ContractTypeByName } from 'packages/contracts';
import { Token } from 'types';

export interface StakeInStrataVaultInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  rewardToken: Token;
  amountWei: BigNumber;
  poolIndex: number;
}

export type StakeInStrataVaultOutput = ContractReceipt;

const stakeInStrataVault = async ({
  strataVaultContract,
  rewardToken,
  amountWei,
  poolIndex,
}: StakeInStrataVaultInput): Promise<StakeInStrataVaultOutput> => {
  const transaction = await strataVaultContract.deposit(
    rewardToken.address,
    poolIndex,
    amountWei.toFixed(),
  );
  const receipt = await transaction.wait(1);
  return checkForStrataVaultProxyTransactionError(receipt);
};

export default stakeInStrataVault;
