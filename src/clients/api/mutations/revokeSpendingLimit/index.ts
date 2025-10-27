import { ContractReceipt } from 'ethers';
import { ContractTypeByName } from 'packages/contracts';

export interface RevokeSpendingLimitInput {
  tokenContract: ContractTypeByName<'seusd' | 'erc20' | 'srt' | 'strata'>;
  spenderAddress: string;
}

export type RevokeSpendingLimitOutput = ContractReceipt;

const revokeSpendingLimit = async ({
  tokenContract,
  spenderAddress,
}: RevokeSpendingLimitInput): Promise<RevokeSpendingLimitOutput> => {
  const transaction = await tokenContract.approve(spenderAddress, 0);
  return transaction.wait(1);
};

export default revokeSpendingLimit;
