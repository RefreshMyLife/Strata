export enum ChainId {
  'HARDAHAT' = 1337,
  'ETHEREUM_TESTNET' = 560048,
  'ETHEREUM_MAINNET' = 1
}

export function ChainIdFrom(network: string) {
  let chainId = localStorage.getItem('chainId');
  if (chainId !== null) {
    return Number(chainId);
  }

  switch (network) {
    case 'hardhat':
      return ChainId.HARDAHAT;
    case 'testnet':
      return ChainId.ETHEREUM_TESTNET;
    case 'mainnet':
    case 'ethereum':
      return ChainId.ETHEREUM_MAINNET;
    default:
      throw new Error(`Invalid network: ${network}`);
  }
}
export function NetworkIdFrom (network: string) {
  let chainId = ChainIdFrom(network);
  if (chainId === ChainId.HARDAHAT) {
    return ChainId.ETHEREUM_MAINNET;
  }
  return chainId;
}

export function changeChainId(chainId: number) {
  localStorage.setItem('chainId', chainId.toString());
  if (chainId === ChainId.ETHEREUM_MAINNET) {

  }
  window.location.reload();
}
