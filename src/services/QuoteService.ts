import { TOKENS } from 'src/constants/tokens';
import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { OracleService } from './OracleService';
import alot from 'alot';

export namespace QuoteService {
    export type Side = "from" | "to";

    export type Quote = {
        rateFromTo: number; // how many TO per 1 FROM
    };

    export async function getQuote (tokenFrom: Token, tokenTo: Token, amount: number, side: Side): Promise<Quote>{
        if (isTranche(tokenFrom)) {
            const tokensPPS = await OracleService.getERC4626PricePerShareMany([
                TOKENS.srusde,
                TOKENS.jrusde,
                TOKENS.susde,
            ]);
            const pps = alot(tokensPPS).toDictionary(x => x.symbol.toLowerCase(), x => x.pps);
            let tranchePPS = pps[tokenFrom.symbol.toLowerCase()];
            if (tokenTo.symbol === 'USDe') {
                return { rateFromTo: tranchePPS }
            }
            if (tokenTo.symbol === 'sUSDe') {
                return { rateFromTo: tranchePPS / pps['susde'] }
            }
            throw new Error(`Unsupported token ${tokenTo.symbol}`);
        }
        if (isTranche(tokenTo) === false) {
            throw new Error(`Invalid tokens ${tokenFrom.symbol} and ${tokenTo.symbol}`);
        }

        const tokensPPS = await OracleService.getERC4626PricePerShareMany([
            TOKENS.srusde,
            TOKENS.jrusde,
            TOKENS.susde,
        ]);
        const pps = alot(tokensPPS).toDictionary(x => x.symbol.toLowerCase(), x => x.pps);
        let tranchePPS = pps[tokenTo.symbol.toLowerCase()];
        if (tokenFrom.symbol === 'USDe' || tokenFrom.symbol === 'pUSDe') {
            return { rateFromTo: 1 / tranchePPS }
        }
        if (tokenFrom.symbol === 'sUSDe') {
            console.log('Tranche', tranchePPS, 'sUSDe', pps['susde'], tranchePPS / pps['susde']);
            return { rateFromTo: pps['susde'] / tranchePPS }
        }
        throw new Error(`Unsupported token ${tokenFrom.symbol}`);
    }

    export async function getQuoteExact (tokenFrom: Token, tokenTo: Token, amount: number, side: Side) {
        if (isTranche(tokenFrom)) {
         let tranche = $rpc.contract({
                name: 'tranche',
                address: tokenFrom.address
            });
            let strategy = $rpc.contract({
                name: 'strategy'
            });
            let baseAssets = await tranche.previewRedeem(BigNumberUtil.toWei(amount).toString(10));
            if (tokenTo.symbol === 'USDe') {
                let to = BigNumberUtil.toEther(baseAssets);
                return { rateFromTo: to / amount }
            }
            if (tokenTo.symbol === 'sUSDe') {
                let toWei = await strategy.convertToTokens(tokenTo.address, baseAssets, 0);
                let to = BigNumberUtil.toEther(toWei);
                return { rateFromTo: to / amount }
            }
            throw new Error(`Unsupported token ${tokenTo.symbol}`);
        }
    }

    function isTranche (token: Token) {
        return token.symbol === 'srUSDe' || token.symbol === 'jrUSDe';
    }
}
