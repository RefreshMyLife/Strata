import { Token } from 'src/types';
import { TokenService } from './TokenService';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { TermmaxService } from './TermmaxService';
import { EulerService } from './EulerService';
import alot from 'alot';


export namespace ProtocolsBalancesService {

    export function useGetBalances(tokens: Token[], address: string) {
         return PromiseUtil.useTrackedQuery({
            queryFn: () => {
                return getBalances(tokens, address);
            },
            queryKey: [`${tokens.map(x => x.address).join(',')}.balanceOf(${address})`],
            enabled: address != null,
        });
    }

    async function getBalances (tokens: Token[], address: string) {
        return PromiseUtil.memoize(async () => {

            return alot(tokens).mapAsync(async (token) => {
                let customHandler = Handlers.find(handler => handler.token.address === token.address);
                if (customHandler) {
                    return {
                        token,
                        balance: await customHandler.balanceOf(token)
                    };
                }
                return {
                    token,
                    balance: await TokenService.getBalance(token, address)
                };
            }).toArrayAsync();

        }, `${tokens.map(x => x.address).join(',')}.balanceOf(${address})`)
    }


    const Handlers = [
      {
        token: TermmaxService.Tokens.GT,
        balanceOf: async (account) => {
            let position = await TermmaxService.getPosition(account);
            return position.gtpUSDE;
        }
      },
    //   {
    //     token: EulerService.EulerTokens.pUSDeVault,
    //     balanceOf: async (account) => {
    //       let balance = await EulerService.getPosition(account, EulerService.EulerTokens.pUSDeVault);
    //       return balance.pUSDe$;
    //     }
    //   }
    ]
}
