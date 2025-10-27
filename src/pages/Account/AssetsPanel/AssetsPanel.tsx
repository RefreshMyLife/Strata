// WithdrawFormUi

/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetTransactions } from 'src/clients/api';
import { PrimaryButton, TokenIcon } from 'src/components';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { TokenPrice } from 'src/components/TokenTextField/TokenPrice';
import { routes } from 'src/constants/routing';
import { TOKENS } from 'src/constants/tokens';
import { useAuth } from 'src/context/AuthContext';
import { useAccountAddress } from 'src/libs/wallet';
import { HistoryUi } from 'src/pages/History';
import { EulerService } from 'src/services/EulerService';
import { PendleService } from 'src/services/PendleService';
import { TermmaxService } from 'src/services/TermmaxService';
import { TokenService } from 'src/services/TokenService';
import { useLayout } from 'src/theme/useLayout';
import { Transaction } from 'src/types';
import { NumberUtil } from 'src/utilities/NumberUtilt';




export const AssetsPanel: React.FC<any> = ({
    pUSDeAccountInfo,
    ...props
}) => {
    const t = useLayout();
    const { accountAddress } = useAccountAddress();
    const { data: pendle  } = PendleService.useGetPosition(accountAddress);
    const { data: termmax  } = TermmaxService.useGetPosition(accountAddress);
    const { data: euler } = EulerService.useGetPosition(accountAddress);

    const navigate = useNavigate();
    const pUSDe = TOKENS.pusde;
    const onDepositClicked = (token) => {
        if (token === pUSDe) {
            navigate(routes.preDeposit.path);
            return;
        }
        let t = assets.find(x => x.token.symbol === token.symbol);
        if (t?.href) {
            window.open(t.href, '_blank');
        }
    };

    function formatDays (date: string) {
        let d = new Date(date);
        let ms = d.getTime() - Date.now();
        let days = Math.floor(ms / (1000 * 60 * 60 * 24));
        if (days <= 0) {
            return '';
        }
        let day = d.getDate().toString().padStart(2, '0');
        return `${day} Oct 2025 (${days} day${days > 1 ? 's' : ''})`
    }
    const assets = [
        {
            token: TOKENS.pusde,
            balance: pUSDeAccountInfo.balance + (termmax?.gtpUSDE ?? 0) + (euler?.pUSDe ?? 0),
        },
        {
            token: TOKENS.pendleLP,
            hint: formatDays('2025-10-16T00:00:00Z'),
            balance: pendle?.lp,
            balance$: pendle?.lp$,
            href: 'https://app.pendle.finance/trade/pools/0xf4c449d6a2d1840625211769779ada42857d04dd/zap/in?chain=ethereum'
        },
        {
            token: TOKENS.pendleYT,
            hint: formatDays('2025-10-16T00:00:00Z'),
            balance: pendle?.yt,
            balance$: pendle?.yt$,
            href: 'https://app.pendle.finance/trade/markets/0xf4c449d6a2d1840625211769779ada42857d04dd/swap?view=yt&chain=ethereum'
        },
        // {
        //     token: TOKENS.termmaxGT,
        //     hint: formatDays('2025-10-17T00:00:00Z'),
        //     balance: termmax?.gt,
        //     balance$: termmax?.gt$,
        //     href: 'https://app.termmax.ts.finance/market/eth/0xf2e6884a0520373bd92dfc49ce7d7ee69e6022bd?chain=eth&persistChain=1&orderAddress=0xe6c31e7cee0442551361fe1aba279a31dfd8ee0c&type=borrow'
        // }
    ];


    return (
        <Paper css={t.paper}>

            <h2>Overview</h2>

            <div css={[t.row, t.gap, t.wrap]}>

                {assets.map((asset, i) => (<div css={t.panel}>
                    <div css={t.row} key={i}>
                        <div css={[t.rowCell, t.panelIcon]}>
                            <TokenIcon token={asset.token} className=''/>
                        </div>
                        <div css={t.panelTitle}>
                            <div>{asset.token.symbol}</div>
                            {asset.hint && <div css={t.hint}>{asset.hint}</div>}
                        </div>
                    </div>
                    <br />
                    <div css={[t.row, t.spaceBetween]}>
                        <div>
                            <h2>{asset.balance == null ? <SvgLoadingInlined /> : NumberUtil.format(asset.balance, { fraction: 4 })}</h2>
                            <div>
                                <TokenPrice token={asset.token} amount={asset.balance} balance$={asset.balance$}/>
                            </div>
                        </div>
                        <div>
                            <PrimaryButton onClick={() => onDepositClicked(asset.token)}>Deposit</PrimaryButton>
                        </div>
                    </div>
                </div>))}

                {/* <div css={t.panel}>
                    <div css={t.row}>
                        <div css={[t.rowCell, t.panelIcon]}>
                            <img src={pUSDe.asset} alt={pUSDe.symbol} />
                        </div>
                        <div css={t.panelTitle}>
                            {pUSDe.symbol}
                        </div>
                    </div>
                    <br />
                    <div css={[t.row, t.spaceBetween]}>
                        <div>
                            <h2>{NumberUtil.format(pUSDeAccountInfo.balance, { minFraction: 2 })}</h2>
                            <div>
                                <TokenPrice token={pUSDe} amount={pUSDeAccountInfo.balance}/>
                            </div>
                        </div>
                        <div>
                            <PrimaryButton onClick={() => onDepositClicked(TOKENS.pusde)}>Deposit</PrimaryButton>
                        </div>
                    </div>
                </div>

                <div css={t.panel}>
                    <div css={t.row}>
                        <div css={[t.rowCell, t.panelIcon]}>
                            <img src={pUSDe.asset} alt={pUSDe.symbol} />
                        </div>
                        <div css={t.panelTitle}>
                            {pUSDe.symbol}
                        </div>
                    </div>
                    <br />
                    <div css={[t.row, t.spaceBetween]}>
                        <div>
                            <h2>{pendle == null ? <SvgLoadingInlined /> : NumberUtil.format(pendle?.lp, { minFraction: 2 })}</h2>
                            <div>
                                <TokenPrice token={pUSDe} amount={pendle?.lp$}/>
                            </div>
                        </div>
                        <div>
                            <PrimaryButton onClick={() => onDepositClicked(TOKENS.pusde)}>Deposit</PrimaryButton>
                        </div>
                    </div>
                </div> */}
            </div>

            <div css={[t.line, t.spaceAbove]}></div>

            <h2>Activity</h2>
            <TransactionsHistory />
        </Paper>
    );
};

