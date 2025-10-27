import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { callOrThrow } from 'utilities';

import getStrataVaultRewardPerBlock, {
  GetStrataVaultRewardPerBlockInput,
  GetStrataVaultRewardPerBlockOutput,
} from 'clients/api/queries/getStrataVaultRewardPerBlock';
import FunctionKey from 'constants/functionKey';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedGetStrataVaultRewardPerBlockInput = Omit<
  GetStrataVaultRewardPerBlockInput,
  'strataVaultContract'
>;
type Options = QueryObserverOptions<
  GetStrataVaultRewardPerBlockOutput,
  Error,
  GetStrataVaultRewardPerBlockOutput,
  GetStrataVaultRewardPerBlockOutput,
  [FunctionKey.GET_STRATA_VAULT_REWARD_PER_BLOCK, TrimmedGetStrataVaultRewardPerBlockInput]
>;

const useGetStrataVaultRewardPerBlock = (
  input: TrimmedGetStrataVaultRewardPerBlockInput,
  options?: Options,
) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
  });

  return useQuery(
    [FunctionKey.GET_STRATA_VAULT_REWARD_PER_BLOCK, input],
    () =>
      callOrThrow({ strataVaultContract }, params =>
        getStrataVaultRewardPerBlock({ ...params, ...input }),
      ),
    options,
  );
};

export default useGetStrataVaultRewardPerBlock;
