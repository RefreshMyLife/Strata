/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import jrUSDeIcon from 'assets/img/tokens/jrUSDe.svg';
import srUSDeIcon from 'assets/img/tokens/srUSDe.svg';
import { useStyles } from './styles';

interface Transaction {
    id: string;
    type: 'Yield';
    asset: 'jrUSDe' | 'srUSDe';
    txHash: string;
    amount: string;
    apy: string;
}

const mockTransactions: Transaction[] = [
    { id: '1', type: 'Yield', asset: 'jrUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '2', type: 'Yield', asset: 'srUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '3', type: 'Yield', asset: 'jrUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '4', type: 'Yield', asset: 'srUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '5', type: 'Yield', asset: 'jrUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '6', type: 'Yield', asset: 'srUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '7', type: 'Yield', asset: 'jrUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
    { id: '8', type: 'Yield', asset: 'srUSDe', txHash: '0x8e5b...4d93', amount: '$1,999', apy: '4.57%' },
];

const getAssetIcon = (asset: 'jrUSDe' | 'srUSDe') => {
    return asset === 'jrUSDe' ? jrUSDeIcon : srUSDeIcon;
};

export const ProtocolTransactions: React.FC = () => {
    const styles = useStyles();
    const [visibleTransactions, setVisibleTransactions] = useState(8);
    const totalTransactions = 19483;

    const displayedTransactions = mockTransactions.slice(0, visibleTransactions);

    const handleLoadMore = () => {
        setVisibleTransactions(prev => Math.min(prev + 8, totalTransactions));
    };

    return (
        <div css={styles.container}>
            <div css={styles.tableContainer}>
                <div css={styles.tableHeader}>
                    <div className="type-column">Type</div>
                    <div className="asset-column">Asset</div>
                    <div className="txhash-column">Tx Hash</div>
                    <div className="amount-column">Amount</div>
                    <div className="apy-column">APY</div>
                </div>
                {displayedTransactions.map((transaction) => (
                    <div key={transaction.id} css={styles.tableRow}>
                        <div className="type-column">{transaction.type}</div>
                        <div className="asset-column">
                            <img
                                src={getAssetIcon(transaction.asset)}
                                alt={transaction.asset}
                                css={styles.tokenIcon}
                            />
                            <span>{transaction.asset}</span>
                        </div>
                        <div className="txhash-column">{transaction.txHash}</div>
                        <div className="amount-column">{transaction.amount}</div>
                        <div className="apy-column">{transaction.apy}</div>
                    </div>
                ))}
            </div>

            <div css={styles.tableFooter}>
                <div css={styles.paginationContainer}>
                    <div css={styles.transactionCount}>
                        {visibleTransactions} of {totalTransactions.toLocaleString()}
                        <br />
                        <span>transactions shown</span>
                    </div>
                    <div css={styles.progressLine}>
                        <div
                            css={styles.progressFill}
                            style={{ width: `${(visibleTransactions / totalTransactions) * 100}%` }}
                        ></div>
                    </div>
                    {visibleTransactions < totalTransactions && (
                        <button css={styles.loadMoreButton} onClick={handleLoadMore}>
                            Load more
                            <svg css={styles.chevronDown} viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.76675 3.6333L0.766684 0.966632C0.519463 0.637015 0.754653 0.166626 1.16668 0.166626H5.16668C5.5787 0.166626 5.81389 0.637002 5.56668 0.966621L3.56674 3.63329C3.36675 3.89996 2.96675 3.89996 2.76675 3.6333Z" fill="#90A0AC" fillOpacity="0.8" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};