import { useChainId } from 'libs/wallet';
import { ChainId } from 'src/packages/contracts';


export const featureFlags = {
  integratedSwap: [],
  prime: [],
  primeCalculator: [],
  tusdMigrationWarning: [],
  trxMigrationWarning: [],
  sxpDisablingWarning: [],
  bethUpdateWarning: [],
  vaiRoute: [, ],
  swapRoute: [],
  createProposal: [, ],
  voteProposal: [, ],
  apyCharts: [

  ],
  marketParticipantCounts: [

  ],
  bridgeRoute: [

  ],
  wrapUnwrapNativeToken: [

  ],
  gaslessTransactions: [, ],
  web3DomainNames: [, , ],
  burnedWBnbButton: [],
  importPositions: [

  ],
  importAavePositions: [

  ],
};

export type FeatureFlag = keyof typeof featureFlags;

export interface UseIsFeatureEnabledInput {
  name: FeatureFlag;
}

export const useIsFeatureEnabled = ({ name }: UseIsFeatureEnabledInput) => {
  console.log(`<<<<useIsFeatureEnabled>>>`, name);
  return true;
  const { chainId } = useChainId();
  return featureFlags[name].includes(chainId);
};
