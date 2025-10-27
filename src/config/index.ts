import { ChainId, ChainIdFrom, NetworkIdFrom } from 'packages/contracts';
import { Environment } from 'types';

import { API_ENDPOINT_URLS, RPC_URLS } from 'constants/endpoints';


import { ENV_VARIABLES } from './envVariables';

export interface Config {
  chainId: number;
  // For forked networks, otherwise chainId === networkId
  networkId: number;
  environment: Environment;
  isOnTestnet: boolean;
  apiUrl: string;
  rpcUrls: {
    [chainId in ChainId]: {
      http: string;
      webSocket?: string;
    };
  };

  sentryDsn: string;
  posthog: {
    apiKey: string;
    hostUrl: string;
  };
}


const environment: Environment = ENV_VARIABLES.VITE_ENVIRONMENT as Environment ?? 'testnet';

const isOnTestnet = environment === 'testnet' || environment === 'ci' || environment === 'hardhat';


const rpcUrls = RPC_URLS;

const apiUrl = API_ENDPOINT_URLS[environment];


const config: Config = {
  chainId: ChainIdFrom(environment),
  networkId: NetworkIdFrom(environment),
  environment,
  isOnTestnet,
  apiUrl,
  rpcUrls,

  sentryDsn: ENV_VARIABLES.VITE_SENTRY_DSN || '',
  posthog: {
    apiKey: ENV_VARIABLES.VITE_POSTHOG_API_KEY || '',
    hostUrl: ENV_VARIABLES.VITE_POSTHOG_HOST_URL || '',
  },
};


export { ENV_VARIABLES } from './envVariables';
export default config;
