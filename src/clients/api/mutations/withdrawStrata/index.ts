import { ContractReceipt } from 'ethers';
import { ContractTypeByName } from 'packages/contracts';

export interface WithdrawStrataInput {
  strataVestingContract: ContractTypeByName<'strataVesting'>;
}

export type WithdrawStrataOutput = ContractReceipt;

const withdrawStrata = async ({
  strataVestingContract,
}: WithdrawStrataInput): Promise<WithdrawStrataOutput> => {
  const transaction = await strataVestingContract.withdraw();
  return transaction.wait(1);
};

export default withdrawStrata;
