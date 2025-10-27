import { restService, restServiceRaw } from 'src/utilities/restService';
import { toast } from 'components/Toast';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { useQuery } from '@tanstack/react-query';

export namespace ReferralService {

    export function fromUri () {
        return new URLSearchParams(window.location.search).get('ref');
    }

    export function useGetReferees(mix: { season: 1 | 0, accountAddress: string}) {
        return useQuery({
            queryFn: () => getReferees(mix.accountAddress, mix.season),
            queryKey: [`referees(${mix.accountAddress},${mix.season})`],
            enabled: !!mix.accountAddress,
        });
    }

    export async function submitReferral (params: {
        accountAddress: string;
        message: string;
        signature: string;
        ref: string;
    }): Promise<any> {
        const response = await restService<any>({
            //apiUrl: 'http://localhost:5003',
            endpoint: '/referral/signup',
            method: 'POST',
            params: {
                account: params.accountAddress,
                signature: params.signature,
                message: params.message,
                ref: params.ref,
            },
        });

        const data = response.data as any;
        if (data == null || 'error' in data) {
            toast.error({
                message: data.error ?? `Connection error`,
            });
            return null;
        }

        Storage.confirm(params.accountAddress, params.ref);

        toast.success({
            message: 'Referral submitted successfully!',
        });

        return response.data.data;
    }

    export function getForAccount(accountAddress: string): IReferral {
        return Storage.get(accountAddress);
    }
    export function clearStorage(): IReferral {
        return Storage.clear();
    }

    export function getMessage (params: {
        accountAddress: string;
        ref: string;

    }) {
        let message = `The referral code to be used: ${params.ref}`;
        return message;
    }

    type TReferee = {
        address: string
        date: string
        points: number
        tvl: number
    }
    async function getReferees(address: string, season: 1 | 0): Promise<{ collection: TReferee[] }> {
        return PromiseUtil.memoize(async () => {

            const { error, data } = await restServiceRaw<{ collection: TReferee[]}>({
                //apiUrl: 'http://localhost:5005',
                endpoint: '/referral/referees',
                method: 'GET',
                params: {
                    accountAddress: address,
                    season: season,
                },
            });
            if (error) {
                throw error;
            }
            return data;
        }, `referees(${address},${season})`);
    }
}


interface IReferral {
    account: string;
    referredBy?: {
        code?: string;
        submittedAt?: number;
    };
}

namespace Storage {

    let CURRENT_CODE = new URLSearchParams(window.location.search).get('ref');

    function save(arr) {
        localStorage.setItem('refs', JSON.stringify(arr));
    }

    function load() {
        let str = localStorage.getItem('refs') ?? '[]';
        try {
            let arr = JSON.parse(str) as IReferral[];
            return arr;
        } catch {
            return [];
        }
    }

    export function get(accountAddress: string): IReferral {
        let arr = load();
        let info = arr.find(x => x.account === accountAddress);
        if (accountAddress && !CURRENT_CODE) {
            CURRENT_CODE = arr.find(x => x.account === '')?.referredBy?.code;
        }

        if (info == null) {
            info = {
                account: accountAddress,
                referredBy: CURRENT_CODE ? {
                    code: CURRENT_CODE,
                    submittedAt: null,
                } : null
            };
            save([ ...arr, info ]);
            return info;
        }
        info.referredBy ??= {};

        if (CURRENT_CODE && !info.referredBy.code) {
            info.referredBy.code = CURRENT_CODE;
            save(arr);
        }
        return info;
    }

    export function confirm(accountAddress: string, refCode: string) {
        let arr = load();
        let acc = get(accountAddress);
        acc.referredBy ??= {};
        acc.referredBy.code = refCode;
        acc.referredBy.submittedAt = Date.now();
        save(arr);
    }

    export function clear () {
        save([]);
    }

}
