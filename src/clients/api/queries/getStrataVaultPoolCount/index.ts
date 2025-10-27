import { ContractTypeByName } from 'packages/contracts';

import { TOKENS } from 'constants/tokens';

export interface GetStrataVaultPoolCountInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  rewardTokenAddress?: string;
}

export type GetStrataVaultPoolCountOutput = {
  poolCount: number;
};

const getStrataVaultPoolCount = async ({
  strataVaultContract,
  rewardTokenAddress,
}: GetStrataVaultPoolCountInput): Promise<GetStrataVaultPoolCountOutput> => {
  if (strataVaultContract == null) {
    return { poolCount: 0 };
  }
  const tokenAddress = rewardTokenAddress ?? TOKENS.strata.address;
  const strataVaultPoolLength = await strataVaultContract.poolLength(tokenAddress);
  return {
    poolCount: strataVaultPoolLength.toNumber(),
  };
};


export default getStrataVaultPoolCount;
