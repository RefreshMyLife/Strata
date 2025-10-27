import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import getStrataVaultUserInfo, {
  GetStrataVaultUserInfoInput,
  GetStrataVaultUserInfoOutput,
} from 'clients/api/queries/getStrataVaultUserInfo';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedGetStrataVaultUserInfoInput = Omit<GetStrataVaultUserInfoInput, 'strataVaultContract'>;
type Options = QueryObserverOptions<
  GetStrataVaultUserInfoOutput,
  Error,
  GetStrataVaultUserInfoOutput,
  GetStrataVaultUserInfoOutput,
  [FunctionKey.GET_STRATA_VAULT_USER_INFO, TrimmedGetStrataVaultUserInfoInput]
>;

const useGetStrataVaultUserInfo = (input: TrimmedGetStrataVaultUserInfoInput, options?: Options) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });

  return useQuery(
    [FunctionKey.GET_STRATA_VAULT_USER_INFO, input],
    () => callOrThrow({ strataVaultContract }, params => getStrataVaultUserInfo({ ...params, ...input })),
    options,
  );
};

export default useGetStrataVaultUserInfo;
