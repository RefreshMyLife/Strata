import formatToPoolInfo from './formatToPoolInfo';
import { GetStrataVaultPoolInfoInput, GetStrataVaultPoolInfoOutput } from './types';

export * from './types';

const getStrataVaultPoolInfo = async ({
  strataVaultContract,
  rewardTokenAddress,
  poolIndex,
}: GetStrataVaultPoolInfoInput): Promise<GetStrataVaultPoolInfoOutput> => {
  const res = await strataVaultContract.poolInfos(rewardTokenAddress, poolIndex);
  return formatToPoolInfo(res);
};

export default getStrataVaultPoolInfo;
