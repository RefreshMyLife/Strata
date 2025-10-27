import { getUniqueContract } from 'src/packages/contracts';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import { OracleService } from './OracleService';
import { TOKENS } from 'src/constants/tokens';

export namespace AccountService {
    export function useTrancheBalance(accountAddress: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: () => getTrancheBalance(accountAddress),
            queryKey: [`account.tranchesBalance(${accountAddress})`],
            enabled: accountAddress != null,
        });
    }

    function getTrancheBalance(accountAddress: string) {
        return PromiseUtil.memoize(async () => {

            let jrtVault = $rpc.contract({ name: 'jrtVault' });
            let srtVault = $rpc.contract({ name: 'srtVault' });
            let cdo = $rpc.contract({ name: 'cdo' });

            let [
                jrtBalanceWei,
                srtBalanceWei,
                jrtPriceWei,
                srtPriceWei
            ] = await Promise.all([
                jrtVault.balanceOf(accountAddress),
                srtVault.balanceOf(accountAddress),
                cdo.pricePerShare(jrtVault.address),
                cdo.pricePerShare(srtVault.address)
            ]);
            let jrtBalance = BigNumberUtil.toEther(jrtBalanceWei);
            let srtBalance = BigNumberUtil.toEther(srtBalanceWei);
            let jrtPrice = BigNumberUtil.toEther(jrtPriceWei);
            let srtPrice = BigNumberUtil.toEther(srtPriceWei);

            return {
                jrt: {
                    balance: jrtBalance,
                    $: await OracleService.getPrice(TOKENS.usde, jrtBalance * jrtPrice),
                },
                srt: {
                    balance: srtBalance,
                    $: await OracleService.getPrice(TOKENS.usde, srtBalance * srtPrice),
                }
            }

        }, `account.tranchesBalance(${accountAddress})`);
    }
}
