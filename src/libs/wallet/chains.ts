
import {
  type Chain,
  arbitrum as arbitrumOne,
  arbitrumSepolia,
  base,
  baseSepolia,
  berachain,
  berachainBepolia,
  bsc as bscMainnet,
  bscTestnet,
  mainnet as ethereum,
  opBNB as opBNBMainnet,
  opBNBTestnet,
  optimism as optimismMainnet,
  optimismSepolia,
  sepolia,
  unichain,
  unichainSepolia,
  zksync as zksyncMainnet,
  zksyncSepoliaTestnet,
} from 'wagmi/chains';

import localConfig from 'config';
import { ChainId } from 'src/packages/contracts';


export const chainMapping = {
  [ChainId.ETHEREUM_MAINNET]: ethereum,
} as const satisfies Record<ChainId, Chain>;

const getSupportedChains = () => {
  const chainIds = [ChainId.ETHEREUM_MAINNET];

  const chains: Chain[] = chainIds.map(chainId => chainMapping[chainId]);

  return chains;
};

export const governanceChain =
  chainMapping[ChainId.ETHEREUM_MAINNET];

export const chains = getSupportedChains();

export const defaultChain = chains[0];
