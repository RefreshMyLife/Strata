import BigNumber from 'bignumber.js';
import { BigNumber as BigNumber2 } from 'ethers';
import { Token } from 'types';

import { formatTokensToReadableValue } from './formatTokensToReadableValue';

export interface ConvertWeiToTokensInput<T extends boolean | undefined = false> {
  valueWei: BigNumber | BigNumber2;
  token: Token;
  returnInReadableFormat?: T;
  addSymbol?: boolean;
  maxDecimals?: number;
}

export type ConvertWeiToTokensOutput<T> = T extends true ? string : BigNumber;

export function convertWeiToTokens<T extends boolean | undefined = false>({
  valueWei,
  token,
  returnInReadableFormat = false,
  addSymbol = true,
  maxDecimals,
}: ConvertWeiToTokensInput<T>): ConvertWeiToTokensOutput<T> {
  if (valueWei instanceof BigNumber2) {
    valueWei = new BigNumber(valueWei.toString());
  }
  const valueTokens = valueWei
    .dividedBy(new BigNumber(10).pow(token.decimals))
    .decimalPlaces(token.decimals);

  return (
    returnInReadableFormat
      ? formatTokensToReadableValue({
          value: valueTokens,
          token,
          addSymbol,
          maxDecimals,
        })
      : valueTokens
  ) as ConvertWeiToTokensOutput<T>;
}

export default convertWeiToTokens;
