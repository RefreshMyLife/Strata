/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import { Box } from '@mui/material'
import { useLayout } from 'src/theme/useLayout';
import { AnchorButton, TextButton, TokenIcon } from 'src/components';

import img_strata_p from 'assets/img/tokens/strata_p.svg';
import img_ethena_p from 'assets/img/tokens/ethena_p.svg';
import img_strata from 'assets/img/StrataLogoPureV2.svg';
import img_share from 'assets/img/share.svg';
import img_pendle from 'assets/img/protocols/pendle.svg';
import img_morpho from 'assets/img/protocols/morpho.svg';
import img_euler from 'assets/img/protocols/euler.svg';
import img_termmax from 'assets/img/protocols/termmax.svg';
import img_ethereal_p from 'assets/img/tokens/ethereal_p.svg';
import { useStyles } from './ProtocolsTableCss';
import { useNavigate} from 'react-router';
import { routes } from 'src/constants/routing';
import { TokenService } from 'src/services/TokenService';
import { TOKENS } from 'src/constants/tokens';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { useAuth } from 'src/context/AuthContext';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { formatTokensToReadableValue } from 'src/utilities';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { EulerService } from 'src/services/EulerService';
import { Token } from 'src/types';
import { TermmaxService } from 'src/services/TermmaxService';
import { PromiseUtil } from 'src/utilities/PromiseUtil';


