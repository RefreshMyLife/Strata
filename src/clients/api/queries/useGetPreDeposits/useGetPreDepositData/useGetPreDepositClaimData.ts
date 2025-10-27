import { BigNumber } from 'ethers';
import { ChainId } from 'src/packages/contracts';
import { UseQueryOptions, useQueries } from '@tanstack/react-query';
import { useAuth } from 'context/AuthContext';
import { Token } from 'src/types';
import useGetUniqueContract from 'src/hooks/useGetUniqueContract';
import { TOKENS } from 'src/constants/tokens';
import { VestingClaimGroup } from '../../getPendingRewards/types';



export interface UseGetStrataVaultPoolBalancesInput {
    stakedTokenAddresses: (string | undefined)[];
    rewardToken: Token;
}



const useGetPreDepositClaimData = ({
    accountAddress,
}: {
    accountAddress?: string;
}): {
    data: VestingClaimGroup[];
    isLoading: boolean;
} => {
    const { provider, chainId } = useAuth();

    if (chainId === ChainId.ETHEREUM_MAINNET) {
        return {
            isLoading: false,
            data: []
        };
    }

    const totalSharesMain = BigNumber.from('80299442936322018390120');
    const totalSharesBonus = BigNumber.from('60740167273951960108676');
    const totalSTRATAMain = BigNumber.from(2_500_000).mul(String(10 ** 18));
    const totalSTRATABonus = BigNumber.from(300_000).mul(String(10 ** 18));

    const ownedDistributorMain = useGetUniqueContract({
        name: 'ownedDistributorMain',
    });
    const ownedDistributorBonus = useGetUniqueContract({
        name: 'ownedDistributorBonus',
    });

    // Fetch total amount of tokens staked in each pool
    const queries = [
        !accountAddress ? null : {
            queryFn: async () => {
                const resp = await ownedDistributorMain?.callStatic.claim({ from: accountAddress })
                return {
                    mainClaimable: resp,
                };
            },
            enabled: true,
            queryKey: [
                'GET_CLAIMABLE_PRE_DEPOSIT',
            ],
        },
        !accountAddress ? null : {
            queryFn: async () => {
                const resp = await ownedDistributorMain?.recipients(accountAddress);
                return {
                    mainShares: resp?.shares,
                };
            },
            enabled: true,
            queryKey: [
                'GET_SHARES_PRE_DEPOSIT',
            ],
        },
        !accountAddress ? null : {
            queryFn: async () => {
                const resp = await ownedDistributorBonus?.callStatic.claim({ from: accountAddress })
                return {
                    bonusClaimable: resp,
                };
            },
            enabled: true,
            queryKey: [
                'GET_CLAIMABLE_PRE_DEPOSIT_BONUS',
            ],
        },
        !accountAddress ? null : {
            queryFn: async () => {
                const resp = await ownedDistributorBonus?.recipients(accountAddress);
                return {
                    bonusShare: resp?.shares,
                };
            },
            enabled: true,
            queryKey: [
                'GET_SHARES_PRE_DEPOSIT_BONUS',
            ],
        },
    ].filter(x => x != null) as UseQueryOptions<any>[];

    const results = useQueries(queries);
    const isLoading = results.some(result => result.isLoading);
    if (isLoading) {
        return { isLoading, data: null };
    }

    const json = isLoading ? null : results.reduce((aggr, result) => {
        return { ...aggr, ...(result.data ?? {}) }
    }, {});

    let totalAmountWeiMain = 0;
    if (json?.mainShares != null) {
        totalAmountWeiMain = json.mainShares.mul(totalSTRATAMain).div(totalSharesMain);
    }
    let totalAmountWeiBonus = 0;
    if (json?.bonusShares != null) {
        totalAmountWeiBonus = json.bonusShares.mul(totalSTRATABonus).div(totalSharesBonus);
    }

    const groups: VestingClaimGroup[] = [
        {
            contract: 'ownedDistributorMain',
            contractAddress: ownedDistributorMain?.address,
            type: 'preDepositMain',
            title: 'PRE_DEPOSIT',
            claimAmountWei: json.mainClaimable,
            claimAmountCents: 0,
            totalAmountWei: totalAmountWeiMain,
            token: TOKENS.strata,
        },
        {
            contract: 'ownedDistributorBonus',
            contractAddress: ownedDistributorBonus?.address,
            type: 'preDepositBonus',
            title: 'First-Day Depositer Bonus',
            claimAmountWei: json.bonusClaimable,
            claimAmountCents: 0,
            totalAmountWei: totalAmountWeiBonus,
            token: TOKENS.strata,
        },
    ];

    return {
        data: groups,
        isLoading,
    };

};

export default useGetPreDepositClaimData;
