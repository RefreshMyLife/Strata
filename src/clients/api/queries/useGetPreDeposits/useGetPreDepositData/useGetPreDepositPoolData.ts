import { UseQueryOptions, useQueries } from '@tanstack/react-query';
import { getTokenContract } from 'utilities';

import FunctionKey from 'constants/functionKey';
import { useAuth } from 'context/AuthContext';
import { Token } from 'src/types';
import useGetUniqueContract from 'src/hooks/useGetUniqueContract';
import BigNumber from 'bignumber.js';
import { TOKENS } from 'src/constants/tokens';
import { UniqueContractInfo, UniqueContractTypes } from 'src/packages/contracts';

export interface UseGetStrataVaultPoolBalancesInput {
    stakedTokenAddresses: (string | undefined)[];
    rewardToken: Token;
}

export interface TPreDepositData {
    totalStaked: BigNumber;

    stakedToken: typeof TOKENS.usde;
    supportedTokens: Token[];

    pUSDe: typeof TOKENS.pusde;
    sUSDe: typeof TOKENS.susde;
    USDe: typeof TOKENS.usde;

    pUSDeVaultContract: UniqueContractTypes['pUSDeVault'];
    pUSDeDepositorContract: UniqueContractTypes['pUSDeDepositor'];

    trancheDepositorContract: UniqueContractTypes['trancheDepositor'];

    sUSDeContract: UniqueContractTypes['sUSDe'];
    USDeContract: UniqueContractTypes['USDe'];

    accountStaked: BigNumber;
    accountsUSDeStaked: BigNumber;
    accountUSDeStaked: BigNumber;

    balances: {
        USDe: BigNumber;
        sUSDe: BigNumber;
        pUSDe: BigNumber;
    };

    cooldownDuration: number;
    cooldownEnd: Date | null;
    underlyingAmount: BigNumber;
}


const useGetPreDepositPoolData = ({
    accountAddress,
    stackedToken,
}: {
    accountAddress?: string;
    stackedToken: Token;
}): { data: TPreDepositData; isLoading: boolean } => {


    const pUSDeVaultContract = useGetUniqueContract({
        name: 'pUSDeVault',
    });
    const pUSDeDepositorContract = useGetUniqueContract({
        name: 'pUSDeDepositor',
    });
    const sUSDeContract = useGetUniqueContract({
        name: 'sUSDe',
    });
    const USDeContract = useGetUniqueContract({
        name: 'USDe',
    });

    const trancheDepositorContract = useGetUniqueContract({
        name: 'trancheDepositor',
    });

    const queries: UseQueryOptions<any, unknown, any, any>[] = [
        // pUSDeVaultContract?.address == null ? null : {
        //     queryFn: async () => {
        //         const pUSDeTotalStakedWei = await pUSDeVaultContract.totalSupply() ?? new BigNumber(0);
        //         const sUSDeTotalStakedWei = await pUSDeVaultContract.previewWithdraw(pUSDeTotalStakedWei.toString());
        //         const USDeTotalStakedWei = await sUSDeContract.previewWithdraw(sUSDeTotalStakedWei.toString());

        //         return {
        //             // totalStaked: new BigNumber(pUSDeTotalStakedWei.toString()),
        //             // totalsUSDeStaked: new BigNumber(sUSDeTotalStakedWei.toString()),
        //             // totalUSDeStaked: new BigNumber(sUSDeTotalStakedWei.toString()),
        //         };
        //     },
        //     queryKey: [
        //         FunctionKey.GET_PRE_DEPOSIT_TOTALS,
        //     ],
        //     enabled: !!stackedToken && !!pUSDeVaultContract,
        //     refetchInterval: false, //DEFAULT_REFETCH_INTERVAL_MS * 15,
        // },
        // !accountAddress ? null : {
        //     queryFn: async () => {
        //         const pUSDeBalanceWei = await pUSDeVaultContract.balanceOf(accountAddress) ?? new BigNumber(0);
        //         const sUSDeBalanceWei = await pUSDeVaultContract.previewWithdraw(pUSDeBalanceWei.toString());

        //         const [
        //             USDeBalanceWei,
        //             accountBalanceUSDe,
        //             accountBalancesUSDe,
        //         ] = await Promise.all([
        //             sUSDeContract.previewWithdraw(sUSDeBalanceWei.toString()),
        //             USDeContract.balanceOf(accountAddress),
        //             sUSDeContract.balanceOf(accountAddress)
        //         ]);

        //         return {
        //             accountStaked: new BigNumber(pUSDeBalanceWei.toString()),
        //             accountsUSDeStaked: new BigNumber(sUSDeBalanceWei.toString()),
        //             accountUSDeStaked: new BigNumber(USDeBalanceWei.toString()),

        //             balances: {
        //                 USDe: new BigNumber(accountBalanceUSDe.toString()),
        //                 sUSDe: new BigNumber(accountBalancesUSDe.toString()),
        //                 pUSDe: new BigNumber(pUSDeBalanceWei.toString()),
        //             }
        //         };
        //     },
        //     queryKey: [
        //         FunctionKey.GET_PRE_DEPOSIT_ACCOUNT_STAKED,
        //         accountAddress,
        //     ],
        // },
        // !accountAddress ? null : {
        //     queryFn: async () => {
        //         console.log(`QUERY cooldown`, accountAddress);
        //         const [cooldownEnd, underlyingAmount] = await sUSDeContract.cooldowns(accountAddress) ?? [];
        //         const timestamp = cooldownEnd.toNumber() * 1000;
        //         return {
        //             cooldownEnd: timestamp === 0 ? null : new Date(timestamp),
        //             underlyingAmount: new BigNumber(underlyingAmount.toString()),
        //         };
        //     },
        //     queryKey: [
        //         FunctionKey.GET_SUSD_DEPOSIT_ACCOUNT_STAKED,
        //         accountAddress,
        //     ],
        // },
        sUSDeContract?.address == null ? null : {
            queryFn: async () => {
                //const cooldownDuration = await sUSDeContract.cooldownDuration();
                return {
                    cooldownDuration: 0, //Number(cooldownDuration.toString()),
                };
            },
            queryKey: [
                'GET_SUSDE_INFO',
            ],
        },
    ].filter(x => x != null) as UseQueryOptions<any>[];

    const results = useQueries({ queries });
    const isLoading = results.some(result => result.isLoading);
    const data = isLoading ? null : results.reduce((aggr, result) => {
        return { ...aggr, ...(result.data ?? {}) }
    }, {
        stakedToken: TOKENS.usde,
        supportedTokens: [
            TOKENS.usde,
            TOKENS.eusde,
            // TOKENS.usdc,
            // TOKENS.usdt,
        ],

        pUSDe: TOKENS.pusde,
        sUSDe: TOKENS.susde,
        USDe: TOKENS.usde,

        pUSDeVaultContract: pUSDeVaultContract,
        pUSDeDepositorContract: pUSDeDepositorContract,
        sUSDeContract: sUSDeContract,
        USDeContract: USDeContract,

        trancheDepositorContract: trancheDepositorContract
    });

    return {
        data, isLoading,
    };

};

export default useGetPreDepositPoolData;
