import { TOKENS } from 'src/constants/tokens';
import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { PromiseUtil } from 'src/utilities/PromiseUtil';

export namespace CooldownsService {
    export function useGetOverview(accountAddress: string) {
        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {

                let overview = await getOverview(accountAddress);
                return overview;
            },
            queryKey: [`cooldownsOverview(${accountAddress})`],
            enabled: !!accountAddress
        });
    }

     export async function doFinalize(signer, token: Token, accountAddress, type: 'erc20' | 'unstake') {
        const cooldownContract = $rpc.contract({
            name: type === 'erc20' ? 'erc20Cooldown' : 'unstakeCooldown',
            signerOrProvider: signer
        });
        let chainId = await signer.getChainId();
        console.log(`ChainId`, chainId, token, accountAddress, type);

        const tx = await cooldownContract['finalize(address,address)'](token.address, accountAddress);
        return tx;
    }

    export type TCooldownStatus = {
        pending: number;
        claimable: number;
        nextUnlockAt: number;
        nextUnlockAmount: number;
        totalRequests: number;
        type: 'erc20' | 'unstake';
        token: Token;
        underlyingToken: Token;
    }
    async function getOverview(accountAddress: string): Promise<TCooldownStatus[]> {
        let erc20Cooldown = $rpc.contract({ name: 'erc20Cooldown' });
        let unstakeCooldown = $rpc.contract({ name: 'unstakeCooldown' });

        let [
            sUSDeCooldown,
            sUSDeUnstake,
        ] = await Promise.all([
            erc20Cooldown['balanceOf(address,address)'](TOKENS.susde.address, accountAddress),
            unstakeCooldown['balanceOf(address,address)'](TOKENS.susde.address, accountAddress)
        ]);
        function map (balanceResp: typeof sUSDeCooldown, type: 'erc20' | 'unstake', token: Token, underlyingToken: Token) {
            return {
                pending: BigNumberUtil.toEther(balanceResp.pending),
                claimable: BigNumberUtil.toEther(balanceResp.claimable),
                nextUnlockAmount: BigNumberUtil.toEther(balanceResp.nextUnlockAmount),
                nextUnlockAt: balanceResp.nextUnlockAt.toNumber(),
                totalRequests: balanceResp.totalRequests.toNumber(),
                type,
                token,
                underlyingToken,
            };
        }

        return [
            map(sUSDeCooldown, 'erc20', TOKENS.susde, TOKENS.susde),
            map(sUSDeUnstake, 'unstake', TOKENS.susde, TOKENS.usde),
        ]
    }
}
