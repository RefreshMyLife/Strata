import BigNumber from 'bignumber.js';
import { Token, LuToken } from 'types';

import { ONE_TRILLION } from 'constants/numbers';
import PLACEHOLDER_KEY from 'constants/placeholderKey';

import shortenValueWithSuffix from '../shortenValueWithSuffix';

const MIN_VALUE = 0.000001;
const MAX_VALUE = 100 * ONE_TRILLION;
const MIN_DECIMALS = 2;
const MAX_DECIMALS = 4;

export interface FormatTokensToReadableValueInput {
  value: BigNumber | number | undefined;
  token?: Token | LuToken;
  addSymbol?: boolean;
  maxDecimals?: number;
  wei?: boolean;
}

export const formatTokensToReadableValue = ({
  value,
  token,
  maxDecimals,
  addSymbol = false,
  wei = false,
}: FormatTokensToReadableValueInput) => {
  if (value === undefined) {
    return PLACEHOLDER_KEY;
  }
  if (typeof value === 'number') {
    value = new BigNumber(value);
  }

  if (wei) {
    value = value
        .dividedBy(new BigNumber(10).pow(token.decimals))
        .decimalPlaces(token.decimals);
  }

  let readableValue: string;
  const absoluteValue = value.absoluteValue();
  const isNegative = value.isLessThan(0);
  if (absoluteValue.isEqualTo(0)) {
    readableValue = '0';
  } else if (absoluteValue.isGreaterThan(MAX_VALUE)) {
    const formattedReadableValue = shortenValueWithSuffix({
      minDecimalPlaces: MIN_DECIMALS,
      value: new BigNumber(MAX_VALUE),
    });
    readableValue = `${isNegative ? '< -' : '> '}${formattedReadableValue}`;
  } else if (absoluteValue.isLessThan(MIN_VALUE)) {
    readableValue = `< ${new BigNumber(MIN_VALUE).toFormat()}`;
  } else {
    const formattedReadableValue = shortenValueWithSuffix({
      value: absoluteValue,
      minDecimalPlaces: MIN_DECIMALS,
      maxDecimalPlaces: maxDecimals ?? token?.decimals ?? MAX_DECIMALS,
    });

    readableValue = `${isNegative ? '-' : ''}${formattedReadableValue}`;
  }

  if (addSymbol) {
    readableValue += ` ${token.symbol}`;
  }

  return readableValue;
};

export default formatTokensToReadableValue;
