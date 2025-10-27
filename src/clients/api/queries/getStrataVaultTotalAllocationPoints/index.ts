import { ContractTypeByName } from 'packages/contracts';

export interface GetStrataVaultTotalAllocPointsInput {
  strataVaultContract: ContractTypeByName<'strataVault'>;
  tokenAddress: string;
}

export type GetStrataVaultTotalAllocPointsOutput = {
  totalAllocationPoints: number;
};

const getStrataVaultTotalAllocationPoints = async ({
  strataVaultContract,
  tokenAddress,
}: GetStrataVaultTotalAllocPointsInput): Promise<GetStrataVaultTotalAllocPointsOutput> => {
  const res = await strataVaultContract.totalAllocPoints(tokenAddress);

  return {
    totalAllocationPoints: res.toNumber(),
  };
};

export default getStrataVaultTotalAllocationPoints;
