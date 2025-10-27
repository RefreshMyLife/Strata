import BigNumber from 'bignumber.js';
import { ContractTypeByName } from 'packages/contracts';
import { ResilientOracle } from 'src/packages/contracts/types/contracts/oracle';
import { Token } from 'src/types';

export interface GetPriceInput {
  token: Token;
  oracle: ResilientOracle;
}


const getPrice = async ({
  token,
  oracle,
}: GetPriceInput): Promise<BigNumber> => {
  const res = await oracle.getPrice(token.address);

  return new BigNumber(res.toString()).div(1e18);
};

export default getPrice;
