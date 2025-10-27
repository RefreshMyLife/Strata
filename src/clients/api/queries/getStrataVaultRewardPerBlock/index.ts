import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';

export interface GetStrataVaultRewardPerBlockInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  tokenAddress: string;
}

export type GetStrataVaultRewardPerBlockOutput = {
  rewardPerBlockWei: BigNumber;
};

const getStrataVaultRewardPerBlock = async ({
  strataVaultContract,
  tokenAddress,
}: GetStrataVaultRewardPerBlockInput): Promise<GetStrataVaultRewardPerBlockOutput> => {
  const res = await strataVaultContract.rewardTokenAmountsPerBlock(tokenAddress);

  return {
    rewardPerBlockWei: new BigNumber(res.toString()),
  };
};

export default getStrataVaultRewardPerBlock;
