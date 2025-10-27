import { restService } from 'src/utilities';

import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import FunctionKey from 'constants/functionKey';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { restS3 } from 'src/utilities/restService';


type TPointsStatsResult = {
    info: {
        points: number;
        days: number;
        next: Date;
    };
    account: {
        name: string;
        address: string;
        referral: any
        // points: {
        //     supply: number;
        //     borrow: number;
        //     total: number;
        // };
        points: {
            total: number;
            latest: number;
            pendle: [number, number];
            termmax: [number];
            supply: number;
            borrow: number;
            referral: number;
            euler: [number, number, number ]
        };
        rank: number;
    };
};

export const getPointsStats = async (params: {
    accountAddress: string;
    season: 0 | 1
}): Promise<TPointsStatsResult> => {

    const response = await restService<TPointsStatsResult>({
        //apiUrl: 'http://localhost:5005',
        endpoint: '/points/stats',
        method: 'GET',
        params: {
            accountAddress: params.accountAddress,
            season: params.season,
            chainId: 1,
        },
    });
    if ('result' in response && response.result === 'error') {
        return await getPointsAccountsFallback(params);
    }
    return response.data.data;
};

async function getPointsAccountsFallback (params: {
    accountAddress: string;
}): Promise<TPointsStatsResult>  {
    const address = params.accountAddress.toLowerCase();
    const char = address[2];
    return PromiseUtil.memoize(async () => {
        type TS3Result = TPointsStatsResult['account']['points'] & {
            address: string
            rank: number
            refcode: string
        }
        const { error, data: accounts } = await restS3<TS3Result[]>(`/points/stats/${char}.json`);

        if (error) {
            throw error;
        }
        const acc = accounts.find((acc) => acc.address.toLowerCase() === address) ?? {
            address: params.accountAddress,
            rank: 0,
            refcode: null,
        };

        return {
            info: {},
            account: {
                address: acc.address,
                points: acc,
                rank: acc.rank,
                refcode: acc.refcode,
            }
        };
    }, `s3/points/stats/${char}`)
};


export const getRefCode = async (params: {
    accountAddress: string;
}): Promise<{ url }> => {

    const response = await restService<{ url }>({
        //apiUrl: 'http://localhost:5005',
        endpoint: '/points/refcode',
        method: 'GET',
        params: {
            accountAddress: params.accountAddress
        },
    });
    if ('result' in response && response.result === 'error') {
        throw new Error(response.message);
    }
    return response.data.data;
};

type Options = QueryObserverOptions<
    TPointsStatsResult,
    Error,
    TPointsStatsResult,
    TPointsStatsResult,
    [typeof FunctionKey.GET_POINTS_STATS, string ]
>;

export function useGetPointsStats ({ accountAddress, season }, options?: Options) {
  return useQuery({
        queryKey: [FunctionKey.GET_POINTS_STATS, accountAddress, season],
        queryFn: () => getPointsStats({ accountAddress, season: season ?? 1 }),
        enabled: accountAddress != null,
        ...options,
    });
}
export function useGetPointsStatsSimple (options?: Options) {
  return useQuery({
        queryKey: [FunctionKey.GET_POINTS_STATS],
        queryFn: () => getPointsStats({ accountAddress: null, season: 1 }),
        ...options,
    });
}

export function useGetRefCode ({ accountAddress }, options?: Options) {
  return useQuery({
        queryKey: ['GET_REF_CODE', accountAddress],
        queryFn: () => getRefCode({ accountAddress }),
        enabled: accountAddress != null,
        ...options,
    });
}
