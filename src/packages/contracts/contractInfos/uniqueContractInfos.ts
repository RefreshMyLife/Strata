import type { JsonFragment } from '@ethersproject/abi';

import { abi as StakedUSDeAbi } from 'strata-contracts/artifacts/contracts/test/MockStakedUSDe.sol/MockStakedUSDe.json';
import { abi as USDeAbi } from 'strata-contracts/artifacts/contracts/test/MockUSDe.sol/MockUSDe.json';

import { abi as pUSDeVaultAbi } from 'strata-contracts/artifacts/contracts/predeposit/pUSDeVault.sol/pUSDeVault.json';
import { abi as pUSDeDepositorAbi } from 'strata-contracts/artifacts/contracts/predeposit/pUSDeDepositor.sol/pUSDeDepositor.json';

import { abi as IResilientOracleAbi } from 'strata-contracts/artifacts/contracts/interfaces/IOracle.sol/IResilientOracle.json';

import { abi as TrancheAbi } from 'strata-contracts/artifacts/contracts/tranches/Tranche.sol/Tranche.json';
import { abi as StrataCDOAbi } from 'strata-contracts/artifacts/contracts/tranches/StrataCDO.sol/StrataCDO.json';
import { abi as StrategyAbi } from 'strata-contracts/artifacts/contracts/tranches/Strategy.sol/Strategy.json';
import { abi as TrancheDepositorAbi } from 'strata-contracts/artifacts/contracts/tranches/TrancheDepositor.sol/TrancheDepositor.json';
import { abi as ERC20CooldownAbi } from 'strata-contracts/artifacts/contracts/tranches/base/cooldown/ERC20Cooldown.sol/ERC20Cooldown.json';
import { abi as UnstakeCooldownAbi } from 'strata-contracts/artifacts/contracts/tranches/base/cooldown/UnstakeCooldown.sol/UnstakeCooldown.json';


import DEPLOY_ethereum from '@/deployments/deployments-eth.json';
import DEPLOY_ethereum_testnet from '@/deployments/deployments-hoodi.json';

import { Multicall3 } from '../types/contracts/others';

import { ChainId } from '../types';
import multicall3Abi from './externalAbis/multicall3.json';
import { MockStakedUSDe, MockUSDe, Tranche, StrataCDO, Strategy, TrancheDepositor, UnstakeCooldown, ERC20Cooldown } from '../types/contracts';
import { PUSDeDepositor, PUSDeVault } from '../types/contracts/preDeposit';


const DEPLOYMENTS = {
  [ChainId.HARDAHAT]: [

  ],
  [ChainId.ETHEREUM_MAINNET]: [
    ...DEPLOY_ethereum
  ],
  [ChainId.ETHEREUM_TESTNET]: [
    ...DEPLOY_ethereum_testnet
  ],
} as { [key: number]: TDeployments[] };


type TDeployments = {
  id: string;
  name: string;
  address: string;
};

function getAddress(mix: number | TDeployments[], name: string) {
  let deployments = typeof mix === 'number' ? DEPLOYMENTS[mix] : mix;
  let info = deployments.find(x => x.id === name || x.name === name);
  if (info == null) {
    info = deployments.find(x => x.id.endsWith(name));
  }
  if (info == null) {
    info = deployments.find(x => x.id.startsWith(name));
  }
  if (!info?.address) {
    console.log(`Contract ${name} not found in ${mix}`);
  }
  return info?.address ?? '0x0000000000000000000000000000000000000000';
}

export interface UniqueContractInfo {
  abi: JsonFragment[];
  address: Partial<{
    [chainId in ChainId]: string;
  }>;
}

const sUSDe: UniqueContractInfo = {
  abi: StakedUSDeAbi,
  address: {
    [ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, 'sUSDe'),
    [ChainId.ETHEREUM_TESTNET]: getAddress(ChainId.ETHEREUM_TESTNET, 'sUSDe'),
  },
};


const USDe: UniqueContractInfo = {
  abi: USDeAbi,
  address: {
    [ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, 'USDe'),
    [ChainId.ETHEREUM_TESTNET]: getAddress(ChainId.ETHEREUM_TESTNET, 'USDe'),
  },
};

const pUSDeVault: UniqueContractInfo = {
  abi: pUSDeVaultAbi,
  address: {
    //[ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, 'pUSDeVault'),
    [ChainId.ETHEREUM_TESTNET]: '0x345CFCe350c1C6Dc653B5f2E187d4f109E8C4B95',
  },
};

const pUSDeDepositor: UniqueContractInfo = {
  abi: pUSDeDepositorAbi,
  address: {
    //[ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, 'pUSDeDepositor'),
    [ChainId.ETHEREUM_TESTNET]: '0x4084BBEc368FaF50beb08bdeFf39D5a4765b65C2',
  },
};

const multicall3: UniqueContractInfo = {
  abi: multicall3Abi,
  address: {
    [ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, 'Multicall3'),
  }
};

const resilientOracle: UniqueContractInfo = {
  abi: IResilientOracleAbi,
  address: {
    [ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, 'ResilientOracle'),
    [ChainId.ETHEREUM_TESTNET]: getAddress(ChainId.ETHEREUM_TESTNET, 'ResilientOracle'),
  }
};

function factory(abi, id: string) {
  let info = {
    abi,
    address: {
      [ChainId.ETHEREUM_MAINNET]: getAddress(ChainId.ETHEREUM_MAINNET, id),
      [ChainId.ETHEREUM_TESTNET]: getAddress(ChainId.ETHEREUM_TESTNET, id),
    }
  } as UniqueContractInfo;
  return info;
}

const uniqueContractInfos = {
  USDe,
  sUSDe,
  pUSDeVault,
  pUSDeDepositor,
  multicall3,
  trancheDepositor: factory(TrancheDepositorAbi, 'TrancheDepositor')
};

export type UniqueContractName = keyof typeof uniqueContractInfos;

export type UniqueContractTypes = {
  USDe: MockUSDe;
  sUSDe: MockStakedUSDe;
  pUSDeVault: PUSDeVault;
  pUSDeDepositor: PUSDeDepositor;
  trancheDepositor: TrancheDepositor
  multicall3: Multicall3;
};

export type UniqueContractTypeByName<TContractName extends UniqueContractName> =
  UniqueContractTypes[TContractName];

export default uniqueContractInfos;


export const uniqueContractInfosCDOs = {
  ethenaCdo: {
    jrtVault: factory(TrancheAbi, 'USDeJrt'),
    srtVault: factory(TrancheAbi, 'USDeSrt'),
    strategy: factory(StrategyAbi, 'SUSDeStrategy'),
    cdo: factory(StrataCDOAbi, 'USDeCDO'),
    erc20Cooldown: factory(ERC20CooldownAbi, 'ERC20Cooldown'),
    unstakeCooldown: factory(UnstakeCooldownAbi, 'UnstakeCooldown'),
    //depositor
  }
}

export type UniqueContractCDOTypes = {
  jrtVault: Tranche;
  srtVault: Tranche;
  strategy: Strategy;
  cdo: StrataCDO;
  unstakeCooldown: UnstakeCooldown;
  erc20Cooldown: ERC20Cooldown;
};
