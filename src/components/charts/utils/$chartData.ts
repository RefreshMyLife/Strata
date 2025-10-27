import { MetricsService } from 'src/services/MetricsService';
import { $timeframe } from './$timeframe';
import alot from 'alot';
import { NumberUtil } from 'src/utilities/NumberUtilt';

export namespace $chartData {
    function roundUpToStep(value, step) {
        return Math.ceil(value / step) * step;
    }
    export function getNiceMax(value, ticks = 5) {
        if (value <= 0) return 0;

        const roughStep = value / ticks;
        const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
        const normalized = roughStep / magnitude;

        // pick a "nice" step: 1, 2, 5, or 10
        let niceStep;
        if (normalized <= 1) niceStep = 1;
        else if (normalized <= 2) niceStep = 2;
        else if (normalized <= 5) niceStep = 5;
        else niceStep = 10;

        const step = niceStep * magnitude;
        return Math.ceil(value / step) * step;
    }
    // function getNiceMin(value, ticks = 5) {
    //     if (value >= 0) return 0;

    //     const roughStep = Math.abs(value) / ticks;
    //     const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    //     const normalized = roughStep / magnitude;

    //     let niceStep;
    //     if (normalized <= 1) niceStep = 1;
    //     else if (normalized <= 2) niceStep = 2;
    //     else if (normalized <= 5) niceStep = 5;
    //     else niceStep = 10;

    //     const step = niceStep * magnitude;
    //     return -Math.ceil(Math.abs(value) / step) * step;
    // }

    export function roundStepMax(value: number) {
        if (value < 0) {
            return getNiceMax(value * -1) * -1;
        }
        return getNiceMax(value);
    }
    export function roundStep(step: number) {
        return NumberUtil.round(step);
    }

    function niceStep(stepRaw) {
        const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
        const norm = stepRaw / mag;
        const base = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
        return base * mag;
    }

    function roundTo(n, precision) {
        const p = Math.pow(10, precision);
        return Math.round(n * p) / p;
    }

    export function getNiceTicksIncludingZero(dataMin, dataMax, desiredTicks = 6) {
        if (!isFinite(dataMin) || !isFinite(dataMax)) return { ticks: [0], min: 0, max: 0 };

        // Ensure zero is inside the range
        let min = Math.min(dataMin, 0);
        let max = Math.max(dataMax, 0);
        if (min === max) {
            // Degenerate range: expand around value (and include 0)
            const pad = Math.max(Math.abs(min) || 1, 1);
            min = Math.min(0, min - pad);
            max = Math.max(0, max + pad);
        }

        // Choose a nice step based on range
        const rawStep = (max - min) / (desiredTicks - 1);
        let step = niceStep(rawStep);

        // Snap bounds to nice multiples
        let lo = Math.floor(min / step) * step;
        let hi = Math.ceil(max / step) * step;

        // Generate ticks
        const precision = Math.max(0, -Math.floor(Math.log10(step))) + 2; // keep decimals tidy
        const ticks = [];
        for (let t = lo; t <= hi + step * 1e-6; t += step) {
            ticks.push(roundTo(t, precision));
        }

        // If we somehow missed 0 due to rounding, inject it and re-sort
        if (!ticks.includes(0)) {
            ticks.push(0);
            ticks.sort((a, b) => a - b);
        }

        return { ticks, min: ticks[0], max: ticks[ticks.length - 1] };
    }

    export function getTicksPrice (min, max) {
        min = NumberUtil.round(min, 4, 'floor');
        max = NumberUtil.round(max, 4, 'ceil');
        let step  = (max - min) / 4;
        let step1 = min + 1 * step;
        let step2 = min + 2 * step;
        let step3 = min + 3 * step;
        let step4 = min + 4 * step;
        return [min, step1, step2, step3, step4]
            .map(x => NumberUtil.round(x, 4));
    }


