/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import { EllipseAddress, ScanLink, Table, TableColumn, TokenIcon } from 'components';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';
import { Transaction } from 'types';
import { convertWeiToTokens, generateBlockchainScanUrl, truncateAddress } from 'utilities';

import { useAuth } from 'context/AuthContext';
import { useHideXlDownCss, useShowXlDownCss } from 'hooks/responsive';

import { useStyles } from './styles';
import { useLayout } from 'src/theme/useLayout';
import styles from 'src/components/Button/styles';

export interface HistoryTableProps {
    transactions: Transaction[];
    accountAddress: string;
    isFetching: boolean;
}

export const HistoryTableV2: React.FC<HistoryTableProps> = ({ accountAddress, transactions, isFetching }) => {

  const styles = useStyles();
  const groups = transactions.reduce((aggr, tx) => {
    let key = tx.timestamp.toLocaleString('en-US', { month: 'long' });
    let item = aggr.find(x => x.key === key);
    if (item == null) {
      item = { key, items: [] };
      aggr.push(item);
    }
    item.items.push(tx);
    return aggr;

  }, [] as { key: string, items: Transaction[] }[]);


  return groups.map(group => {
    const { key, items } = group;

    return <Paper css={styles.container} key={group.key}>
      <div css={styles.groupHeading}>{key}</div>

      {items.map((tx, i) => <TxItem tx={tx} accountAddress={accountAddress} idx={i} key={tx.transactionHash}/>)}
    </Paper>
  });
}


const TxItem: React.FC<{ tx: Transaction, accountAddress, idx: number }> = ({ tx, accountAddress, idx }) => {
  const l = useLayout();
  const styles = useStyles();
  const [opened, setOpened] = React.useState(false);
  let sign = '+' as '+' | '-';
  if (tx.event === 'Withdraw' || (tx.event === 'Transfer' && tx.from?.toLowerCase() === accountAddress?.toLowerCase())) {
    sign = '-';
  }
  if (tx.to === '0x888888888889758F76e7103c6CbF23ABbF58F946') {
    tx.title = 'Deposit into Pendle';
  }
  if (tx.to === '0x52dB35C0A4cC409DA1e409F309f3771441c02Ab1') {
    tx.title = 'Deposit into Termmax';
  }
  return <div css={styles.txItem} className={ opened ? 'opened' : null } onClick={() => setOpened(!opened)} key={'item' + tx.transactionHash}>
    <div css={[l.row, styles.txItemType]}>
      <div css={[l.hint]} className='tx_event'>{tx.title || tx.event}</div>
    </div>
    <div css={[l.row, l.spaceBetween, styles.txItemHead]} className='head'>
      <div>
        <TokenIcon token={tx.token} />
        <Typography variant="small2" color="textPrimary">
          &nbsp;&nbsp;{tx.token.symbol}
        </Typography>
      </div>
      <div>
        <Typography variant="small2" color="textPrimary">
          {sign}&nbsp;{convertWeiToTokens({ valueWei: tx.amountWei, token: tx.token, returnInReadableFormat: true })}
        </Typography>
      </div>
    </div>
    <div css={[l.row]} className='footer'>
      <div css={styles.txItemCell} className='cell'>
        <span className='cell_label'>Date:</span>
        <span>{tx.timestamp.toLocaleString()}</span>
      </div>
      <div css={styles.txItemCell} className='cell'>
        <span className='cell_label'>TX ID:</span>
        <span><ScanLink hash={tx.transactionHash} urlType='tx' text={ truncateAddress(tx.transactionHash) }/></span>
      </div>
      <div css={styles.txItemCell}>
        <span className='cell_label'>Status:</span>
        <span css={styles.badgeSuccess}>
            <svg width="14" height="14" viewBox="0 0 14 15" fill="none" css={styles.badgeSuccessIcon}>
              <path d="M7 0.5C5.61553 0.5 4.26216 0.910543 3.11101 1.67971C1.95987 2.44888 1.06266 3.54213 0.532846 4.82122C0.003033 6.1003 -0.13559 7.50776 0.134506 8.86563C0.404603 10.2235 1.07129 11.4708 2.05026 12.4497C3.02922 13.4287 4.2765 14.0954 5.63437 14.3655C6.99224 14.6356 8.3997 14.497 9.67879 13.9672C10.9579 13.4373 12.0511 12.5401 12.8203 11.389C13.5895 10.2378 14 8.88447 14 7.5C13.9978 5.64415 13.2597 3.86493 11.9474 2.55264C10.6351 1.24035 8.85585 0.502161 7 0.5ZM11.0408 5.28333L7.04784 10.7019C7.0007 10.7645 6.94157 10.817 6.87391 10.8564C6.80624 10.8959 6.7314 10.9215 6.65375 10.9317C6.5761 10.9419 6.49719 10.9365 6.42163 10.9159C6.34607 10.8953 6.27538 10.8598 6.21367 10.8116L3.36234 8.53192C3.30251 8.48404 3.2527 8.42485 3.21574 8.35772C3.17879 8.29059 3.15542 8.21684 3.14697 8.14068C3.12991 7.98687 3.17464 7.83258 3.27134 7.71175C3.36803 7.59092 3.50876 7.51345 3.66257 7.49639C3.81638 7.47932 3.97067 7.52406 4.0915 7.62075L6.46917 9.523L10.1016 4.59325C10.1453 4.52763 10.2019 4.47156 10.2679 4.42842C10.3339 4.38528 10.408 4.35598 10.4857 4.34228C10.5633 4.32857 10.6429 4.33076 10.7197 4.3487C10.7965 4.36664 10.8689 4.39997 10.9324 4.44666C10.996 4.49335 11.0494 4.55244 11.0894 4.62036C11.1295 4.68828 11.1554 4.76362 11.1655 4.84183C11.1756 4.92003 11.1698 4.99948 11.1484 5.07536C11.1269 5.15125 11.0903 5.22199 11.0408 5.28333Z" fill="#5CDFBD"/>
            </svg>
            <span>Successful</span>
        </span>
      </div>
    </div>
  </div>
}
