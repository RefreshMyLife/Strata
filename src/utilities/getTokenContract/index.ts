import type { Provider } from '@ethersproject/abstract-provider';
import { Signer } from 'ethers';
import { getGenericContract } from 'packages/contracts';
import { Token } from 'types';

const getTokenContract = ({
  token,
  signerOrProvider,
}: {
  token: Token;
  signerOrProvider: Signer | Provider;
}) => {
  let name: 'erc20' | 'STRATA' | 'seusd' | 'srt' = 'erc20';

  if (token.symbol === 'STRATA') {
    name = 'strata';
  }

  return getGenericContract({
    name,
    address: token.address,
    signerOrProvider,
  });
};

export default getTokenContract;
