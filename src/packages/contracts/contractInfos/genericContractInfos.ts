import type { JsonFragment } from '@ethersproject/abi';

import { abi as IsUSDeAbi } from 'strata-contracts/artifacts/contracts/interfaces/IsUSDe.sol/IsUSDe.json';
import { abi as pUSDeVaultAbi } from 'strata-contracts/artifacts/contracts/predeposit/pUSDeVault.sol/pUSDeVault.json';
import { abi as pUSDeDepositorAbi } from 'strata-contracts/artifacts/contracts/predeposit/pUSDeDepositor.sol/pUSDeDepositor.json';
import { abi as ERC4626Abi } from 'strata-contracts/artifacts/contracts/test/MockERC4626.sol/MockERC4626.json';
import { abi as TrancheAbi } from 'strata-contracts/artifacts/contracts/tranches/Tranche.sol/Tranche.json';
import { abi as TrancheDepositorAbi } from 'strata-contracts/artifacts/contracts/tranches/TrancheDepositor.sol/TrancheDepositor.json';
import { abi as CdoAbi } from 'strata-contracts/artifacts/contracts/tranches/StrataCDO.sol/StrataCDO.json';

import { abi as AprPairFeedAbi } from 'strata-contracts/artifacts/contracts/tranches/oracles/AprPairFeed.sol/AprPairFeed.json';

import { IsUSDe, PUSDeVault, PUSDeDepositor, MockERC4626, Tranche, StrataCDO, TrancheDepositor } from '../types/contracts/index';
import { ChainlinkFeed } from '../types/external/index';

import multicall3Abi from './externalAbis/multicall3.json';
import chainlinkAbi from './externalAbis/chainlinkFeed.json';
import { AprPairFeed } from '../types/contracts/tranches/oracles';


export interface GenericContractInfo {
  abi: JsonFragment[];
}

const isUSDe: GenericContractInfo = {
  abi: IsUSDeAbi,
};

const chainlinkFeed: GenericContractInfo = {
  abi: chainlinkAbi,
};


const erc20: GenericContractInfo = {
  abi: IsUSDeAbi,
};

const pUSDeVault: GenericContractInfo = {
  abi: pUSDeVaultAbi,
};

const pUSDeDepositor: GenericContractInfo = {
  abi: pUSDeDepositorAbi,
};

const genericContractInfos = {
  isUSDe,
  pUSDeVault,
  pUSDeDepositor,
  erc20,
  chainlinkFeed,
  erc4626: {
    abi: ERC4626Abi,
  } as GenericContractInfo,
  aprPairFeed: {
    abi: AprPairFeedAbi,
  } as GenericContractInfo,
  tranche: {
    abi: TrancheAbi
  } as GenericContractInfo,
  cdo: {
    abi: CdoAbi
  } as GenericContractInfo,
  trancheDepositor: {
    abi: TrancheDepositorAbi
  } as GenericContractInfo
};

export type GenericContractName = keyof typeof genericContractInfos;

export type GenericContractTypes = {
  isUSDe: IsUSDe;
  pUSDeVault: PUSDeVault;
  pUSDeDepositor: PUSDeDepositor;
  erc20: IsUSDe;
  erc4626: MockERC4626;
  chainlinkFeed: ChainlinkFeed;
  aprPairFeed: AprPairFeed;
  tranche: Tranche;
  cdo: StrataCDO;
  trancheDepositor: TrancheDepositor
};

export type GenericContractTypeByName<TContractName extends GenericContractName> =
  GenericContractTypes[TContractName];

export default genericContractInfos;