    export function formatDate(date: Date | string) {
        date = new Date(date);
        let d = String(date.getDate()).padStart(2, '0')
        let m = String(date.getMonth() + 1).padStart(2, '0');
        return `${d}/${m}`;
    }
    function formatDateTime(date: Date) {
        date = new Date(date);
        let h = String(date.getHours()).padStart(2, '0')
        let m = String(date.getMinutes()).padStart(2, '0');
        return `${h}:${m}`;
    }
    function formatDateMonth(date: Date) {
        date = new Date(date);
        return date.toLocaleString('en-US', { month: 'short' });
    }

    export function getApyAverage(tranche: 'jrt' | 'srt', timeframe: string, metrics: MetricsService.TMetricsDashboardPublicResult) {
        if (metrics == null) {
            return '';
        }
        let apyData = $chartData.getApyData(tranche, metrics)
        let key = $timeframe.toKey(timeframe) as keyof typeof apyData;
        let arr = apyData[key];
        let avg = alot(arr).sum(x => x.value) / arr.length;
        return NumberUtil.formatPct(avg);
    }

    export function getPriceData(tranche: 'jrt' | 'srt', metrics: MetricsService.TMetricsDashboardPublicResult) {
        return getData(tranche, 'price', metrics);
    }
    export function getApyData(tranche: 'jrt' | 'srt', metrics: MetricsService.TMetricsDashboardPublicResult) {
        return getData(tranche, 'apy', metrics);
    }
    export function getApyBasicData(metrics: MetricsService.TMetricsDashboardPublicResult) {
        return {
            all: metrics.all.map(x => ({
                date: x.date,
                x: formatDateMonth(x.date),
                collateralPoolAPY: x.apys.base,
                benchmarkAPY: x.apys.target,
            })),
            y1: metrics.y1.map(x => ({
                date: x.date,
                x: formatDateMonth(x.date),
                collateralPoolAPY: x.apys.base,
                benchmarkAPY: x.apys.target,
            })),
            d30: metrics.d30.map(x => ({
                date: x.date,
                x: formatDate(x.date),
                collateralPoolAPY: x.apys.base,
                benchmarkAPY: x.apys.target,
            })),
            d7: metrics.d7.map(x => ({
                date: x.date,
                x: formatDate(x.date),
                collateralPoolAPY: x.apys.base,
                benchmarkAPY: x.apys.target,
            })),
        }
    }
    export function getTvlData(tranche: 'jrt' | 'srt' | 'sum', metrics: MetricsService.TMetricsDashboardPublicResult) {
        if (tranche === 'sum') {
            return getSumData('tvl', metrics);
        }
        return getData(tranche, 'tvl', metrics);
    }


    export function getData(tranche: 'jrt' | 'srt', key: 'price' | 'apy' | 'tvl', metrics: MetricsService.TMetricsDashboardPublicResult) {
        return {
            all: metrics.all.map(x => ({
                date: x.date,
                x: formatDateMonth(x.date),
                value: x[tranche][key]
            })),
            y1: metrics.y1.map(x => ({
                date: x.date,
                x: formatDateMonth(x.date),
                value: x[tranche][key]
            })),
            d30: metrics.d30.map(x => ({
                date: x.date,
                x: formatDate(x.date),
                value: x[tranche][key]
            })),
            d7: metrics.d7.map(x => ({
                date: x.date,
                x: formatDate(x.date),
                value: x[tranche][key]
            })),
        }
    }
    export function getSumData(key: 'price' | 'apy' | 'tvl', metrics: MetricsService.TMetricsDashboardPublicResult) {
        return {
            all: metrics.all.map(x => ({
                date: x.date,
                x: formatDateMonth(x.date),
                value: x.jrt[key] + x.srt[key]
            })),
            y1: metrics.y1.map(x => ({
                date: x.date,
                x: formatDateMonth(x.date),
                value: x.jrt[key] + x.srt[key]
            })),
            d30: metrics.d30.map(x => ({
                date: x.date,
                x: formatDate(x.date),
                value: x.jrt[key] + x.srt[key]
            })),
            d7: metrics.d7.map(x => ({
                date: x.date,
                x: formatDate(x.date),
                value: x.jrt[key] + x.srt[key]
            })),
        }
    }
}
