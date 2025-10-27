import BigNumber from 'bignumber.js';
import { VError } from 'errors';
import { Token } from 'types';
import { useStakeInStrataVault } from 'clients/api';
import { areTokensEqual } from 'utilities';



export interface UseStakeInVaultInput {
  stakedToken: Token;
  rewardToken: Token;
  poolIndex?: number;
}

interface StakeInput {
  amountWei: BigNumber;
}

const useStakeInVault = ({ stakedToken, rewardToken, poolIndex }: UseStakeInVaultInput) => {
  const { mutateAsync: stakeInStrataVault, isLoading: isStakeInStrataVaultLoading } = useStakeInStrataVault({
    stakedToken,
    rewardToken,
  });



  const isLoading = isStakeInStrataVaultLoading;

  const stake = async ({ amountWei }: StakeInput) => {
    if (typeof poolIndex === 'number') {
      return stakeInStrataVault({
        poolIndex,
        rewardToken,
        amountWei,
      });
    }
    // This cose should never be reached, but just in case we throw a generic
    // internal error
    throw new VError({
      type: 'unexpected',
      code: 'somethingWentWrong',
    });
  };

  return {
    isLoading,
    stake,
  };
};

export default useStakeInVault;
