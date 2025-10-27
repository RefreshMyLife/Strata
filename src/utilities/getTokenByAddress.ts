import { Token } from 'types';
import { areAddressesEqual } from 'utilities';

import { TOKENS } from 'constants/tokens';

const getTokenByAddress = (address?: string | null) => {
  if (!address) {
    return TOKENS.eth;
  }
  for (let key in TOKENS) {
    const token = TOKENS[key];
    if (token?.address == null) {
      continue;
    }
    if (areAddressesEqual(token.address, address)) {
      return token;
    }
  }

  console.error(`Token ${address} not found`, TOKENS);
  return null;
};

export default getTokenByAddress;
