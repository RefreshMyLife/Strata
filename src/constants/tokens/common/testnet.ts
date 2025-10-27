import { Token } from 'types';

import eth from 'assets/img/tokens/eth.svg';
import USDe from 'assets/img/tokens/USDe.svg';
import sUSDe from 'assets/img/tokens/sUSDe.png';
import pUSDe from 'assets/img/tokens/pUSDe.svg';
import eUSDe from 'assets/img/tokens/eUSDe.svg';
import USDC from 'assets/img/tokens/USDC.svg';
import USDT from 'assets/img/tokens/USDT.svg';
import strats from 'assets/img/tokens/strata_p.svg';
import pendleLP from 'assets/img/protocols/pendle.svg';
import pendleYT from 'assets/img/protocols/pendle.svg';
import termmax from 'assets/img/protocols/termmax.svg';

import jrusde from 'assets/img/tokens/jrUSDe.svg';
import srusde from 'assets/img/tokens/srUSDe.svg';


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
    name: 'USDe',
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
    name: 'Ethereal Pre-deposit Vault'
  } as Token,
  usdc: {
    address: '0x',
    decimals: 18,
    symbol: 'USDC',
    asset: USDC,
  } as Token,
  usdt: {
    address: '0x',
    decimals: 18,
    symbol: 'USDT',
    asset: USDT,
  } as Token,
  pusde: {
    address: '0x',
    decimals: 18,
    symbol: 'pUSDe',
    asset: pUSDe,
  } as Token,
  strats: {
    address: '0x',
    decimals: 18,
    symbol: 'STRATS',
    asset: strats,
  } as Token,
  pendleLP: {
    address: '0x',
    decimals: 18,
    symbol: 'Pendle LPT-pUSDe',
    asset: pendleLP,
  } as Token,
  pendleYT: {
    address: '0x',
    decimals: 18,
    symbol: 'Pendle YT-pUSDe',
    asset: pendleYT,
  } as Token,
  termmaxGT: {
    address: '0x',
    decimals: 18,
    symbol: 'GT:USDC/pUSDe',
    asset: termmax,
  } as Token,

  jrusde: {
    address: '0x',
    decimals: 18,
    symbol: 'jrUSDe',
    asset: jrusde,
  } as Token,
  srusde: {
    address: '0x',
    decimals: 18,
    symbol: 'srUSDe',
    asset: srusde,
  } as Token,
};
