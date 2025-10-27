/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import alot from 'alot';
import React, { useMemo, useState } from 'react';
import { ScanLink, Spinner, TokenIcon } from 'src/components';
import { HistoryService } from 'src/services/HistoryService';
import { TokenService } from 'src/services/TokenService';
import { Transaction } from 'src/types';

import jrUSDe from 'assets/img/tokens/jrUSDe.svg';
import srUSDe from 'assets/img/tokens/srUSDe.svg';
import getTransactions from 'src/clients/api/queries/getTransactions';
import useGetTransactions from 'src/clients/api/queries/getTransactions/useGetTransactions';
import { useAuth } from 'src/context/AuthContext';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { DateUtil } from 'src/utilities/DateUtil';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { truncateAddress } from 'src/utilities/truncateAddress';

import { ViewCooldowns } from './ViewCooldowns';
import { useStyles } from './styles';

interface ViewHistoryProps {
    onBack: () => void;
}

const ViewHistory: React.FC<ViewHistoryProps> = ({ onBack }) => {
    const styles = useStyles();

    return (
        <div css={styles.container}>
            <div css={styles.header}>
                <button css={styles.backButton} onClick={onBack}>
                    <svg
                        css={styles.backIcon}
                        viewBox="0 0 5 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.866097 2.60014L3.53276 0.600072C3.86237 0.352851 4.33276 0.588041 4.33276 1.00007L4.33276 5.00007C4.33276 5.41209 3.86239 5.64728 3.53277 5.40007L0.866097 3.40013C0.599431 3.20014 0.599431 2.80014 0.866097 2.60014Z"
                            fill="#90A0AC"
                            fillOpacity="0.8"
                        />
                    </svg>
                    <span css={styles.backText}>Back</span>
                </button>
            </div>

            <ViewCooldowns />
            <HistoryUi />
        </div>
    );
};

const HistoryUi = () => {
    const styles = useStyles();
    const [currentPage, setCurrentPage] = useState(0);
    const { accountAddress } = useAuth();

    const { data: history } = HistoryService.useGetAccountHistory({
        page: currentPage,
        accountAddress: accountAddress,
    });

    const groups = useMemo(() => {
        if (history == null) {
            return null;
        }

        let groups = alot(history)
            .groupBy(x => DateUtil.getMonth(x.timestamp))
            .map(group => {
                return {
                    title: group.key,
                    items: group.values,
                };
            })
            .toArray();
        return groups;
    }, [history]);

    // Mock data for testing
    const mockGroups = [
        {
            title: 'December 2024',
            items: [
                {
                    event: 'Buy',
                    token: { symbol: 'srUSDe', address: '0x123' },
                    timestamp: new Date('2024-12-15'),
                    transactionHash:
                        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
                    amountWei: '2500000000000000000000',
                },
                {
                    event: 'Sell',
                    token: { symbol: 'jrUSDe', address: '0x456' },
                    timestamp: new Date('2024-12-10'),
                    transactionHash:
                        '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
                    amountWei: '1500000000000000000000',
                },
            ],
        },
        {
            title: 'November 2024',
            items: [
                {
                    event: 'Buy',
                    token: { symbol: 'srUSDe', address: '0x123' },
                    timestamp: new Date('2024-11-25'),
                    transactionHash:
                        '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
                    amountWei: '5000000000000000000000',
                },
            ],
        },
    ];

    return (
        <div css={styles.container}>
            <div css={styles.header}>
                <Typography variant="h5" css={styles.title}>
                    History
                </Typography>
            </div>
            <div css={styles.boxesContainer}>
                {groups == null && <Spinner />}
                {groups != null &&
                    groups.map((group, index) => (
                        <HistoryGroup key={index} group={group} items={group.items} />
                    ))}
                {/* Show mock data for testing */}
                {mockGroups.map((group, index) => (
                    <HistoryGroup key={`mock-${index}`} group={group} items={group.items} />
                ))}
            </div>
        </div>
    );
};

const HistoryGroup = ({ group, items }) => {
    const styles = useStyles();
    return (
        <div css={styles.historyBox}>
            <div css={styles.monthSection}>
                <Typography variant="h6" css={styles.monthTitle}>
                    {group.title}
                </Typography>
                <div css={styles.monthItems}>
                    {items.map((item, index) => (
                        <HistoryItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const HistoryItem = ({ item }) => {
    const styles = useStyles();
    console.log('Item', item);

    let amount = item.event === 'Sell' ? '-' : '+';
    amount += ' ' + NumberUtil.abbr(BigNumberUtil.toEther(item.amountWei));
    amount += ' ' + item.token.symbol;

    return (
        <div css={styles.historyItem}>
            <div css={styles.itemLeft}>
                <TokenIcon token={item.token} iconCss={{ height: '40px', width: 'auto' }} />
                <div css={styles.itemDetails}>
                    <span css={styles.itemAction}>{item.event}</span>
                    <span css={styles.itemToken}>{item.token.symbol}</span>
                </div>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemDate}>Date</span>
                <span css={styles.itemDateValue}>{DateUtil.format(item.timestamp)}</span>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemLabel}>TX ID</span>
                <span css={styles.itemValue}>
                    <ScanLink
                        hash={item.transactionHash}
                        urlType="tx"
                        text={truncateAddress(item.transactionHash)}
                    />
                </span>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemLabel}>Status</span>
                <span css={styles.itemStatus}>Successful</span>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemLabel}>Amount</span>
                <span css={styles.itemAmount}>{amount}</span>
            </div>
        </div>
    );
};

export default ViewHistory;
