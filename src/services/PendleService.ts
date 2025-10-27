import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { TokenService } from './TokenService';

export namespace PendleService {

    export function useGetPosition(account: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getPosition(account),
            queryKey: [`pendleBalance(${account})`],
            enabled: !!account,
        });
    }

    export async function getPosition(account: string) {
        return PromiseUtil.memoize(async () => {
            let [
                lpBalance,
                ytBalance,
                lpPriceWei,
                ytPriceWei,
            ] = await Promise.all([
                TokenService.getBalance({ address: Pendle.LP, decimals: 18 }, account),
                TokenService.getBalance({ address: Pendle.YT, decimals: 18 }, account),
                getLpPriceWei(),
                getYtPriceWei(),
            ]);

            let lp$ = lpBalance * Number(lpPriceWei) / 10 ** 18;
            let yt$ = ytBalance * Number(ytPriceWei) / 10 ** 18;

            return {
                $: lp$ + yt$,
                lp: lpBalance,
                lp$: lp$,
                yt: ytBalance,
                yt$: yt$,
            };
        }, {
            key: `pendleBalance(${account})`,
            maxAge: 2 * 60,
        });

    }

    const Pendle = {
        Oracle: '0x9a9fa8338dd5e5b2188006f1cd2ef26d921650c2',
        SY: '0x33e88943b00e699fc5b6597c5f8bcb0872af8bee',
        YT: '0xe49462ffd604d35061fb6937626f675873314c93',
        LP: '0xf4c449d6a2d1840625211769779ada42857d04dd',
    } as const;

    // https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/1-core.json
    async function getYtPriceWei() {
        let priceWei = await $rpc.call({
            abi: 'function getYtToAssetRate(address market, uint32 duration) returns (uint256)',
            address: Pendle.Oracle,
            params: [
                Pendle.LP,
                10
            ],
        });
        return priceWei;
    }
    async function getLpPriceWei() {
        let priceWei = await $rpc.call<bigint>({
            abi: 'function getLpToAssetRate(address market, uint32 duration) returns (uint256)',
            address: Pendle.Oracle,
            params: [
                Pendle.LP,
                10
            ],
        });
        return priceWei;
    }
}
