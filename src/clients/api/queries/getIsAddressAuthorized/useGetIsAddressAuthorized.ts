import { QueryObserverOptions, useQuery } from '@tanstack/react-query';

import getIsAddressAuthorized, {
  GetIsAddressAuthorizedOutput,
} from 'clients/api/queries/getIsAddressAuthorized';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetIsAddressAuthorizedOutput,
  Error,
  GetIsAddressAuthorizedOutput,
  GetIsAddressAuthorizedOutput,
  typeof FunctionKey.GET_IS_ADDRESS_AUTHORIZED
>;

const ONE_HOUR_MS = 60 * 60 * 1000;

const useGetIsAddressAuthorized = (accountAddress: string, options?: Options) =>
  useQuery({
      queryKey: FunctionKey.GET_IS_ADDRESS_AUTHORIZED,
      queryFn: () => getIsAddressAuthorized({ accountAddress }),
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: ONE_HOUR_MS,
      ...options,
    },
  );

export default useGetIsAddressAuthorized;
