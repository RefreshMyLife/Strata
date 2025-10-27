import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import getStrataVaultTotalAllocationPoints, {
  GetStrataVaultTotalAllocPointsInput,
  GetStrataVaultTotalAllocPointsOutput,
} from 'clients/api/queries/getStrataVaultTotalAllocationPoints';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedGetStrataVaultTotalAllocPointsInput = Omit<
  GetStrataVaultTotalAllocPointsInput,
  'strataVaultContract'
>;
type Options = QueryObserverOptions<
  GetStrataVaultTotalAllocPointsOutput,
  Error,
  GetStrataVaultTotalAllocPointsOutput,
  GetStrataVaultTotalAllocPointsOutput,
  [FunctionKey.GET_STRATA_VAULT_TOTAL_ALLOCATION_POINTS, TrimmedGetStrataVaultTotalAllocPointsInput]
>;

const useGetStrataVaultTotalAllocationPoints = (
  input: TrimmedGetStrataVaultTotalAllocPointsInput,
  options?: Options,
) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });

  return useQuery(
    [FunctionKey.GET_STRATA_VAULT_TOTAL_ALLOCATION_POINTS, input],
    () =>
      callOrThrow({ strataVaultContract }, params =>
        getStrataVaultTotalAllocationPoints({ ...params, ...input }),
      ),
    options,
  );
};

export default useGetStrataVaultTotalAllocationPoints;
