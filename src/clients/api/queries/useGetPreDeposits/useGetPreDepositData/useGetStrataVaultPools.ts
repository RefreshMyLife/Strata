import { UseQueryOptions, UseQueryResult, useQueries } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import {
  GetStrataVaultPoolInfoOutput,
  GetStrataVaultUserInfoOutput,
  getStrataVaultPoolInfo,
  getStrataVaultUserInfo,
} from 'clients/api';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';
import { Token } from 'src/types';

export interface UseGetStrataVaultPoolsInput {
  poolsCount: number;
  accountAddress?: string;
  rewardToken: Token;
}

export type UseGetStrataVaultPoolsOutput = UseQueryResult<
  | GetStrataVaultPoolInfoOutput
  | GetStrataVaultUserInfoOutput
>[];

const useGetStrataVaultPools = ({
  accountAddress,
  rewardToken,
  poolsCount,
}: UseGetStrataVaultPoolsInput): UseGetStrataVaultPoolsOutput => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });

  const poolQueries: UseQueryOptions<
    | GetStrataVaultPoolInfoOutput
    | GetStrataVaultUserInfoOutput
  >[] = [];

  // Fetch pool infos
  // TODO: use multicall

  for (let poolIndex = 0; poolIndex < poolsCount; poolIndex++) {
    poolQueries.push({
      queryFn: () =>
        callOrThrow({ strataVaultContract }, params =>
          getStrataVaultPoolInfo({
            ...params,
            rewardTokenAddress: rewardToken.address,
            poolIndex,
          }),
        ),
      queryKey: [
        FunctionKey.GET_STRATA_VAULT_POOL_INFOS,
        { rewardTokenAddress: rewardToken.address, poolIndex },
      ],
    });

    poolQueries.push({
      queryFn: () =>
        callOrThrow({ strataVaultContract }, params =>
          getStrataVaultUserInfo({
            ...params,
            rewardTokenAddress: rewardToken.address,
            poolIndex,
            accountAddress: accountAddress || '',
          }),
        ),
      queryKey: [
        FunctionKey.GET_STRATA_VAULT_USER_INFO,
        { accountAddress, rewardTokenAddress: rewardToken.address, poolIndex },
      ],
      enabled: !!accountAddress,
    });
  }

  return useQueries(poolQueries);
};

export default useGetStrataVaultPools;
