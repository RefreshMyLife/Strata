import { getDefaultConfig } from 'connectkit';
import { http, createConfig, fallback, type CreateConfig } from 'wagmi';
import localConfig from 'config';
import { defineChain, type Chain } from 'viem';
import { ChainId } from 'src/packages/contracts';
import { WALLET_CONNECT_PROJECT_ID } from 'src/constants/walletConnect';
import { mainnet } from 'viem/chains';



export const chains: Chain[] = {
  [ChainId.ETHEREUM_TESTNET]: [
    defineChain({
      id: 560048,
      network: 'hoodi',
      name: 'Ethereum Hoodi Testnet',
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: {
          http: ['https://ethereum-hoodi-rpc.publicnode.com'],
        },
        public: {
          http: ['https://ethereum-hoodi-rpc.publicnode.com'],
        },
      },
      blockExplorers: {
        default: {
          name: 'Etherscan',
          url: 'https://hoodi.etherscan.io/',
        },
      },
      contracts: {
        multicall3: {
          address: '0xca11bde05977b3631167028862be2a173976ca11',
          blockCreated: 2589,
        },
      },
      testnet: true,
    })
  ],
  [ChainId.ETHEREUM_MAINNET]: [
    defineChain({
      id: 1,
      network: 'eth',
      name: 'Ethereum Mainnet',
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: {
          http: [localConfig.rpcUrls[ChainId.ETHEREUM_MAINNET].http],
        },
        public: {
          http: ['https://eth-mainnet.public.blastapi.io'],
        },
      },
      blockExplorers: {
        default: {
          name: 'Etherscan',
          url: 'https://etherscan.io/',
        },
      },
      contracts: {
        ensRegistry: {
          address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        },
        ensUniversalResolver: {
          address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67',
          blockCreated: 19_258_213,
        },
        multicall3: {
          address: '0xca11bde05977b3631167028862be2a173976ca11',
          blockCreated: 14_353_601,
        },
      }
    })
  ],
}[localConfig.chainId];

const connectKitConfig = getDefaultConfig({
  chains: chains as [Chain, ...Chain[]],
  transports: chains.reduce((acc, chain) => {
    const urls = [localConfig.rpcUrls[chain.id as ChainId].http];

    return {
      ...acc,
      [chain.id]: fallback([
        ...urls.map(url => http(url)),
        // Add public RPC Node as a last resort solution
        http(),
      ]),
    };
  }, {}),
  walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
  appName: 'Strata',
  appUrl: `https://deposit.strata.money`,
  appDescription: 'Structured Yield Products.',
  appIcon: 'https://s3.strata.money/strata.svg',
  batch: {
    multicall: {
      wait: 50,
    },
  },
});


export const web3Config: CreateConfig = createConfig(connectKitConfig);

export default web3Config;
