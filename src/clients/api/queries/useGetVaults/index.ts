import { useMemo } from 'react';
import { Vault } from 'types';
import { TOKENS } from 'src/constants/tokens';
import { TokenService } from 'src/services/TokenService';
import { convertTokensToWei } from 'src/utilities';



export interface UseGetVaultsOutput {
  isLoading: boolean;
  data: Vault[];
}

const useGetVaults = ({ accountAddress, chainId }: { accountAddress?: string; chainId: number }): UseGetVaultsOutput => {

  const { data: pUSDeDeposit, isLoading: isPUSDeLoading, isEnabled } = TokenService.useGetBalance(TOKENS.pusde, accountAddress);
  return {
      isLoading: isPUSDeLoading,
      data: [
        isPUSDeLoading || !isEnabled ? null : {
          stakedToken: TOKENS.usde,
          rewardToken: TOKENS.pusde,
          balance: pUSDeDeposit,
          userStakedWei: convertTokensToWei({ value: pUSDeDeposit, token: TOKENS.pusde }),
        }
      ].filter(Boolean),
    };
};

export default useGetVaults;