export const ProtocolsTable: React.FC<any> = ({
}) => {
    const l = useLayout();
    const styles = useStyles();
    const navigate = useNavigate();
    const { accountAddress } = useAuth();

    const onDepositClicked = (pool: string) => {
        navigate(routes.preDeposit.path);
    };

    const protocols = [
        {
            name: 'Strata',
            img: img_strata,
            badge: 'Deposit USDe/eUSDe into Strata',
            points: <>
              30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} /> +  <TokenIcon token={{asset: img_ethereal_p }} />
            </>,
            action: 'strata',
            href: null,
            token: TOKENS.pusde,
            balance: null,
            balancePoints: null,
        },
        {
            name: 'Pendle LP (Oct 25)',
            img: img_pendle,
            badge: 'Deposit pUSDe into Pendle LP',
            points: <>
              60x <TokenIcon token={{asset: img_strata_p}} /> + 50x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />
            </>,
            action: null,
            href: 'https://app.pendle.finance/trade/pools/0xf4c449d6a2d1840625211769779ada42857d04dd/zap/in?chain=ethereum',
            token: {
              address: '0xf4c449d6a2d1840625211769779ada42857d04dd',
              symbol: 'Pendle LPT-pUSDe',
              decimals: 18,
            },
            balance: null,
            balancePoints: null,
        },
        {
            name: 'Pendle YT (Oct 25)',
            img: img_pendle,
            badge: 'Deposit pUSDe into Pendle YT',
            points: <>
              60x <TokenIcon token={{asset: img_strata_p}} /> + 50x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />
            </>,
            action: null,
            href: 'https://app.pendle.finance/trade/markets/0xf4c449d6a2d1840625211769779ada42857d04dd/swap?view=yt&chain=ethereum',
            token: {
              address: '0xe49462ffd604d35061fb6937626f675873314c93',
              symbol: 'Pendle YT-pUSDe',
              decimals: 18,
            },
            balance: null,
            balancePoints: null,
        },
        {
            name: 'Euler Strata Frontier',
            img: img_euler,
            badge: 'Deposit pUSDe into Euler',
            points: <>
              30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />
            </>,
            action: null,
            href: 'https://app.euler.finance/vault/0xBd360BB80E6CBe86e533B672Df6BFc054602ADBD?network=ethereum',
            token: EulerService.Tokens.pUSDeVault,
            balance: null,
            balancePoints: null,
        },
        {
            name: 'Euler Strata Frontier',
            img: img_euler,
            badge: 'Deposit USDC into Euler',
            points: <>
              20x <TokenIcon token={{asset: img_strata_p}} />
            </>,
            action: null,
            href: 'https://app.euler.finance/vault/0x53AfE3343f322c4189Ab69E0D048efd154259419?network=ethereum',
            token: EulerService.Tokens.USDCVault,
            balance: null,
            balancePoints: null,
        },
        {
            name: 'Euler Strata Frontier',
            img: img_euler,
            badge: 'Deposit USDe into Euler',
            points: <>
              30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} />
            </>,
            action: null,
            href: 'https://app.euler.finance/vault/0x6331D36C27D967c4261D59a8f80d58d03089810A?network=ethereum',
            token: EulerService.Tokens.USDeVault,
            balance: null,
            balancePoints: null,
        },
        {
            name: 'TermMax (Oct 25)',
            img: img_termmax,
            badge: 'Deposit pUSDe and borrow',
            points: <>
              30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />
            </>,
            action: null,
            href: 'https://app.termmax.ts.finance/market/eth/0xf2e6884a0520373bd92dfc49ce7d7ee69e6022bd?chain=eth&persistChain=1&orderAddress=0xe6c31e7cee0442551361fe1aba279a31dfd8ee0c&type=borrow',
            token: {
              address: '0x52dB35C0A4cC409DA1e409F309f3771441c02Ab1',
              symbol: 'pUSDe',
              decimals: 0,
            },
            isComplexBalance: true,
            balance: null,
            balancePoints: null,
        },

    ];

    const rawBalanceTokens = protocols
      .filter(x => x.token != null && x.isComplexBalance !== true)
      .map(x => x.token);
    const complexBalanceTokens = protocols
      .filter(x => x.token != null && x.isComplexBalance === true)
      .map(x => x.token);

    const { data: balances, isLoading: isBalancesLoading } = TokenService.useGetBalances(rawBalanceTokens, accountAddress);
    if (isBalancesLoading === false && balances) {
      for (let token of rawBalanceTokens) {
        let p = protocols.find(x => x.token?.address === token.address);
        if (p) {
          let balance = balances.find(x => x.address === p.token.address);
          p.balance = balance?.balance;
        }
      }
    }

    const { data: complexBalances, isLoading: isComplexBalancesLoading } = ProtocolsBalances.useGetBalancesWithHandlers(complexBalanceTokens, accountAddress);
    if (isComplexBalancesLoading === false && complexBalances) {
      for (let token of complexBalanceTokens) {
        let p = protocols.find(x => x.token?.address === token.address);
        if (p) {
          let balance = complexBalances.find(x => x.address === p.token.address);
          p.balance = balance?.balance;
        }
      }
    }

    const { data: pointsStats, isLoading: isPointsStatsLoading } = useGetPointsStats({accountAddress});

    const totalPoints = pointsStats?.account?.points.total;
    if (totalPoints) {
      let IDX_STRATA = 0;
      let IDX_PENDLE_LT = 1;
      let IDX_PENDLE_YT = 2;
      let IDX_EULER_pUSDe = 3;
      let IDX_EULER_USDC = 4;
      let IDX_EULER_USDe = 5;
      let IDX_TERMMAX_POINTS = 6;

      let PENDLE_LT = pointsStats?.account?.points?.pendle?.[0] ?? 0;
      let PENDLE_YT = pointsStats?.account?.points?.pendle?.[1] ?? 0;
      let TERMMAX = pointsStats?.account?.points?.termmax?.[0] ?? 0;

      let EULER_pUSDe = pointsStats?.account?.points?.euler?.[0] ?? 0;
      let EULER_USDe = pointsStats?.account?.points?.euler?.[1] ?? 0;
      let EULER_USDC = pointsStats?.account?.points?.euler?.[2] ?? 0;

      protocols[IDX_STRATA].balancePoints = pointsStats?.account?.points?.supply ?? totalPoints;
      protocols[IDX_PENDLE_LT].balancePoints = PENDLE_LT;
      protocols[IDX_PENDLE_YT].balancePoints = PENDLE_YT;
      protocols[IDX_TERMMAX_POINTS].balancePoints = TERMMAX;

      protocols[IDX_EULER_pUSDe].balancePoints = EULER_pUSDe;
      protocols[IDX_EULER_USDe].balancePoints = EULER_USDe;
      protocols[IDX_EULER_USDC].balancePoints = EULER_USDC;
    }

    return <Box>
          <table css={l.table} className='fullWidth gray'>
            <thead>
              <tr>
                <th>Pool</th>
                <th>Balance</th>
                <th>Total Points</th>
                <th>Rewards</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {protocols.map((protocol, index) => {
                return <tr key={protocol.name + '_' + index}>
                  <td>
                    <div css={l.row}>
                      <div css={l.rowIcon} > <img src={protocol.img} style={{height: '34px'}}/> </div>
                      <div>
                          <div css={l.rowTitle}>{protocol.name}</div>
                          <div css={l.rowBadge} className='gray'>{protocol.badge}</div>
                        </div>
                    </div>
                  </td>
                  <td css={[l.tableCellPadding, l.inlineHeight]} style={{ opacity: isBalancesLoading || protocol.balance > 0 ? '1' : '.8' }}>
                    {protocol.token != null && (
                      isBalancesLoading ? <SvgLoadingInlined /> : (NumberUtil.format(protocol.balance, { fraction: 4 }) + ' ' + protocol.token.symbol)
                    )}
                  </td>
                  <td css={[l.tableCellPadding, l.inlineHeight]}>
                    {protocol.token != null && (
                      isPointsStatsLoading ? <SvgLoadingInlined /> : NumberUtil.format(protocol.balancePoints)
                    )}
                  </td>
                  <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                    {protocol.points}
                  </td>
                  <td css={l.tableCellPadding}>
                    {protocol.action && <TextButton css={[styles.tableAction]} className='gray' onClick={() => onDepositClicked("strata")}>Deposit</TextButton>}
                    {protocol.href && <AnchorButton css={[styles.tableAction]} className='gray' href={protocol.href} variant='text'>Deposit</AnchorButton>}
                    {!protocol.action && !protocol.href && <TextButton css={[styles.tableAction]} className='gray' disabled>Soon</TextButton>}
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </Box>
}


namespace ProtocolsBalances {
    export function useGetBalances(tokens: Token[], address: string) {
      return TokenService.useGetBalances(tokens, address);
    }
    export function useGetBalancesWithHandlers (tokens: Token[], address: string) {

        return PromiseUtil.useTrackedQuery({
            queryFn: async () => {
              let handlers = tokens.map(token => Handlers.find(handler => handler.token.address === token.address));
              let balances = await Promise.all(handlers.map(x => x.balanceOf(address)));

              return tokens.map((token, index) => ({
                ...token,
                balance: balances[index]
              }));
            },
            queryKey: [`${tokens.map(x => x.address).join(',')}.balanceOf(${address})`],
            enabled: address != null,
        });

    }

    const Handlers = [
      {
        token: TermmaxService.Tokens.GT,
        balanceOf: async (address) => {
            let position = await TermmaxService.getPosition(address);
            return position.gtpUSDE;
        }
      }
    ]
}
