import BigNumber from 'bignumber.js';
import { Token } from 'types';

export const convertTokensToWei = ({ value, token }: { value: BigNumber | number; token: Token }) => {
  let x = typeof value === 'number' ? new BigNumber(value) : value;
  return x.multipliedBy(new BigNumber(10).pow(token.decimals)).dp(0);
}

export default convertTokensToWei;
