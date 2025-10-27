import BigNumber from 'bignumber.js';
import { checkForPreDepositTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';
import { ContractTypeByName } from 'packages/contracts';

export interface StakeInPreDepositInput {
  pUSDeVault: ContractTypeByName<'pUSDeVault'>;
  amountWei: BigNumber;
}

export type StakeInPreDepositOutput = ContractReceipt;

const claimFromPreDeposit = async ({
  pUSDeVault,
  amountWei,
}: StakeInPreDepositInput): Promise<StakeInPreDepositOutput> => {
  const transaction = await pUSDeVault.deposit(
    amountWei.toFixed(),
  );
  const receipt = await transaction.wait(1);
  return checkForPreDepositTransactionError(receipt);
};

export default claimFromPreDeposit;
