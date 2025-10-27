

import { BigNumber, ethers } from 'ethers';
import { ChainId, getGenericContract } from 'src/packages/contracts';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { ADDRESSES, TOKENS } from 'src/constants/tokens';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import config from 'src/config';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { restS3 } from 'src/utilities/restService';
import alot from 'alot';
import { DateUtil } from 'src/utilities/DateUtil';
import { $apr } from 'src/utilities/$apr';
import { $chartData } from 'src/components/charts/utils/$chartData';
import { $rpc } from 'src/utilities/$rpc';

export namespace MetricsService {

    export function useGetMetrics7d() {
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {
                let [ metrics7d, current ] = await Promise.all([
                    getMetrics7d(),
                    getCurrentBasic(),
                ]);

                let today = metrics7d.find(x => DateUtil.isToday(new Date(x.t * 1000)));
                if (today) {
                    today.strataTVL = current.tvl;
                } else {
                    let date = new Date();
                    date.setHours(0, 0, 0, 0);

                    metrics7d.shift();
                    metrics7d.push({
                        fmt: $chartData.formatDate(date),
                        t: date.valueOf() / 1000 | 0,
                        priceSrt: current.priceSrt,
                        priceJrt: current.priceJrt,
                        strataTVL: current.tvl,
                        aprJrt: current.aprJrt ,
                        aprSrt: current.aprSrt ,
                        aprBase: current.aprBase ,
                        aprTarget: current.aprTarget ,
                        apyJrt: current.apyJrt ,
                        apySrt: current.apySrt ,
                        apyBase: current.apyBase ,
                        apyTarget: current.apyTarget,

                        jrtOp: current.jrtOverperformance,
                        srtC: current.srtCoverage,
                    })
                }
                return metrics7d;

            },
            queryKey: [`metrics7d`]
        });
    }

    /// Jrt, Srt (price, tvl, apr) (monthly, weekly, daily, hourly)
    export function useGetMetricsDashboardPublic() {
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {
                let [ metrics, current ] = await Promise.all([
                    getMetricsDashboardPublic(),
                    getCurrentBasic(),
                ]);

                let today = metrics.d7.find(x => DateUtil.isToday(x.date));
                if (today) {
                    today.jrt.apr = current.aprJrt;
                    today.srt.apr = current.aprSrt;
                    today.jrt.apy = current.apyJrt;
                    today.srt.apy = current.apySrt;

                    today.srt.price = current.priceSrt;
                    today.jrt.price = current.priceJrt;

                    today.jrt.tvl = current.tvlJrt;
                    today.srt.tvl = current.tvlSrt;

                    today.reserves = current.tvlTranches;
                    today.aprs.base = current.aprBase;
                    today.aprs.target = current.aprTarget;
                    today.apys ??= {} as any;
                    today.apys.base = current.apyBase;
                    today.apys.target = current.apyTarget;
                } else {
                    metrics.d7.shift();
                    metrics.d7.push({
                        date: new Date().toISOString(),
                        jrt: {
                            apr: current.aprJrt,
                            apy: current.apyJrt,
                            tvl: current.tvlJrt,
                            price: current.priceJrt,
                        },
                        srt: {
                            apr: current.aprSrt,
                            apy: current.apySrt,
                            tvl: current.tvlSrt,
                            price: current.priceSrt,
                        },
                        reserves: current.tvlTranches,
                        aprs: {
                            base: current.aprBase,
                            target: current.aprTarget,
                        },
                        apys: {
                            base: current.apyBase,
                            target: current.apyTarget,
                        },
                    })
                }
                return {
                    ...metrics,
                    now: current
                };
            },
            queryKey: [`metrics-dashboard-public`]
        });
    }

    export function useGetCurrentBasic() {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getCurrentBasic(),
            queryKey: [`metrics(tvl,apr)`]
        });
    }

    // export function useGetCurrentReserve() {
    //     return PromiseUtil.useTrackedQuery({
    //         queryFn: () => getCurrentReserve(),
    //         queryKey: [`metricsReserve(tvl)`]
    //     });
    // }

    export function useGetTrancheBasic(tranche: 'jrt' | 'srt') {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getTrancheBasic(tranche),
            queryKey: [`metrics(${tranche})`]
        });
    }

    export function useGetPointsOverview() {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getPointsOverview(),
            queryKey: [`pointsOverview`]
        });
    }

    async function getCurrentBasic() {
        let [
            tvlPUSDe,
            tvlJrt,
            tvlSrt,
            aprs,
            prices,
        ] = await Promise.all([
            getTvlInner(ADDRESSES[ChainId.ETHEREUM_MAINNET].pusde),
            getTvlInner(ADDRESSES[ChainId.ETHEREUM_MAINNET].jrusde),
            getTvlInner(ADDRESSES[ChainId.ETHEREUM_MAINNET].srusde),
            getAprsEthenaCDO(),
            getPrices(),
        ]);
        let tvl = tvlPUSDe.assets + tvlJrt.assets + tvlSrt.assets;
        let aprBase = BigNumberUtil.toEther(aprs.aprBase, 12);
        let aprTarget = BigNumberUtil.toEther(aprs.aprTarget, 12);

        let tvlRatioSrt = tvlSrt.assets / (tvlJrt.assets + tvlSrt.assets);
        let tvlRatioJrt = tvlJrt.assets / (tvlJrt.assets + tvlSrt.assets);
        let aprSrt = calcAprSrt(aprBase, aprTarget, tvlRatioSrt);
        let aprJrt = calcAprJrt(aprBase, aprTarget, aprSrt, tvlRatioSrt, tvlRatioJrt);
        let jrtOverperformance = aprJrt / aprBase;
        let srtCoverage = (tvlSrt.assets + tvlJrt.assets) / tvlSrt.assets;

        let result = {
            tvl,
            tvlTranches: tvlJrt.assets + tvlSrt.assets,
            tvlJrt: tvlJrt.assets,
            tvlSrt: tvlSrt.assets,

            priceJrt: prices.jrtPrice,
            priceSrt: prices.srtPrice,

            aprJrt: aprJrt * 100,
            aprSrt: aprSrt * 100,
            aprBase: NumberUtil.round(aprBase * 100, 2),
            aprTarget: NumberUtil.round(aprTarget * 100, 2),

            apyJrt: $apr.toApyPct(aprJrt),
            apySrt: $apr.toApyPct(aprSrt),
            apyBase: $apr.toApyPct(aprBase),
            apyTarget: $apr.toApyPct(aprTarget),


            jrtOverperformance: NumberUtil.round(jrtOverperformance * 100,  2),
            srtCoverage: NumberUtil.round(srtCoverage * 100, 1),
        };
        return result;
    }

    async function getTrancheBasic(tranche: 'srt' | 'jrt') {
        let token = tranche === 'srt'
            ? ADDRESSES[ChainId.ETHEREUM_MAINNET].srusde
            : ADDRESSES[ChainId.ETHEREUM_MAINNET].jrusde;

        let [
            tvl,
            metrics7d
        ] = await Promise.all([
            getTvlInner(token),
            getMetrics7d()
        ]);
        let apys = metrics7d.map(x => tranche === 'srt' ? x.apySrt : x.apyJrt);
        let apyAvg = alot(apys).sum(x => x) / apys.length;
        let result = {
            price: tvl.assets / tvl.supply,
            apy7d: apyAvg,
            tvl: tvl.assets,

            jrtOverperformance7d: NumberUtil.round(alot(metrics7d).sum(x => x.jrtOp) / metrics7d.length, 2),
            srtCoverage7d: NumberUtil.round(alot(metrics7d).sum(x => x.srtC) / metrics7d.length, 2),
        };
        return result;
    }

    async function getTvlInner(token: string) {
        return PromiseUtil.memoize(async () => {

            const rpc = config.rpcUrls[ChainId.ETHEREUM_MAINNET].http;
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const erc4626 = getGenericContract({
                address: token,
                name: 'erc4626',
                signerOrProvider: provider
            });
            const [ assets, supply ] = await Promise.all([
                erc4626.totalAssets(),
                erc4626.totalSupply(),
            ]);
            return {
                assets: BigNumberUtil.toEther(assets),
                supply: BigNumberUtil.toEther(supply),
            };
        }, `tvl(${token})`);
    }

    async function getAprsEthenaCDO() {
        return PromiseUtil.memoize(async () => {

            const rpc = config.rpcUrls[ChainId.ETHEREUM_MAINNET].http;
            const provider = new ethers.providers.JsonRpcProvider(rpc);

            const feed = getGenericContract({
                address: ADDRESSES[ChainId.ETHEREUM_MAINNET].tranches.sUSDeAprFeeds,
                name: 'aprPairFeed',
                signerOrProvider: provider
            });
            const round = await feed.latestRoundData();
            return round;
        }, `getAprsEthenaCDO()`);
    }

    async function getPrices() {
        return PromiseUtil.memoize(async () => {

            const cdo = $rpc.contract({ name: 'cdo' })
            const [
                jrtPrice,
                srtPrice
            ] = await Promise.all([
                cdo.pricePerShare(TOKENS.jrusde.address),
                cdo.pricePerShare(TOKENS.srusde.address),
            ]);
            const prices = {
                jrtPrice: BigNumberUtil.toEther(jrtPrice, 18),
                srtPrice: BigNumberUtil.toEther(srtPrice, 18),
            };
            return prices;
        }, `getPrices()`);
    }



    function calcAprSrt(aprBase: number, aprTarget: number, tvlRatioSrt: number) {
        let x = 0.2;
        let y = 0.2;
        let k = 0.3;
        let riskPremium = x + y * tvlRatioSrt ** k;
        let aprSrt1 = aprBase * (1 - riskPremium);
        let aprSrt = Math.max(aprTarget, aprSrt1);
        return aprSrt;
    }
    function calcAprJrt(aprBase: number, aprTarget: number, aprSrt: number, tvlRatioSrt: number, tvlRatioJrt: number) {
        let aprJrtSpread = Math.abs(aprBase - aprSrt) * tvlRatioSrt / tvlRatioJrt;
        let aprJrt = aprBase >= aprSrt
            ? (aprBase + aprJrtSpread)
            : aprBase - aprJrtSpread //(aprJrtSpread > aprBase ? 0 : (aprBase - aprJrtSpread))
        return aprJrt;
    }

    // Metrics 7D
    type TMetrics7DResult = {
        "t": number
        "fmt": string
        "strataTVL": number
        "aprJrt": number
        "aprSrt": number
        "aprBase": number
        "aprTarget": number
        "apyJrt": number
        "apySrt": number
        "apyBase": number
        "apyTarget": number

        "priceSrt": number
        "priceJrt": number

        "jrtOp": number
        "srtC": number
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

    async function getMetrics7dFallback(): Promise<TMetrics7DResult> {
        return PromiseUtil.memoize(async () => {
            const { error, data: metrics7d } = await restS3<TMetrics7DResult>(`/tranches/metrics-7d-v1.json`);
            if (error) {
                throw error;
            }
            return metrics7d;
        }, `s3/metrics-7d`)
    };

    type TMetricsStats = {
        date: any;
        aprs: {
            base: number;
            target: number;
        };
        apys: {
            base: number;
            target: number;
        }
        reserves: number;
        jrt: {
            tvl: number;
            price: number;
            apr: number;
            apy: number;
        };
        srt: {
            tvl: number;
            price: number;
            apr: number;
            apy: number;
        };
    }
    export type TMetricsDashboardPublicResult = {
        all: TMetricsStats[],
        y1: TMetricsStats[],
        d30: TMetricsStats[],
        d7: TMetricsStats[],
    };
    export const getMetricsDashboardPublic = async (): Promise<TMetricsDashboardPublicResult> => {
         return PromiseUtil.memoize(async () => {
            const { error, data: metrics } = await restS3<TMetricsDashboardPublicResult>(`/tranches/analytics-v4.json`);
            if (error) {
                throw error;
            }
            return metrics;
        }, `s3/metrics-dashboard-public`)
    };

    type TPointsOverview = {
        total: { users: number, points: number },
        season0: { users: number, points: number },
        season1: { users: number, points: number },
    };
    async function getPointsOverview(): Promise<TPointsOverview> {
        return PromiseUtil.memoize(async () => {
            const { error, data: metrics7d } = await restS3<TPointsOverview>(`/points/metrics.json`);
            if (error) {
                throw error;
            }
            return metrics7d;
        }, `s3/points-metrics`)
    };

}
