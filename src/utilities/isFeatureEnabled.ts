import { ENV_VARIABLES } from 'config';

export type FeatureFlag =  'integratedSwap';

const featureFlags = {
  integratedSwap: false,
};

const isFeatureEnabled = (featureFlag: FeatureFlag) => featureFlags[featureFlag];

export default isFeatureEnabled;
