import { QueryObserverOptions, useQuery } from '@tanstack/react-query';


import getStrataVaultPoolCount, {
  GetStrataVaultPoolCountOutput,
} from 'clients/api/queries/getStrataVaultPoolCount';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';
import { ChainId } from 'src/packages/contracts';
import { useAuth } from 'src/context/AuthContext';

type Options = QueryObserverOptions<
  GetStrataVaultPoolCountOutput,
  Error,
  GetStrataVaultPoolCountOutput,
  GetStrataVaultPoolCountOutput,
  FunctionKey.GET_STRATA_VAULT_POOLS_COUNT
>;

const useGetStrataVaultPoolCount = (options?: Options, params?: { rewardTokenAddress: string }) => {
  const { chainId } = useAuth();
  if (chainId === ChainId.ETHEREUM_MAINNET) {
    return {
      isLoading: false,
      data: { poolCount: 0 }
    };
  }
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });
  return useQuery(
    FunctionKey.GET_STRATA_VAULT_POOLS_COUNT,
    () => getStrataVaultPoolCount({ strataVaultContract, rewardTokenAddress: params?.rewardTokenAddress }),
    options,
  );
};

export default useGetStrataVaultPoolCount;
