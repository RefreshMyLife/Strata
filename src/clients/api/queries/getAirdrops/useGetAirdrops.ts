import { QueryObserverOptions, useQuery } from '@tanstack/react-query';

import getAirdrops, { GetAirdropsOutput } from 'clients/api/queries/getAirdrops';

import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
    GetAirdropsOutput,
  Error,
  GetAirdropsOutput,
  GetAirdropsOutput,
  FunctionKey.GET_AIRDROPS
>;

const useGetAirdrops = (options?: Options, params: { accountAddress, vestedAirdrops }) =>
  useQuery(FunctionKey.GET_AIRDROPS, () => getAirdrops(params.accountAddress, params.vestedAirdrops), {
    ...options,
  });

export default useGetAirdrops;
