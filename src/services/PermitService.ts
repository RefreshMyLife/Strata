import { BigNumber, ethers } from "ethers";
import config from 'src/config';
import { TOKENS } from 'src/constants/tokens';
import { Token } from 'src/types';
import { $rpc } from 'src/utilities/$rpc';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';


type BuildPermitParams = {
    token: Token
    owner: string;
    spender: string;
    amountWei: bigint;
    signer: ethers.Signer;
};

export namespace PermitService {

    const supportedTokens = {
        [TOKENS.susde.symbol]: {
            domain: 'sUSDe',
            token: TOKENS.susde
        },
        [TOKENS.usde.symbol]: config.chainId === 1 ? {
            domain: 'USDe',
            token: TOKENS.usde
        } : null,
    }

    export function supports(token: Token): boolean {
        return supportedTokens[token.symbol] != null;
    }

    export async function signPermitEip2612({
        token,
        owner,
        spender,
        amountWei,
        signer,
    }: BuildPermitParams): Promise<{ v: number; r: string; s: string; deadline: number }> {

        const info = supportedTokens[token.symbol];
        if (!info) {
            throw new Error(`Unsupported token: ${token.symbol}`);
        }

        const chainId = config.chainId;
        const tokenAddress = token.address;
        const name = info.domain;
        const deadline = Math.floor(Date.now() / 1000) + 30 * 60;

        const tokenContract = $rpc.contract({
            name: 'base',
            address: token.address,
            signerOrProvider: signer,
            abi: 'function nonces(address) external view returns (uint256)'
        })

        let nonce: ethers.BigNumber = await tokenContract.nonces(owner);

        const domain = {
            name,
            version: '1',
            chainId,
            verifyingContract: tokenAddress,
        } as const;

        const types = {
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" },
            ],
        } as const;

        const values = {
            owner,
            spender,
            value: BigNumberUtil.toHex(amountWei),
            nonce,
            deadline,
        } as const;

        //console.log(`Sign data`, domain, types, values);

        const signature = await (signer as any)._signTypedData(domain, types, values);

        const { v, r, s } = ethers.utils.splitSignature(signature);
        return { v, r, s, deadline };
    }
}
