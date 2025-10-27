import BigNumber from 'bignumber.js';
import { ContractReceipt } from 'ethers';

import { VError, VErrorPhraseMap } from './VError';
import {
  ComptrollerErrorReporterError,
  ComptrollerErrorReporterFailureInfo,
  TokenErrorReporterError,
  TokenErrorReporterFailureInfo,
  SeUsdControllerErrorReporterError,
  SeUsdControllerErrorReporterFailureInfo,
  SeUsdVaultErrorReporterError,
  SeUsdVaultErrorReporterInfo,
  StrataVaultProxyErrorReporterError,
  StrataVaultProxyErrorReporterInfo,
} from './contractErrors';

// Some contracts don't revert when failing but instead return a Failure event.
// These functions are used to detect such cases and throw an error when a
// Failure event is detected

const checkForTransactionError = (
  receipt: ContractReceipt,
  errorEnum:
    | typeof ComptrollerErrorReporterError
    | typeof TokenErrorReporterError
    | typeof SeUsdControllerErrorReporterError
    | typeof SeUsdVaultErrorReporterError
    | typeof StrataVaultProxyErrorReporterError,
  infoEnum:
    | typeof ComptrollerErrorReporterFailureInfo
    | typeof TokenErrorReporterFailureInfo
    | typeof SeUsdControllerErrorReporterFailureInfo
    | typeof SeUsdVaultErrorReporterInfo
    | typeof StrataVaultProxyErrorReporterInfo,
) => {
  const failureEvent = receipt.events?.find(event => event.event === 'Failure');

  if (failureEvent) {
    const errorIndex = failureEvent.args?.error
      ? // eslint-disable-next-line no-underscore-dangle
        new BigNumber(failureEvent.args.error._hex).toNumber()
      : 0;

    throw new VError({
      type: 'transaction',
      code: errorEnum[errorIndex] as VErrorPhraseMap['transaction'],
      data: {
        error: errorEnum[errorIndex] as VErrorPhraseMap['transaction'],
        info: infoEnum[errorIndex] as VErrorPhraseMap['transaction'],
      },
    });
  }
  return receipt;
};

export const checkForComptrollerTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    ComptrollerErrorReporterError,
    ComptrollerErrorReporterFailureInfo,
  );

export const checkForTokenTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(receipt, TokenErrorReporterError, TokenErrorReporterFailureInfo);

export const checkForSeUsdControllerTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    SeUsdControllerErrorReporterError,
    SeUsdControllerErrorReporterFailureInfo,
  );

export const checkForSeUsdVaultTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(receipt, SeUsdVaultErrorReporterError, SeUsdVaultErrorReporterInfo);

export const checkForStrataVaultProxyTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    StrataVaultProxyErrorReporterError,
    StrataVaultProxyErrorReporterInfo,
  );


export const checkForPreDepositTransactionError = (receipt: ContractReceipt) =>
  checkForTransactionError(
    receipt,
    StrataVaultProxyErrorReporterError,
    StrataVaultProxyErrorReporterInfo,
  );
