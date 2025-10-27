import { ChainId } from 'packages/contracts';
import config from 'src/config';

const BLOCK_TIME_MS_PER_CHAIN = {
  [ChainId.ETHEREUM_MAINNET]: 13000,
  [ChainId.ETHEREUM_TESTNET]: 13000,
  [ChainId.HARDAHAT]: 3000,
} as Record<number, number>;

export const BLOCK_TIME_MS = BLOCK_TIME_MS_PER_CHAIN[config.chainId] ?? 3000;

// 20 blocks a minute, 60 minutes an hour, 24 hours a day
export const BLOCKS_PER_DAY = 24 * 60 * 60 / 0.4;

export const EXPLORER_URLS = {
  [ChainId.ETHEREUM_MAINNET]: 'https://etherscan.io',
  [ChainId.ETHEREUM_TESTNET]: 'https://hoodi.etherscan.io',
};
