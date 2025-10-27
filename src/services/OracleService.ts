import alot from 'alot';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import config from 'src/config';
import { RPC_URLS } from 'src/constants/endpoints';
import { ADDRESSES, TOKENS } from 'src/constants/tokens';
import getProvider from 'src/context/AuthContext/useProvider/getProvider';
import useGetGenericContract from 'src/hooks/useGetGenericContract';
import { ChainId, getGenericContract } from 'src/packages/contracts';
import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export namespace OracleService {

    export function useGetPrice(token: Token, amount: number | string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getPrice(token, amount),
            queryKey: [`price(${token.address},${amount})`],
        });
    }
    export function useGetERC4626PricePerShareMany(tokens: Token[]) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getERC4626PricePerShareMany(tokens),
            queryKey: [`pps-many(${tokens.map(x => x.symbol)})`],
        });
    }

    export async function getPrice (token: Token, amount: number | string) {
        let x = Number(amount);
        if (x === 0) {
            return 0;
        }
        const price = await getTokenPrice(token.symbol);
        return price * x;
    }

    const feeds = {
        USDe: '0xa569d910839Ae8865Da8F8e70FfFb0cBA869F961',
        pUSDe: '0xa569d910839Ae8865Da8F8e70FfFb0cBA869F961',
        sUSDe: '0xFF3BC18cCBd5999CE63E788A1c250a88626aD099',
        USDC: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
        USDT: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
        eUSDe: '0xa569d910839Ae8865Da8F8e70FfFb0cBA869F961',
    };

    const testnet = {
        USDe: 1,
        pUSDe: 1,
        sUSDe: 1.2,
        USDC: 1,
        USDT: 1,
        eUSDe: 1,
    };

    async function getTokenPrice (symbol: string) {
        return PromiseUtil.memoize(async () => {
            // https://ethereum-rpc.publicnode.com

            const url = RPC_URLS[ChainId.ETHEREUM_MAINNET].http;
            const provider = new ethers.providers.JsonRpcProvider(url);

            if (symbol === 'srUSDe' || symbol === 'jrUSDe') {
                let tranche = ADDRESSES[ChainId.ETHEREUM_MAINNET][symbol.toLowerCase()];
                let cdo = $rpc.contract({ name: 'cdo' })
                const [ priceInUSDe, usde ] = await Promise.all([
                    cdo.pricePerShare(tranche),
                    getTokenPrice('USDe')
                ]);
                return BigNumberUtil.toEther(priceInUSDe) * usde;
            }

            const feedAddress = feeds[symbol];
            const feed = getGenericContract({
                name: 'chainlinkFeed',
                address: feedAddress,
                signerOrProvider: provider
            });
            const price = await feed.latestAnswer();
            return price / 10**8;
        }, symbol);
    }

    export async function getERC4626PricePerShareMany (tokens: Token[]) {
        return PromiseUtil.memoize(async () => {
            let result = await alot(tokens)
                .mapAsync(t => getERC4626PricePerShare(t.symbol))
                .toArrayAsync();

            let tokensWithPps = tokens.map((t, i) => {
                return {
                    ...t,
                    ...result[i]
                };
            })
            return tokensWithPps;

        }, `pps-many(${tokens.map(x => x.symbol)})`);
    }

    async function getERC4626PricePerShare (symbol: string) {
        return PromiseUtil.memoize(async () => {
            // https://ethereum-rpc.publicnode.com

            if (symbol === 'srUSDe' || symbol === 'jrUSDe') {
                let cdo = $rpc.contract({
                    name: 'cdo'
                });
                let tranche = TOKENS[symbol.toLowerCase()].address;
                let pps = BigNumberUtil.toEther(await cdo.pricePerShare(tranche));
                return { pps }
            }

            let contract = $rpc.contract({
                name: 'erc4626',
                address: ADDRESSES[ChainId.ETHEREUM_MAINNET][symbol.toLowerCase()],
                chainId: ChainId.ETHEREUM_MAINNET
            });

            let [
                assets,
                supply
            ] = await Promise.all([
                contract.totalAssets(),
                contract.totalSupply(),
            ]);

            const pps = BigNumberUtil.toEther(assets) / BigNumberUtil.toEther(supply);
            return {
                pps,
            };
        }, `pps(${symbol}`);
    }
}
