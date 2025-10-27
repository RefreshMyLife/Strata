import BigNumber from 'bignumber.js';
import formatTokensToReadableValue from './formatTokensToReadableValue';

export namespace BigNumberUtil {
    export function from (mix) {
        if (mix == null) {
            return new BigNumber(0);
        }
        if (mix instanceof BigNumber) {
            return mix;
        }
        if (typeof mix === 'number' || typeof mix === 'string' || typeof mix === 'bigint') {
            return new BigNumber(mix.toString());
        }
        if ('hex' in mix) {
            return new BigNumber(mix.hex);
        }
        return new BigNumber(mix.toString(10));
    };
    export function format (mix, decimals = 18): string {
        return formatTokensToReadableValue({
            value: from(mix),
            token: { decimals },
            maxDecimals: 2,
            addSymbol: false,
            wei: true,
        })
    }

    export function toEther (mix, decimals = 18): number {
        return from(mix)
            .dividedBy(new BigNumber(10).pow(decimals))
            .decimalPlaces(decimals)
            .toNumber();
    }
    export function toWei (mix, decimals = 18): BigNumber {
        return from(mix)
            .multipliedBy(new BigNumber(10)
            .pow(decimals))
            .dp(0);
    }

    export function toWeiN (mix, decimals = 18): bigint {
        let str = from(mix)
            .multipliedBy(new BigNumber(10)
            .pow(decimals))
            .dp(0)
            .toString(10);
        return BigInt(str);
    }

    export function toHex (mix): string {
        let str = from(mix).toString(16);
        return '0x' + str;
    }
}
