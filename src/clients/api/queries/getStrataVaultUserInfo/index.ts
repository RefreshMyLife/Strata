import formatToUserInfo from './formatToUserInfo';
import { GetStrataVaultUserInfoInput, GetStrataVaultUserInfoOutput } from './types';

export * from './types';

const getStrataVaultUserInfo = async ({
  strataVaultContract,
  rewardTokenAddress,
  poolIndex,
  accountAddress,
}: GetStrataVaultUserInfoInput): Promise<GetStrataVaultUserInfoOutput> => {
  const res = await strataVaultContract.getUserInfo(rewardTokenAddress, poolIndex, accountAddress);
  return formatToUserInfo(res);
};

export default getStrataVaultUserInfo;