const TransactionsHistory: React.FC<any> = () => {
    const [currentPage, setCurrentPage ] = useState(0);

    const { accountAddress } = useAuth();

    const {
        data: { transactions, total, limit, lastBlock } = { transactions: [] },
        isLoading: isGetTransactionsFetching,
        isFetched: isGetTransactionsFetched,
    } = useGetTransactions({
        page: currentPage,
        address: accountAddress,
        event: undefined,
    });

    const {
        data: newTransactions,
        isLoading,
        isFetched: isGetTransfersFetched,
    } = TokenService.useGetTransfers({ account: accountAddress, fromBlock: lastBlock });

    if (transactions != null && newTransactions != null && currentPage === 0) {
        const hashes = transactions.reduce((aggr, x) => {
            aggr[ x.transactionHash.toLowerCase() ] = 1;
            return aggr;
        }, {});
        const arr = newTransactions.filter((tx: Transaction) => {
            return hashes[tx.transactionHash.toLowerCase()] == null
        });
        transactions.unshift(...arr.reverse());
    }

  return (
    <HistoryUi
      showOnlyMyTxns={true}
      transactions={transactions}
      walletConnected={!!accountAddress}
      accountAddress={accountAddress}
      isFetching={isLoading}
      total={total}
      limit={limit}
      setCurrentPage={setCurrentPage}
      showFilters={false}
    />
  );
}

