import { NumberUtil } from './NumberUtilt';

export namespace $apr {
    export function format (apr: number) {
        return `${NumberUtil.format(apr, { minFraction: 2 })}%`;
    }
    export function toApyPct (apr: number) {
        if (apr > 1) apr /= 100;
        let apy = (1 + apr / 365) ** 365 - 1;
        apy *= 100;
        return NumberUtil.round(apy, 2, 'round');
    }
    export function toApyFmt (apr: number) {
        return NumberUtil.round(toApyPct(apr), 2, 'round') + '%';
    }
}
