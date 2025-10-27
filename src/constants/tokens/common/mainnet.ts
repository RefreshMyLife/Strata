import { Token } from 'types';

import eth from 'assets/img/tokens/eth.svg';
import USDe from 'assets/img/tokens/USDe.svg';
import sUSDe from 'assets/img/tokens/sUSDe.png';
import pUSDe from 'assets/img/tokens/pUSDe.svg';
import eUSDe from 'assets/img/tokens/eUSDe.svg';

export const ERC20_TOKENS = {
  eth: {
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    decimals: 18,
    symbol: 'ETH',
    asset: eth,
    isNative: true,
  } as Token,
  usde: {
    address: '0x',
    decimals: 18,
    symbol: 'USDe',
    asset: USDe,
  } as Token,
  susde: {
    address: '0x',
    decimals: 18,
    symbol: 'sUSDe',
    asset: sUSDe,
  } as Token,
  eusde: {
    address: '0x',
    decimals: 18,
    symbol: 'eUSDe',
    asset: eUSDe,
  } as Token,
  pusde: {
    address: '0x',
    decimals: 18,
    symbol: 'pUSDe',
    asset: pUSDe,
  } as Token,
};
