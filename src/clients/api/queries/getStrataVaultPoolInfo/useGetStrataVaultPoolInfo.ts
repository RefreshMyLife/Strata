import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import getStrataVaultPoolInfo, {
  GetStrataVaultPoolInfoInput,
  GetStrataVaultPoolInfoOutput,
} from 'clients/api/queries/getStrataVaultPoolInfo';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedGetStrataVaultPoolInfoInput = Omit<GetStrataVaultPoolInfoInput, 'strataVaultContract'>;
type Options = QueryObserverOptions<
  GetStrataVaultPoolInfoOutput,
  Error,
  GetStrataVaultPoolInfoOutput,
  GetStrataVaultPoolInfoOutput,
  [FunctionKey.GET_STRATA_VAULT_POOL_INFOS, TrimmedGetStrataVaultPoolInfoInput]
>;

const useGetStrataVaultPoolInfo = (input: TrimmedGetStrataVaultPoolInfoInput, options?: Options) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });

  return useQuery(
    [FunctionKey.GET_STRATA_VAULT_POOL_INFOS, input],
    () => callOrThrow({ strataVaultContract }, params => getStrataVaultPoolInfo({ ...params, ...input })),
    options,
  );
};

export default useGetStrataVaultPoolInfo;
