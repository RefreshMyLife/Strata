import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryClient } from 'src/clients/api';

export namespace PromiseUtil {

    let promiseCache = {} as Record<string, { promise: Promise<any>, cachedAt: number}>;
    let queryCache = {} as Record<string, any>;

    export function useTrackedQuery <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> (options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
        let queryKey = options.queryKey;
        let key = Array.isArray(queryKey) ? queryKey.join(':') : queryKey as string;
        queryCache[key] = queryKey;
        return useQuery(options);
    }
    export function useSimpleQuery <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey> (options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
        return useQuery(options);
    }

    export function clearTrackedQuery () {
        for (let key in queryCache) {
            let queryKey = queryCache[key];
            if (queryKey != null) {
                queryClient.invalidateQueries(queryKey);
                queryCache[key] = null;
            }
        }
    }

    export function clearMemoized () {
        promiseCache = {};
    }

    type TKey = string | number | (string | number)[];
    export function memoize <TReturn> (fn: () => Promise<TReturn>, mix: TKey | { key: TKey, maxAge?: number }): Promise<TReturn> {
        let key: TKey;
        let maxAge = 10 * 60;
        if (typeof mix === 'object' && Array.isArray(mix) === false) {
            key = mix.key;
            maxAge = mix.maxAge;
        } else {
            key = mix;
        }

        if (Array.isArray(key)) {
            key = key.join(':');
        }
        let cached = promiseCache[key];
        if (cached != null) {
            let timeSinceCached = Date.now() - cached.cachedAt;
            // If cached promise is older than 5 minutes, remove it
            if (timeSinceCached > maxAge * 1000) {
                delete promiseCache[key];
            } else {
                return cached.promise;
            }
        }
        let promise = fn();
        promiseCache[key] = {
            promise,
            cachedAt: Date.now(),
        };
        promise.catch(error => {
            console.error(`Error in memoize`, error);
            // Remove from cache on error
            delete promiseCache[key];
        });
        return promise;
    }
}
