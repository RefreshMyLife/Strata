import formatToLockedDeposit from './formatToLockedDeposit';
import { GetStrataVaultLockedDepositsInput, GetStrataVaultLockedDepositsOutput } from './types';

export * from './types';

const getStrataVaultLockedDeposits = async ({
  strataVaultContract,
  rewardTokenAddress,
  poolIndex,
  accountAddress,
}: GetStrataVaultLockedDepositsInput): Promise<GetStrataVaultLockedDepositsOutput> => {
  const res = await strataVaultContract.getWithdrawalRequests(
    rewardTokenAddress,
    poolIndex,
    accountAddress,
  );
  return {
    lockedDeposits: res.map(formatToLockedDeposit),
  };
};

export default getStrataVaultLockedDeposits;
