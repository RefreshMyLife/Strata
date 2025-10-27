import { QueryObserverOptions, useQuery } from '@tanstack/react-query';

import getTransactions, {
  GetTransactionsInput,
  GetTransactionsOutput,
} from 'clients/api/queries/getTransactions';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetTransactionsOutput,
  Error,
  GetTransactionsOutput,
  GetTransactionsOutput,
  [typeof FunctionKey.GET_TRANSACTIONS, GetTransactionsInput]
>;

const useGetTransactions = (params: GetTransactionsInput, options?: Options) => {
  return useQuery({
    queryKey: [FunctionKey.GET_TRANSACTIONS, params],
    //keepPreviousData: true,
    queryFn: () => getTransactions(params),
    placeholderData: { limit: 0, page: 0, total: 0, transactions: [] },
    refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    ...options,
  });
}

export default useGetTransactions;
