import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { TokenService } from './TokenService';
import { OracleService } from './OracleService';
import { TOKENS } from 'src/constants/tokens';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';

export namespace TermmaxService {

    export function useGetPosition(account: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getPosition(account),
            queryKey: [`termmaxBalance(${account})`],
            enabled: !!account,
        });
    }

    export async function getPosition(account: string) {
        //return PromiseUtil.memoize(async () => {
            let [
                nfts,
                price
            ] = await Promise.all([
                TokenService.getBalance(Tokens.GT, account),
                OracleService.getPrice(TOKENS.pusde, 1)
            ]);

            let indexes = [];
            for (let i = 0; i < nfts; i++) indexes[i] = i;
            let tokens = await Promise.all(
                indexes.map(i => {
                    return loadNftBalance(i, account);
                })
            );
            let sum = tokens.reduce((acc, token) => acc + token.balance, 0);
            return {
                gt: nfts,
                gt$: sum * price,
                gtpUSDE: sum
            };
        // }, {
        //     key: `termmaxBalance(${account})`,
        //     maxAge: 2 * 60,
        // });

    }

    export const Tokens = {
        Oracle: '',
        GT: {
            address: '0x52dB35C0A4cC409DA1e409F309f3771441c02Ab1',
            decimals: 0
        },
    } as const;


    async function loadNftBalance(i: number, account: string) {
        let tokenId = await $rpc.call({
            abi: 'function tokenOfOwnerByIndex(address owner, uint256 idx) returns (uint256)',
            address: Tokens.GT.address,
            params: [
                account,
                i
            ],
        });

        let tokenInfo = await $rpc.call({
            abi: 'function loanInfo(uint256 tokenId) returns (address, uint128, bytes)',
            address: Tokens.GT.address,
            params: [
                Number(tokenId)
            ],
        });

        let [owner, debtAmt, collateralData ] = tokenInfo;
        let balance = BigNumberUtil.from(collateralData).div(10**18).toNumber()

        return {
            balance
        };
    }
}
