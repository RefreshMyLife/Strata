

import { BigNumber, ethers } from 'ethers';
import { parseAbiItem } from 'viem'
import { getGenericContract, getUniqueContract } from 'src/packages/contracts';
import { Token } from 'src/types';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { TOKENS } from 'src/constants/tokens';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import config from 'src/config';
import web3Config from 'src/libs/wallet/Web3Wrapper/config';
import { getPublicClient } from '@wagmi/core';
import { $rpc } from 'src/utilities/$rpc';

export namespace TokenService {

    export function useGetBalance(token: Token, address: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getBalance(token, address),
            queryKey: [`${token.address}.balanceOf(${address})`],
            enabled: address != null,
        });
    }
    export function useGetBalances(tokens: Token[], address: string) {
        let key = [`balancesOf(${tokens.map(x => x.address).join(',')},${address})`];
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {

                let balances = await getBalances(tokens, address);
                return tokens.map((t, i) => {
                    return { ...t, balance: balances[i] };
                })
            },
            queryKey: key,
        });
    }
    export function useGetAllowance(token: Token, spender: string, address: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getAllowance(token, spender, address),
            queryKey: [`${token.address}.allowance(${spender}, ${address})`],
        });
    }

    export function useGetTvl(token: Token = TOKENS.pusde) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getTvlInner(token),
            queryKey: [`tvl(${token.address})`],
        });
    }

    export function useGetTransfers(opts?: { fromBlock: number, account: string }) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => {
                return getTransfers(opts)
            },
            queryKey: [`${opts.account}.transfers(${opts.fromBlock})`],
            enabled: opts?.fromBlock != null
        });
    }


    export async function getBalance(token: Pick<Token, 'decimals' | 'address'>, address: string) {
        if (!address) {
            return 0;
        }
        const balanceOfWei = await getBalanceInner(token, address);
        return BigNumberUtil.toEther(balanceOfWei, token.decimals ?? 18)
    }

    export async function getBalances(tokens: Pick<Token, 'decimals' | 'address'>[], address: string) {
        if (!address) {
            return tokens.map(x => 0);
        }
        const balancesOfWei = await getBalanceMultipleInner(tokens, address);
        return balancesOfWei.map((balanceOfWei, i) => {
            return BigNumberUtil.toEther(balanceOfWei, tokens[i].decimals ?? 18)
        });
    }

    export async function getAllowance(token: Token, spender: string, address: string) {
        if (!address) {
            return 0;
        }
        const allowanceWei = await getAllowanceInner(token, spender, address);
        return allowanceWei;
    }

    export async function doApprove(signer, token: Token, spender: string, amount: BigNumber | string) {
        console.log(`Approving ${amount} ${token.symbol} (${token.address}) for spender ${spender}; signer`, signer);
        const erc20 = getGenericContract({
            name: 'erc20',
            address: token.address,
            signerOrProvider: signer
        });
        let chainId = await signer.getChainId();
        const tx = await erc20.approve(spender, amount);
        return tx;
    }


    async function getBalanceInner(token: Pick<Token, 'decimals' | 'address'>, address: string) {
        return PromiseUtil.memoize(async () => {
            const rpc = config.rpcUrls[config.chainId].http;
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const erc20 = getGenericContract({
                name: 'erc20',
                address: token.address,
                signerOrProvider: provider
            });
            const balance = await erc20.balanceOf(address);
            return balance;
        }, `${token.address}.balanceOf(${address})`);
    }

    async function getBalanceMultipleInner(tokens: Pick<Token, 'decimals' | 'address'>[], address: string) {
        return PromiseUtil.memoize(async () => {
            const calls = tokens.map(token => {
                return {
                    address: token.address as `0x${string}`,
                    abi: 'function balanceOf(address owner) returns (uint256)',
                    params: [address]
                }
            });

            let result = await $rpc.multicall(calls);
            return result;

        }, `${tokens.map(x => x.address)}.balanceOf(${address})`);
    }

    async function getAllowanceInner(token: Token, spender: string, address: string) {
        return PromiseUtil.memoize(async () => {

            const rpc = config.rpcUrls[config.chainId].http;
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const erc20 = getGenericContract({
                name: 'erc20',
                address: token.address,
                signerOrProvider: provider
            });
            const allowance = await erc20.allowance(address, spender);
            return allowance;
        }, `${token.address}.allowance(${address})`);
    }

    async function getTvlInner(token: Token) {
        return PromiseUtil.memoize(async () => {

            const rpc = config.rpcUrls[config.chainId].http;
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const pUSDe = getUniqueContract({
                name: 'pUSDeVault',
                signerOrProvider: provider,
                chainId: config.chainId
            });
            const usdeBalance = await pUSDe.totalAssets();

            return usdeBalance;
        }, `tvl(${token.address})`);
    }

    export async function getTransfers(opts: { fromBlock: number, currentBlock: number, account }) {
        if (opts.fromBlock == null) {
            return [];
        }
        return PromiseUtil.memoize(async () => {

            const publicClient = getPublicClient(web3Config);
            const tokens = [ TOKENS.srusde, TOKENS.jrusde ];
            const addresses = tokens.map(x => x.address as `0x${string}`);

            const logs = await publicClient.getLogs({
                address: addresses,
                event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
                fromBlock: BigInt(opts.fromBlock),
                args: {
                    from: [
                        '0x0000000000000000000000000000000000000000',
                        opts.account
                    ],
                    to: [
                        '0x0000000000000000000000000000000000000000',
                        opts.account
                    ]
                }
            });
            return mapTransfersToEvents(logs, tokens, opts.currentBlock);
        }, `transfers(${opts.account})`);
    }

    function mapTransfersToEvents(logs: any[], tokens: Token[], currentBlock: number) {
        let dict = {};
        tokens.forEach(x => dict[x.address.toLowerCase()] = x);

        return logs.map(log => {
            let type = 'Transfer';
            let { from, to, value } = log.args ?? {};
            if (from === '0x0000000000000000000000000000000000000000') {
                type = 'Buy'
            }
            if (to === '0x0000000000000000000000000000000000000000') {
                type = 'Sell';
            }
            let token = dict[log.address.toLowerCase()];

            let block = Number(log.blockNumber);
            let secondsSinceAvg = (currentBlock - block) * 12;
            console.log('secondsSinceAvg', secondsSinceAvg, 'current', currentBlock, 'tx block', log.blockNumber);
            let timestamp = Math.floor(Date.now() / 1000) - secondsSinceAvg;

            return {
                "id": block * 100000 + log.logIndex,
                "event": type,
                "from": from,
                "to": to,
                "timestamp": new Date(timestamp * 1000),
                "amountWei": BigNumberUtil.from(value),
                "category": "setoken",
                "transactionHash": log.transactionHash,
                "blockNumber": block,
                "tokenAddress": log.address,
                "token": token
            };
        })
    }
}
