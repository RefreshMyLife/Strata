import BigNumber from 'bignumber.js';

export type NonNullableFields<T> = Required<{
  [P in keyof T]: NonNullable<T[P]>;
}>;

export type Environment = 'ci' | 'testnet' | 'preview' | 'mainnet' | 'hardhat';

export interface Token {
  symbol: string;
  decimals: number;
  asset: string;
  address: string | '';
  isNative?: boolean;
}

export type TokenAction = 'deposit' | 'withdraw';

export interface TokenBalance {
  token: Token;
  balanceWei: BigNumber;
}

export interface AssetDistribution {
  token: Token;
  apyPercentage: BigNumber;
  dailyDistributedTokens: BigNumber;
}

export type TransactionEvent =
  | 'Deposit'
  | 'Withdraw'
  | 'Transfer';

export enum TransactionCategory {
  preDeposit = 'preDeposit',
  withdraw = 'withdraw'
}

export interface Transaction {
  title?: string
  amountWei: BigNumber;
  blockNumber: number;
  category: TransactionCategory;
  event: TransactionEvent;
  from: string;
  to: string;
  timestamp: Date;
  transactionHash: string;
  logIndex: string;
  token: Token;
  direction?: 'in' | 'out';
}

export interface Vault {
  stakedToken: Token;
  rewardToken: Token;
  stakingAprPercentage: number;
  totalStakedWei: BigNumber;
  dailyEmissionWei: BigNumber;
  lockingPeriodMs?: number;
  userStakedWei?: BigNumber;
  poolIndex?: number;
  balance?: number;
  hasPendingWithdrawalsFromBeforeUpgrade?: boolean;
}

export interface PreDeposit {
  stakedToken: Token;
  totalStaked: BigNumber;
  userStaked?: BigNumber;

  periodBegin: number;
  periodEnd: number;
  bonusEnd: number;
}


export interface LockedDeposit {
  amountWei: BigNumber;
  unlockedAt: Date;
}

