export namespace NumberUtil {
    export function format(num: number, opts?: { fraction?: number, minFraction?: number }) {
        if (num == null) {
            return '0';
        }
        let maxFraction = opts?.fraction ?? 2;
        let minFraction = Math.min(maxFraction, opts?.minFraction ?? 0);

        return num.toLocaleString('en-US', {
            maximumFractionDigits: maxFraction,
            minimumFractionDigits: minFraction,
            useGrouping: true,
            currency: 'USD',
            currencyDisplay: 'symbol'  // 'code', 'symbol', or 'name'
        });
    }
    export function formatPrice (num: number) {
        return format(num, { minFraction: 2 });
    }
    export function formatPct (num: number) {
        return format(num, { minFraction: 2, fraction: 2 }) + '%';
    }

    export function round (mix: string | number, digits: number = 0, round: 'ceil' | 'round' | 'floor' = 'round') {
        let number = typeof mix === 'string' ? Number(mix) : mix;
        if (isNaN(number)) {
            return number;
        }
        let factor = Math.pow(10, digits);
        let val = number * factor;
        let e = val - (val | 0);
        if (e < 0) {
            e *= -1;
        }
        if (e < .0001) {
            val = val | 0;
        }
        return Math[round](val) / factor;
    }

    /**
     * - abbreviation: Format number to *B, *M, *K
     * - maximumFractionDigits: Parameter for toLocaleString
     */
    export function abbr (num: number, fraction = 2) {

        const K = 10 ** 3;
        const M = 10 ** 6;
        const B = 10 ** 9;
        if (num >= B) {
            return format(num / B, { fraction: 2 }) + 'B';
        }
        if (num >= M) {
            return format(num / M, { fraction: 2 }) + 'M';
        }
        if (num >= K) {
            return format(num / K, { fraction: 2 }) + 'K';
        }

        return format(num, { fraction: fraction, minFraction: fraction });
    }
}
