import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import getStrataWithdrawableAmount, {
  GetStrataWithdrawableAmountInput,
  GetStrataWithdrawableAmountOutput,
} from 'clients/api/queries/getStrataWithdrawableAmount';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedGetStrataWithdrawableAmountInput = Omit<
  GetStrataWithdrawableAmountInput,
  'strataVestingContract'
>;

type Options = QueryObserverOptions<
  GetStrataWithdrawableAmountOutput | undefined,
  Error,
  GetStrataWithdrawableAmountOutput | undefined,
  GetStrataWithdrawableAmountOutput | undefined,
  [FunctionKey.GET_STRATA_WITHDRAWABLE_AMOUNT, TrimmedGetStrataWithdrawableAmountInput]
>;

const useGetStrataWithdrawableAmount = (
  input: TrimmedGetStrataWithdrawableAmountInput,
  options?: Options,
) => {
  const strataVestingContract = useGetUniqueContract({
    name: 'strataVesting',
  });

  return useQuery(
    [FunctionKey.GET_STRATA_WITHDRAWABLE_AMOUNT, input],
    () =>
      callOrThrow({ strataVestingContract }, params =>
        getStrataWithdrawableAmount({ ...params, ...input }),
      ),
    {
      refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
      ...options,
    },
  );
};

export default useGetStrataWithdrawableAmount;
