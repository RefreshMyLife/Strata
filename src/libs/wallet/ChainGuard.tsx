import React from 'react'
import config from 'src/config'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'

export function ChainGuard() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  React.useEffect(() => {
    if (isConnected && chainId !== config.chainId) {
      // fire-and-forget; wallet will prompt
      switchChain({ chainId: config.chainId })
    }
  }, [isConnected, chainId, switchChain])

  return null
}
