import { restService } from 'src/utilities';

import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import FunctionKey from 'constants/functionKey';


type TVaultAprResult = {
    token: string;
    apr: number;
    dailyRevenue: number;
};
export const getVaultAprs = async (): Promise<TVaultAprResult[]> => {

    const response = await restService<TVaultAprResult[]>({
        //apiUrl: 'http://localhost:5003',
        endpoint: '/vaults/aprs',
        method: 'GET',
        params: {},
    });
    if ('result' in response && response.result === 'error') {
        throw new Error(response.message);
    }
    return response.data.data;
};

type Options = QueryObserverOptions<
    TVaultAprResult[],
    Error,
    TVaultAprResult[],
    TVaultAprResult[],
    FunctionKey.GET_VAULT_APRS
>;

export function useGetVaultAprs (options?: Options) {
  return useQuery(FunctionKey.GET_VAULT_APRS, () => getVaultAprs(), {
    ...options,
  });
}
