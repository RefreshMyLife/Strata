import { MutationObserverOptions, useMutation } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import { WithdrawStrataOutput, queryClient, withdrawStrata } from 'clients/api';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

const useWithdrawStrata = (options?: MutationObserverOptions<WithdrawStrataOutput, Error>) => {
  const strataVestingContract = useGetUniqueContract({
    name: 'strataVesting',
    passSigner: true,
  });

  return useMutation(
    FunctionKey.WITHDRAW_STRATA,
    () => callOrThrow({ strataVestingContract }, withdrawStrata),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        queryClient.invalidateQueries(FunctionKey.GET_STRATA_WITHDRAWABLE_AMOUNT);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useWithdrawStrata;
