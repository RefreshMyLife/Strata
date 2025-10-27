import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import getStrataVaultLockedDeposits, {
  GetStrataVaultLockedDepositsInput,
  GetStrataVaultLockedDepositsOutput,
} from 'clients/api/queries/getStrataVaultLockedDeposits';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedGetStrataVaultLockedDepositsInput = Omit<
  GetStrataVaultLockedDepositsInput,
  'strataVaultContract'
>;
type Options = QueryObserverOptions<
  GetStrataVaultLockedDepositsOutput,
  Error,
  GetStrataVaultLockedDepositsOutput,
  GetStrataVaultLockedDepositsOutput,
  [FunctionKey.GET_STRATA_VAULT_WITHDRAWAL_REQUESTS, TrimmedGetStrataVaultLockedDepositsInput]
>;

const useGetStrataVaultLockedDeposits = (
  input: TrimmedGetStrataVaultLockedDepositsInput,
  options?: Options,
) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });

  return useQuery(
    [FunctionKey.GET_STRATA_VAULT_WITHDRAWAL_REQUESTS, input],
    () =>
      callOrThrow({ strataVaultContract }, params =>
        getStrataVaultLockedDeposits({ ...params, ...input }),
      ),
    options,
  );
};

export default useGetStrataVaultLockedDeposits;
