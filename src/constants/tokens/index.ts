import config from 'config';

import { ChainId } from 'packages/contracts';
import DEPLOY_protocol_mainnet from '@/deployments/deployments-eth.json';
import DEPLOY_protocol_testnet from '@/deployments/deployments-hoodi.json';


import { ERC20_TOKENS } from './common/testnet';

export * from './common/mainnet';
export * from './common/testnet';

function getAddress(deployments: typeof DEPLOY_protocol_mainnet, symbol: string) {

    let t = deployments.find(x => x.id === symbol);
    if (t != null) {
        return t.address;
    }
    let rgx = new RegExp(`${symbol}\\w?`);
    let arr = deployments.filter(x => rgx.test(x.id));
    if (arr.length === 0) {
        throw new Error(`Deployment for ${symbol} not found`);
    }
    if (arr.length > 1) {
        arr = arr.filter(x => /Token/i.test(x.id));
    }
    if (arr.length === 0) {
        throw new Error(`Multideployments: Deployment for ${symbol} not found`);
    }
    if (arr.length > 1) {
        throw new Error(`Multideployment found ${arr.map(x => x.id)}`);
    }

    return arr[0].address;
}

const Deployments = {
    [ChainId.ETHEREUM_MAINNET]: [
        ...DEPLOY_protocol_mainnet,
    ],
    [ChainId.ETHEREUM_TESTNET]: [
        ...DEPLOY_protocol_testnet,
    ],
} as const;


function TokenAddresses(chainId: number) {

    if (chainId === ChainId.ETHEREUM_MAINNET) {
        return {
            eth: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            usde: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3',
            susde: '0x9d39a5de30e57443bff2a8307a4256c8797a3497',
            pusde: '0xA62B204099277762d1669d283732dCc1B3AA96CE',
            eusde: '0x90d2af7d622ca3141efa4d8f1f24d86e5974cc8f',

            jrusde: '0xC58D044404d8B14e953C115E67823784dEA53d8F',
            srusde: '0x3d7d6fdf07EE548B939A80edbc9B2256d0cdc003',

            usdc: '',
            usdt: '',
            tranches: {
                sUSDeAprFeeds: '0x2bb416614D740E5313aA64A0E3e419B39e800EC2',
                cdo: '0x908B3921aaE4fC17191D382BB61020f2Ee6C0e20',
            }
        };
    }
    if (chainId === ChainId.ETHEREUM_TESTNET) {
        return {
            eth: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            usde: '0x7054A803361640970176Edbd91992DcC52B7D235',
            susde: '0x789d3D9AA2EFDda01f0402a632803158F21cCe05',
            pusde: '0x345CFCe350c1C6Dc653B5f2E187d4f109E8C4B95',
            eusde: '0x76839a4294fffb2d455703f529d797b10883bd36',

            jrusde: '0xDe367A336cC88b0B2216546595356205e118fD2E',
            srusde: '0xACF9309A6b92C66Ce17Efd31e16828EA2AD9C386',

            usdc: '0xaBE28B44a8bD32a0df6Ae784a5F5Ff0a03a57e91',
            usdt: '0xaBE28B44a8bD32a0df6Ae784a5F5Ff0a03a57e92',
        };
    }

}

Object.keys(ERC20_TOKENS).forEach((symbol) => {
    let tokens = TokenAddresses(config.networkId);
    let s = symbol;
    let address = tokens[s];
    if (!address) {

    }
    ERC20_TOKENS[symbol].address = address;
});


export const TOKENS = ERC20_TOKENS;
export const ADDRESSES = {
    [ChainId.ETHEREUM_MAINNET]: TokenAddresses(ChainId.ETHEREUM_MAINNET),
    [ChainId.ETHEREUM_TESTNET]: TokenAddresses(ChainId.ETHEREUM_TESTNET),
};


export function getToken(symbol: string) {
    for (let key in ERC20_TOKENS) {
        if (key.toLowerCase() === symbol.toLowerCase()) {
            return ERC20_TOKENS[key];
        }
    }
    return null;
}
