import { useMemo } from 'react';
import { usePublicClient } from 'wagmi';

import config from 'src/config';
import getProvider from './getProvider';

const useProvider = () => {
  const chainId = config.chainId;
  const publicClient = usePublicClient({ chainId });
  return useMemo(() => getProvider({ publicClient }), [publicClient]);
};

export default useProvider;
