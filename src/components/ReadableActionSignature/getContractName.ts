import { ChainId, uniqueContractInfos } from 'packages/contracts';
import { areAddressesEqual, getTokenByAddress } from 'utilities';

export interface GetContractNameInput {
  target: string;
  chainId?: ChainId;
}

const getContractName = ({ target, chainId }: GetContractNameInput) => {
  // Search within tokens
  const token = getTokenByAddress(target);
  if (token) {
    return token.symbol;
  }
  if (!chainId) {
    return target;
  }

  // Search within unique contracts
  const matchingUniqueContractInfo = Object.entries(uniqueContractInfos).find(
    ([_uniqueContractName, uniqueContractInfo]) => {
      const contractAddress = uniqueContractInfo.address[chainId];
      return !!contractAddress && areAddressesEqual(contractAddress, target);
    },
  );

  if (matchingUniqueContractInfo) {
    const contractName = matchingUniqueContractInfo[0];
    return `${contractName.charAt(0).toUpperCase()}${contractName.slice(1)}`;
  }

  return target;
};

export default getContractName;
