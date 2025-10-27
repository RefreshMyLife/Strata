import { getPublicClient } from '@wagmi/core';
import { BaseContract, Contract, ethers } from 'ethers';
import config from 'src/config';
import { RPC_URLS } from 'src/constants/endpoints';
import { usePublicClient } from 'src/libs/wallet';
import web3Config from 'src/libs/wallet/Web3Wrapper/config';
import { ChainId, genericContractInfos, GenericContractTypes, UniqueContractCDOTypes, uniqueContractInfos, uniqueContractInfosCDOs, UniqueContractTypes } from 'src/packages/contracts';
import { Abi, parseAbi, parseAbiItem } from 'viem';

export namespace $rpc {
    export function contract <TContractName extends keyof UniqueContractCDOTypes | keyof UniqueContractTypes | keyof GenericContractTypes | 'base'> (params: {
        name?: TContractName
        address?: string
        cdo?: 'ethenaCdo'
        signerOrProvider?
        abi?: string | any
        chainId?: number
    }) {
        let { name, signerOrProvider, address, abi, chainId } = params;
        if (chainId == null) {
            chainId = config.chainId;
        }
        if (signerOrProvider == null) {
            const url = RPC_URLS[chainId].http;
            const provider = new ethers.providers.JsonRpcProvider(url);
            signerOrProvider = provider;//getPublicClient(web3Config);
        }
        if (address == null) {
            let info = (uniqueContractInfos as any)[name];
            if (info == null) {
                info = (uniqueContractInfosCDOs as any)[params.cdo ?? 'ethenaCdo']?.[name];
            }
            if (info == null) {
                throw new Error(`No contract address found for ${name}`);
            }
            address = info.address[chainId];
        }
        if (abi) {
            abi = [ parseAbiItem(abi) ];
        } else {
            let info = (uniqueContractInfos as any)[name];
            if (info == null) {
                info = (uniqueContractInfosCDOs as any)[params.cdo ?? 'ethenaCdo']?.[name];
            }
            if (info == null) {
                info = (genericContractInfos as any)[name];
            }
            if (info == null) {
                throw new Error(`No contract abi found for ${name}`);
            }
            abi = info.abi;
        }

        return new Contract(
            address,
            abi,
            signerOrProvider,
        ) as (
            TContractName extends keyof UniqueContractCDOTypes
                ? UniqueContractCDOTypes[TContractName]
                : (TContractName extends keyof UniqueContractTypes ? UniqueContractTypes[TContractName]
                    :  (TContractName extends keyof GenericContractTypes ? GenericContractTypes[TContractName]
                        : any)
                )
        );
    }

    export async function call <TReturn = any> (opts: {
        address: `0x${string}`
        abi: string
        params: any[]
    }) {

        const url = RPC_URLS[ChainId.ETHEREUM_MAINNET].http;
        const provider = new ethers.providers.JsonRpcProvider(url);

        const client = getPublicClient(web3Config);
        const abiItem = parseAbiItem(opts.abi);

        const result = await client.readContract({
            address: opts.address,
            abi: [ abiItem ] as Abi,
            functionName: (abiItem as any).name,
            args: opts.params
        });

        return result as TReturn;
    }

    export async function multicall <TReturn = any[]> (calls: {
        address: `0x${string}`
        abi: string
        params: any[]
    }[]) {

        const url = RPC_URLS[ChainId.ETHEREUM_MAINNET].http;
        const provider = new ethers.providers.JsonRpcProvider(url);
        const client = getPublicClient(web3Config);

        const contracts = calls.map(call => {
            const abiItem = parseAbiItem(call.abi);
            return {
                address: call.address,
                abi: [ abiItem ],
                functionName: (abiItem as any).name as string,
                args: call.params
            }
        });

        const results = await client.multicall({
            contracts
        });
        return results.map(x => x.result) as TReturn;
    }

    export async function getBlockNumber () {
        const url = RPC_URLS[config.chainId].http;
        const provider = new ethers.providers.JsonRpcProvider(url);
        return provider.getBlockNumber();
    }
}
