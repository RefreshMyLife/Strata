import { getTransactions } from 'src/clients/api';
import { Token, Transaction } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { TokenService } from './TokenService';
import alot from 'alot';

export namespace HistoryService {
    export function useGetAccountHistory(params: {
        accountAddress?: string
        page?: number
    }) {
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {

                return await fetchAccountHistory(params);
            },
            queryKey: [`history(${params.accountAddress, params.page})`],
            enabled: !!params.accountAddress
        });
    }

    async function fetchAccountHistory (params: {
        accountAddress?: string
        page?: number
    }) {
        const respFromApi = {} || await getTransactions({
            page: params.page,
            address: params.accountAddress,
            event: undefined,
        });

        let transactions = respFromApi?.transactions?? [];

        if (params.page === 0) {
            const blockNr = await $rpc.getBlockNumber();
            const TIME = 12;
            const transactionsFromChain = await TokenService.getTransfers({
                account: params.accountAddress,
                fromBlock: blockNr - Math.ceil(3 * 24 * 60 * 60 / TIME),
                currentBlock: blockNr,
            });

            const dict = alot(transactions).toDictionary(x => x.transactionHash.toLowerCase(), () => 1);

            const arr = transactionsFromChain.filter(x => x.transactionHash.toLowerCase() in dict === false);

            transactions.push(...arr);

            transactions = alot(transactions).sortBy(x => x.id, 'desc').toArray();
        }
        return transactions as Transaction[];
    }
}
