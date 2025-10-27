import { QueryObserverOptions, useQuery } from '@tanstack/react-query';

import { getBlockNumber } from 'clients/api/';
import { BLOCK_TIME_MS } from 'src/constants/eth';
import FunctionKey from 'constants/functionKey';
import { useAuth } from 'context/AuthContext';

interface GetBlockNumberOutput {
  blockNumber: number;
}

type Options = QueryObserverOptions<
  GetBlockNumberOutput,
  Error,
  GetBlockNumberOutput,
  GetBlockNumberOutput,
  FunctionKey.GET_BLOCK_NUMBER
>;

const useGetBlockNumber = (options?: Options) => {
  const { provider } = useAuth();

  return useQuery(FunctionKey.GET_BLOCK_NUMBER, () => getBlockNumber({ provider }), {
    refetchInterval: BLOCK_TIME_MS * 6,
    ...options,
  });
};

export default useGetBlockNumber;
