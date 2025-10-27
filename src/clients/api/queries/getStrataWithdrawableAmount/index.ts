import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';

export interface GetStrataWithdrawableAmountInput {
  accountAddress: string;
  strataVestingContract: ContractTypeByName<'strataVesting'>;
}

export interface GetStrataWithdrawableAmountOutput {
  totalWithdrawableAmount: BigNumber;
  totalVestedAmount: BigNumber;
  totalWithdrawnAmount: BigNumber;
}

const getStrataWithdrawableAmount = async ({
  strataVestingContract,
  accountAddress,
}: GetStrataWithdrawableAmountInput): Promise<GetStrataWithdrawableAmountOutput | undefined> => {
  const resp = await strataVestingContract.getWithdrawableAmount(accountAddress);

  return {
    totalWithdrawableAmount: new BigNumber(resp.totalWithdrawableAmount.toString()),
    totalVestedAmount: new BigNumber(resp.totalVestedAmount.toString()),
    totalWithdrawnAmount: new BigNumber(resp.totalWithdrawnAmount.toString()),
  };
};

export default getStrataWithdrawableAmount;
