import { UniqueContractName, getUniqueContract } from 'packages/contracts';
import { useMemo } from 'react';

import { useAuth } from 'context/AuthContext';
import config from 'src/config';

export interface UseGetUniqueContractInput<TContractName extends UniqueContractName> {
  name: TContractName;
  passSigner?: boolean;
}

function useGetUniqueContract<TContractName extends UniqueContractName>({
  name,
  passSigner = false,
}: UseGetUniqueContractInput<TContractName>) {
  const { signer, provider, chainId } = useAuth();
  const signerOrProvider = passSigner ? signer : provider;



  return useMemo(
    () =>
      !!signerOrProvider
        ? getUniqueContract({
            name,
            chainId: config.chainId,
            signerOrProvider,
          })
        : undefined,
    [signerOrProvider, chainId, name],
  );
}

export interface UseGetUniqueContractAddress<TContractName extends UniqueContractName> {
  name: TContractName;
}

export default useGetUniqueContract;
