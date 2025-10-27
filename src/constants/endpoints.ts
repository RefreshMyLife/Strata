import { ChainId } from 'packages/contracts';
import { ENV_VARIABLES } from 'src/config/envVariables';

import { Environment } from 'types';

export const API_ENDPOINT_URLS: Record<Environment, string> = {
  //mainnet: 'http://localhost:5005',
  mainnet: 'https://api.strata.money',
  preview: 'https://api.strata.money',
  testnet: 'https://api.strata.money',
  hardhat: 'http://localhost:5003',
  ci: 'https://api.strata.money',
};

export const RPC_URLS: {
  [chainId in ChainId]: {
    http: string;
    webSocket?: string;
  };
} = {
  [ChainId.HARDAHAT]: {
    http: 'http://localhost:8545',
    webSocket: 'wss://localhost:8545',
  },

  [ChainId.ETHEREUM_TESTNET]: {
    http: 'https://ethereum-hoodi-rpc.publicnode.com',
    webSocket: undefined,
  },
  [ChainId.ETHEREUM_MAINNET]: {
    http: ENV_VARIABLES.VITE_RPC_MAINNET_URL,
    webSocket: 'wss://eth.drpc.org',
  },

};
