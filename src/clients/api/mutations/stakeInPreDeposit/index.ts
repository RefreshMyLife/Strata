import BigNumber from 'bignumber.js';
import { checkForPreDepositTransactionError } from 'errors';
import { ContractReceipt } from 'ethers';
import { ContractTypeByName } from 'packages/contracts';

export interface StakeInPreDepositInput {
  pUSDeVault: ContractTypeByName<'pUSDeVault'>;
  amountWei: BigNumber;
  receiver: string;
}

export type StakeInPreDepositOutput = ContractReceipt;

const stakeInPreDeposit = async ({
  pUSDeVault,
  amountWei,
  receiver
}: StakeInPreDepositInput): Promise<StakeInPreDepositOutput> => {
  const transaction = await pUSDeVault.deposit(
    amountWei.toFixed(),
    receiver
  );
  const receipt = await transaction.wait(1);
  return checkForPreDepositTransactionError(receipt);
};

export default stakeInPreDeposit;
