import { MutationObserverOptions, useMutation } from '@tanstack/react-query';
import { Token } from 'types';
import { callOrThrow } from 'utilities';

import {
  ExecuteWithdrawalFromStrataVaultInput,
  ExecuteWithdrawalFromStrataVaultOutput,
  executeWithdrawalFromStrataVault,
  queryClient,
} from 'clients/api';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';
import { useAnalytics } from 'context/Analytics';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedExecuteWithdrawalFromStrataVaultInput = Omit<
  ExecuteWithdrawalFromStrataVaultInput,
  'strataVaultContract'
>;
type Options = MutationObserverOptions<
  ExecuteWithdrawalFromStrataVaultOutput,
  Error,
  TrimmedExecuteWithdrawalFromStrataVaultInput
>;

const useExecuteWithdrawalFromStrataVault = (
  { stakedToken }: { stakedToken: Token },
  options?: Options,
) => {
  const strataVaultContract = useGetUniqueContract({
    name: 'strataVault',
    passSigner: true,
  });

  const { captureAnalyticEvent } = useAnalytics();

  return useMutation(
    FunctionKey.REQUEST_WITHDRAWAL_FROM_STRATA_VAULT,
    (input: TrimmedExecuteWithdrawalFromStrataVaultInput) =>
      callOrThrow({ strataVaultContract }, params =>
        executeWithdrawalFromStrataVault({
          ...params,
          ...input,
        }),
      ),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const { poolIndex } = onSuccessParams[1];

        captureAnalyticEvent('Token withdrawals executed from STRATA vault', {
          poolIndex,
          rewardTokenSymbol: TOKENS.strata.symbol,
        });

        const accountAddress = await strataVaultContract?.signer.getAddress();

        // Invalidate cached user info
        queryClient.invalidateQueries([
          FunctionKey.GET_STRATA_VAULT_USER_INFO,
          { accountAddress, rewardTokenAddress: TOKENS.strata.address, poolIndex },
        ]);

        // Invalidate cached user withdrawal requests
        queryClient.invalidateQueries([
          FunctionKey.GET_STRATA_VAULT_WITHDRAWAL_REQUESTS,
          {
            rewardTokenAddress: TOKENS.strata.address,
            poolIndex,
            accountAddress,
          },
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
          { rewardTokenAddress: TOKENS.strata.address, poolIndex },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useExecuteWithdrawalFromStrataVault;
