import config from 'src/config';
import { UniqueContractCDOTypes, UniqueContractName, uniqueContractInfos, uniqueContractInfosCDOs } from '../contractInfos';
import { ChainId } from '../types';

export type GetUniqueContractAddressInput = {
  name: UniqueContractName;
  chainId: ChainId;
};

export function getUniqueContractAddress({ name, chainId }: GetUniqueContractAddressInput) {
  let id = config.chainId === chainId ? config.networkId : chainId;
  if (uniqueContractInfos[name] == null) {
    console.error(`getUniqueContractAddress: Contract ${name} not found.`);
  }
  return uniqueContractInfos[name].address[id];
}

export function getUniqueContractCDOAddress(params: { name: keyof UniqueContractCDOTypes, chainId?: ChainId }, cdo: 'ethenaCdo' = 'ethenaCdo') {
  let { name, chainId } = params;
  let id = config.chainId === chainId ? config.networkId : chainId;
  let info = uniqueContractInfosCDOs;
  if (info[cdo][name] == null) {
    console.error(`getUniqueContractAddress: Contract ${name} not found.`);
  }
  return info[cdo][name].address[id];
}
