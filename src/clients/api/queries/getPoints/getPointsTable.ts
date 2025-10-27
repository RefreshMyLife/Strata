import { restService } from 'src/utilities';

import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import FunctionKey from 'constants/functionKey';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { restS3 } from 'src/utilities/restService';


type TPointsTableResult = {
    total: number;
    points?: number;
    data: any[]
};

export const getPointsTable = async (params: {
    page: number;
    limit: number;
    season: 1 | 0
}): Promise<TPointsTableResult> => {

    const q = {
        page: params.page,
        limit: params.limit ?? 20,
        chainId: 1,
        season: params.season
    };
    const response = await restService<TPointsTableResult>({
        //apiUrl: 'http://localhost:5005',
        endpoint: '/points',
        method: 'GET',
        params: q,
    });
    if ('result' in response && response.result === 'error') {
        return await getPointsTableFallback(q);
        //throw new Error(response.message);
    }
    return response.data.data;
};


async function getPointsTableFallback (params: {
    page: number;
    limit: number;
}): Promise<{points: number, total: number, data: any[] }>  {

    const result = await PromiseUtil.memoize(async () => {
        type TS3Result = {
            points: number, users: number, accounts: [string, number][]
        }
        const { error, data: info } = await restS3<TS3Result>(`/points/leaderboard.json`);
        if (error) {
            throw error;
        }

        return {
            total: info.users,
            points: info.points,
            data: info.accounts,
        };
    }, `s3/points/leaderboard`);

    let pageIdx = params.page - 1;
    let pageSize = params.limit;
    let slice = result
        .data
        .slice(pageIdx * pageSize, (pageIdx + 1) * pageSize)
        .map(([address, points]) => {
            return {
                address,
                points: { total: points }
            }
        });
    return {
        points: result.points,
        total: result.total,
        data: slice,
    };

};


type Options = QueryObserverOptions<
    TPointsTableResult,
    Error,
    TPointsTableResult,
    TPointsTableResult,
    [typeof FunctionKey.GET_POINTS_TABLE, any]
>;

export function useGetPointsTable ({ season, page, limit }, options?: Options) {
  return useQuery({
    queryKey: [FunctionKey.GET_POINTS_TABLE, { page }, season ],
    queryFn: () => getPointsTable({ page, limit, season }),
    ...options,
  });
}
