import { MutationObserverOptions, useMutation } from '@tanstack/react-query';
import { Token } from 'types';
import { callOrThrow, convertWeiToTokens } from 'utilities';

import {
  StakeInPreDepositInput,
  StakeInPreDepositOutput,
  queryClient,
  stakeInPreDeposit,
} from 'clients/api';
import FunctionKey from 'constants/functionKey';
import { useAnalytics } from 'context/Analytics';
import useGetUniqueContract from 'hooks/useGetUniqueContract';

type TrimmedStakeInPreDepositInput = Omit<StakeInPreDepositInput, 'strataVaultContract'>;
type Options = MutationObserverOptions<StakeInPreDepositOutput, Error, TrimmedStakeInPreDepositInput>;

const useStakeInPreDeposit = (
  {
    stakedToken,
    receiver
  }: { stakedToken: Token; receiver: string },
  options?: Options,
) => {
  const pUSDeVault = useGetUniqueContract({
    name: 'pUSDeVault',
    passSigner: true,
  });

  const { captureAnalyticEvent } = useAnalytics();

  return useMutation(
    FunctionKey.STAKE_IN_STRATA_VAULT,
    (input: TrimmedStakeInPreDepositInput) =>
      callOrThrow({ pUSDeVault: pUSDeVault, receiver }, params =>
        stakeInPreDeposit({
          ...params,
          ...input,
        }),
      ),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const { amountWei } = onSuccessParams[1];


        const accountAddress = await pUSDeVault?.signer.getAddress();


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
            accountAddress: pUSDeVault?.address,
            tokenAddress: stakedToken.address,
          },
        ]);


        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeInPreDeposit;
