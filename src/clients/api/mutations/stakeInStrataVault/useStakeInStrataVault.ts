import { MutationObserverOptions, useMutation } from '@tanstack/react-query';
import { Token } from 'types';
import { callOrThrow, convertWeiToTokens } from 'utilities';

import {
  StakeInStrataVaultInput,
  StakeInStrataVaultOutput,
  queryClient,
  stakeInStrataVault,
} from 'clients/api';
import FunctionKey from 'constants/functionKey';
import { useAnalytics } from 'context/Analytics';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedStakeInStrataVaultInput = Omit<StakeInStrataVaultInput, 'strataVaultContract'>;
type Options = MutationObserverOptions<StakeInStrataVaultOutput, Error, TrimmedStakeInStrataVaultInput>;

const useStakeInStrataVault = (
  { stakedToken, rewardToken }: { stakedToken: Token; rewardToken: Token },
  options?: Options,
) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
    passSigner: true,
  });
  const { captureAnalyticEvent } = useAnalytics();

  return useMutation(
    FunctionKey.STAKE_IN_STRATA_VAULT,
    (input: TrimmedStakeInStrataVaultInput) =>
      callOrThrow({ strataVaultContract }, params =>
        stakeInStrataVault({
          ...params,
          ...input,
        }),
      ),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const { poolIndex, amountWei } = onSuccessParams[1];

        captureAnalyticEvent('Tokens staked in STRATA vault', {
          poolIndex,
          rewardTokenSymbol: rewardToken.symbol,
          tokenAmountTokens: convertWeiToTokens({
            token: stakedToken,
            valueWei: amountWei,
          }).toNumber(),
        });

        const accountAddress = await strataVaultContract?.signer.getAddress();

        // Invalidate cached user info
        queryClient.invalidateQueries([
          FunctionKey.GET_STRATA_VAULT_USER_INFO,
          { accountAddress, rewardTokenAddress: rewardToken.address, poolIndex },
        ]);

        // Invalidate cached user balance
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress,
            tokenAddress: stakedToken.address,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_TOKEN_ALLOWANCE,
          {
            tokenAddress: stakedToken.address,
            accountAddress,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_TOKEN_BALANCES,
          {
            accountAddress,
          },
        ]);

        // Invalidate cached vault data
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress: strataVaultContract?.address,
            tokenAddress: stakedToken.address,
          },
        ]);

        queryClient.invalidateQueries([
          FunctionKey.GET_STRATA_VAULT_POOL_INFOS,
          { rewardTokenAddress: rewardToken.address, poolIndex },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeInStrataVault;
