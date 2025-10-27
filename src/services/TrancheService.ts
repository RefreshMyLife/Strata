import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { PromiseUtil } from 'src/utilities/PromiseUtil';

export namespace TrancheService {
    export function useMaxRedeem(accountAddress: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {

                let maxRedeems = await getMaxRedeem(accountAddress);
                return maxRedeems;
            },
            queryKey: [`maxReddemTranches(${accountAddress})`],
            enabled: !!accountAddress
        });
    }

    async function getMaxRedeem(accountAddress: string): Promise<{ jrt: number, srt: number }> {
        let jrtVault = $rpc.contract({ name: 'jrtVault' });
        let srtVault = $rpc.contract({ name: 'srtVault' });
        let [
            jrt,
            srt
        ] = await Promise.all([
            jrtVault.maxRedeem(accountAddress),
            srtVault.maxRedeem(accountAddress)
        ]);
        return {
            jrt: BigNumberUtil.toEther(jrt),
            srt: BigNumberUtil.toEther(srt),
        }
    }

    export function useMaxMint(accountAddress: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {
                return await getMaxMint(accountAddress);
            },
            queryKey: [`maxMintTranches(${accountAddress})`],
            enabled: !!accountAddress
        });
    }

    async function getMaxMint(accountAddress: string): Promise<{ jrt: number, srt: number }> {
        let jrtVault = $rpc.contract({ name: 'jrtVault' });
        let srtVault = $rpc.contract({ name: 'srtVault' });
        let [
            jrt,
            srt
        ] = await Promise.all([
            jrtVault.maxMint(accountAddress),
            srtVault.maxMint(accountAddress)
        ]);
        return {
            jrt: BigNumberUtil.toEther(jrt),
            srt: BigNumberUtil.toEther(srt),
        }
    }
}
