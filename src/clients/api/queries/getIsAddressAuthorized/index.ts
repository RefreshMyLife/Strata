import { restService } from 'utilities';

export type GetIsAddressAuthorizedOutput = {
    authorized: boolean;
    ns?: string;
};


namespace Storage {

    function getArr() {
        let str = localStorage.getItem('accounts');
        if (str == null) {
            return [];
        }
        try {
            let arr = JSON.parse(str);
            return arr;
        } catch {
            return [];
        }
    }

    export function get(accountAddress: string) {
        let arr = getArr();
        let entry = arr.find(x => x.accountAddress === accountAddress);
        if (entry == null) {
            return null;
        }
        let now = Date.now();
        if (now - entry.timestamp > 2 * 24 * 60 * 60 * 1000) {
            return null;
        }
        return entry;
    }
    export function set(entry) {
        let arr = getArr();
        arr = arr.filter(x => x.accountAddress !== entry.accountAddress);
        arr.push(entry);
        localStorage.setItem('accounts', JSON.stringify(arr));
    }

}

const getIsAddressAuthorized = async ({
    accountAddress,
}: {
    accountAddress: string;
}): Promise<GetIsAddressAuthorizedOutput> => {
    if (accountAddress) {
        const cached = Storage.get(accountAddress);
        if (cached) {
            return {
                authorized: true,
                ns: cached.ns,
            };
        }
        const response = await restService({
            endpoint: `/authentication/${accountAddress}`,
            method: 'GET',
        });

        const authorized = response.status !== 403;
        const ns = (response.data as any)?.name;
        if (authorized) {
            Storage.set({
                accountAddress,
                timestamp: Date.now(),
                ns,
            });
        }
        return {
            authorized,
            ns
        };
    }

    return {
        authorized: false,
    };
};


export default getIsAddressAuthorized;
