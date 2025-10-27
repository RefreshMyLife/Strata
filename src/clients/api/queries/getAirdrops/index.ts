
import { Token } from 'types';
import { restService } from 'utilities';

import { TOKENS } from 'constants/tokens';
import { getUniqueContract } from 'src/packages/contracts';
import { VestedAirdrops } from 'src/packages/contracts/types/contracts/preDeposit';
import { BigNumber } from 'bignumber.js';

export interface GetAirdropsResponse {
  airdrops: IAccountAirdrop[];
}
export interface IAccountAirdrop {
    id: number;
    name: string;
    amount: BigNumber;
    proof: string[];
    token?: Token;
    claimStart: number;
    claimEnd: number;
    vestingStart: number;
    vestingDuration: number;

    claimed: boolean;
}


export interface IAccountAirdropStatus {
  name: string;
  token: Token;

  id: number;
  amount: BigNumber;
  proof: string[];
  vested: BigNumber;
  released: BigNumber;
  claimable: BigNumber;

  claimStart: Date;
  claimEnd: Date;
  cliffEnd: Date;
  vestingStart: Date;
  vestingEnd: Date;
  vestingDuration: number;
  vestingPercentage: number;
}

export interface GetAirdropsOutput {
  airdrops: IAccountAirdropStatus[];
}


function toNumber (mix: BigNumber | number | string | any) {
  if (typeof mix === 'number' || typeof mix === 'string') {
    return Number(mix);
  }
  if ('toNumber' in mix) {
    return mix.toNumber();
  }
  return mix as number;
}

function toBigNumber (mix: BigNumber | number | string | any) {
  if (typeof mix === 'number' || typeof mix === 'string') {
    return new BigNumber(mix);
  }
  if (mix instanceof BigNumber) {
    return mix;
  }
  return new BigNumber(mix.toString(10));
}

const getAirdrops = async (accountAddress: string, vestedAirdrops: VestedAirdrops): Promise<GetAirdropsOutput> => {

  return { airdrops: [] };

  const response = await restService<GetAirdropsResponse>({
    //apiUrl: 'http://localhost:5003',
    endpoint: '/airdrops/account',
    method: 'GET',
    params: { address: accountAddress },
  });
  if ('result' in response && response.result === 'error') {
    throw new Error(response.message);
  }

  let airdrops: IAccountAirdropStatus[] = [
      {
        name: 'Ecosystem',
        id: 1,
        amount: toBigNumber(0),
        token: TOKENS.strata,
      } as IAccountAirdropStatus,
      {
        name: 'OG-Testers/Strataors',
        id: 3,
        amount: toBigNumber(0),
        token: TOKENS.strata,
      } as IAccountAirdropStatus
  ];

  if (response.data?.data?.airdrops) {

    response.data.data.airdrops.forEach(airdrop => {
        let fromApi = {
            ...airdrop,
            amount: new BigNumber(airdrop.amount),
            token: TOKENS.strata
        } as any as IAccountAirdropStatus;

        let current = airdrops.find(x => x.id === airdrop.id);
        if (current == null) {
          airdrops.push(fromApi);
          return;

        }
        current.proof = fromApi.proof;
        current.amount = fromApi.amount;
    });
  }

  let onchainData = await Promise.all([
    ...airdrops.filter(x => x.amount.gt(0)).map(airdrop => {
        return vestedAirdrops.status({
            amount: airdrop.amount.toString(10),
            id: airdrop.id,
            recipient: accountAddress,
        });
    })
  ]);

  onchainData.forEach((airdrop, i) => {
    let current = airdrops.find(x => x.id === toNumber(airdrop.id));
    if (current == null) {
      throw new Error(`Airdrop not found ${airdrop.id}`);
    }
    let amount = toBigNumber(airdrop.amount);
    let vested = toBigNumber(airdrop.vested);
    let released = toBigNumber(airdrop.released);


    let claimEnd  = new Date(toNumber(airdrop.claimEnd) * 1000);
    let claimStart = new Date(toNumber(airdrop.claimStart) * 1000);
    let cliffEnd = new Date(toNumber(airdrop.cliffEnd) * 1000);
    let vestingStart =  new Date(toNumber(airdrop.vestingStart) * 1000);
    let vestingDuration =  toNumber(airdrop.vestingDuration);
    let vestingPercentage =  toNumber(airdrop.vestingPercentage);

    let vestingEnd =  new Date((toNumber(airdrop.vestingStart) + vestingDuration) * 1000);

    current.amount = amount;
    current.vested = vested;
    current.released = released;
    current.claimable = vested.minus(released);

    current.claimEnd = claimEnd.valueOf() === 0 ? null : claimEnd;
    current.claimStart = claimStart.valueOf() === 0 ? null : claimStart;
    current.cliffEnd = cliffEnd.valueOf() === 0 ? null : cliffEnd;
    current.vestingStart = vestingStart.valueOf() === 0 ? null : vestingStart;
    current.vestingEnd = vestingEnd.valueOf() === 0 ? null : vestingEnd;
    current.vestingDuration = vestingDuration;
    current.vestingPercentage = Number(vestingPercentage) / 100;


    console.table([
      ['name', current.name],
      ['claimStart',  current.claimStart?.toISOString()],
      ['claimEnd',    current.claimEnd?.toISOString()],
      ['cliffEnd',    current.cliffEnd?.toISOString()],
      ['vestingStart', current.vestingStart?.toISOString()],
      ['vestingEnd',  current.vestingEnd?.toISOString()],
    ]);
  });



  return { airdrops };
};




export default getAirdrops;
