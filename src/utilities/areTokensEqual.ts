import { Token, LuToken } from 'types';

export const areTokensEqual = (tokenA: Token | LuToken, tokenB: Token | LuToken) =>
  tokenA.address.toLowerCase() === tokenB.address.toLowerCase();

export default areTokensEqual;
