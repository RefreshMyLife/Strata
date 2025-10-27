import { checkForStrataVaultProxyTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';
import { ContractTypeByName } from 'packages/contracts';

export interface ExecuteWithdrawalFromStrataVaultInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  rewardTokenAddress: string;
  poolIndex: number;
}

export type ExecuteWithdrawalFromStrataVaultOutput = ContractReceipt;

const executeWithdrawalFromStrataVault = async ({
  strataVaultContract,
  rewardTokenAddress,
  poolIndex,
}: ExecuteWithdrawalFromStrataVaultInput): Promise<ExecuteWithdrawalFromStrataVaultOutput> => {
  const transaction = await strataVaultContract.executeWithdrawal(rewardTokenAddress, poolIndex);
  const receipt = await transaction.wait(1);
  return checkForStrataVaultProxyTransactionError(receipt);
};

export default executeWithdrawalFromStrataVault;
