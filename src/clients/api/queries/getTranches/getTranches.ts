import { restService } from 'src/utilities';

import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import FunctionKey from 'constants/functionKey';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { restS3 } from 'src/utilities/restService';


type TMetrics7DResult = {
    "t": number
    "fmt": string
    "strataTVL": number
    "aprJrt": number
    "aprSrt": number
    "aprBase": number
    "aprTarget": number
}[];

export const getMetrics7d = async (): Promise<TMetrics7DResult> => {

    return await getMetrics7dFallback();
    // const response = await restService<TPointsStatsResult>({
    //     //apiUrl: 'http://localhost:5005',
    //     endpoint: '/points/stats',
    //     method: 'GET',
    //     params: {
    //         accountAddress: params.accountAddress
    //     },
    // });
    // if ('result' in response && response.result === 'error') {
    //     return await getPointsAccountsFallback(params);
    // }
    // return response.data.data;
};

async function getMetrics7dFallback (): Promise<TMetrics7DResult>  {
    return PromiseUtil.memoize(async () => {

        const { error, data: metrics7d } = await restS3<TMetrics7DResult>(`/tranches/metrics-7d.json?v1`);

        return metrics7d;
    }, `s3/metrics-7d`)
};



type Options = QueryObserverOptions<
    TMetrics7DResult,
    Error,
    TMetrics7DResult,
    TMetrics7DResult,
    [typeof FunctionKey.GET_TRANCHES_METRICS7D ]
>;

export function useGetMetrics7d (options?: Options) {
  return useQuery({
        queryKey: [FunctionKey.GET_TRANCHES_METRICS7D],
        queryFn: () => getMetrics7d(),
        ...options,
    });
}
