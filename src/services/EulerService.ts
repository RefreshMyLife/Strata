import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { TokenService } from './TokenService';
import { OracleService } from './OracleService';
import { TOKENS } from 'src/constants/tokens';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';

export namespace EulerService {

    export function useGetPosition(account: string) {

        return PromiseUtil.useTrackedQuery({
            queryFn: () => getPosition(account),
            queryKey: [`eulerBalance(${account})`],
            enabled: !!account,
        });
    }

    export async function getPosition(account: string) {
        return PromiseUtil.memoize(async () => {
            let [
                pUSDeBalance,
                price
            ] = await Promise.all([
                TokenService.getBalance(Tokens.pUSDeVault, account),
                OracleService.getPrice(TOKENS.pusde, 1)
            ]);

            return {
                pUSDe: pUSDeBalance,
                pUSDe$: pUSDeBalance * price,
            };
        }, {
            key: `termmaxBalanc(${account})`,
            maxAge: 2 * 60,
        });

    }

    export const Tokens = {
        Oracle: '',
        //https://app.euler.finance/vault/0xBd360BB80E6CBe86e533B672Df6BFc054602ADBD?network=ethereum
        pUSDeVault: {
            address: '0xBd360BB80E6CBe86e533B672Df6BFc054602ADBD',
            decimals: 18,
            symbol: 'pUSDe',
        },
        USDCVault: {
            address: '0x53AfE3343f322c4189Ab69E0D048efd154259419',
            decimals: 6,
            symbol: 'USDC',
        },
        USDeVault: {
            address: '0x6331D36C27D967c4261D59a8f80d58d03089810A',
            decimals: 18,
            symbol: 'USDe',
        },
    } as const;


    async function loadBalance(i: number, account: string) {
        console.log(`LOAD NFT balance`);
        let tokenId = await $rpc.call({
            abi: 'function tokenOfOwnerByIndex(address owner, uint256 idx) returns (uint256)',
            address: Termmax.GT,
            params: [
                account,
                i
            ],
        });
        console.log('TOKEN ID', tokenId);

        let tokenInfo = await $rpc.call({
            abi: 'function loanInfo(uint256 tokenId) returns (address, uint128, bytes)',
            address: Termmax.GT,
            params: [
                Number(tokenId)
            ],
        });
        console.log('TOKEN INFO', tokenInfo);

        let [owner, debtAmt, collateralData ] = tokenInfo;
        let balance = BigNumberUtil.from(collateralData).div(10**18).toNumber()


        return {
            balance
        };
    }
}
