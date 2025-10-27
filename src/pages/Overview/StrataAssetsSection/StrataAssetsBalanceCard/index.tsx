/** @jsxImportSource @emotion/react */
import React from 'react';
import { Paper, Typography } from '@mui/material';

import { Button, Tooltip } from 'components';
import { useStyles } from './styles';

import srUSDe from 'assets/img/tokens/srUSDe.svg';
import jrUSDe from 'assets/img/tokens/jrUSDe.svg';
import { AccountService } from 'src/services/AccountService';
import { useAuth } from 'src/context/AuthContext';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { useNavigate } from 'react-router';
import { routes } from 'src/constants/routing';

interface StrataAssetsBalanceCardProps {
    showViewHistory: boolean;
    setShowViewHistory: (show: boolean) => void;
}

const StrataAssetsBalanceCard: React.FC<StrataAssetsBalanceCardProps> = ({
    setShowViewHistory
}) => {
    const styles = useStyles();
    const { accountAddress } = useAuth();
    const navigate = useNavigate();
    const { data: balances, isLoading} = AccountService.useTrancheBalance(accountAddress);
    const onBuyButtonClicked = () => {
        navigate(routes.buyAndEarn.path);
    };

    return (
        <Paper css={styles.card}>
            <>
                    <div css={styles.header}>
                        <Typography variant="h5" css={styles.title}>
                            Total Balance
                        </Typography>
                        <button css={styles.viewHistoryButton} onClick={() => setShowViewHistory(true)}>
                            <span css={styles.viewHistoryText}>View History</span>
                            <svg css={styles.chevronIcon} viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.13391 3.39986L1.46724 5.39993C1.13763 5.64715 0.667237 5.41196 0.667237 4.99993L0.667236 0.999931C0.667236 0.587911 1.13761 0.35272 1.46723 0.599927L4.1339 2.59987C4.40057 2.79986 4.40057 3.19986 4.13391 3.39986Z" fill="#90A0AC" fillOpacity="0.8" />
                            </svg>
                        </button>
                    </div>

                    <Typography variant="h2" css={styles.balance}>
                        { balances == null ? <SvgLoadingInlined /> : '$' + NumberUtil.abbr(balances.jrt.$ + balances.srt.$) }
                    </Typography>

                    <div css={styles.tokensList}>
                        <div css={styles.tokenItem}>
                            <div css={styles.tokenInfo}>
                                <img src={srUSDe} alt="srUSDe" css={styles.tokenIcon} />
                                <div css={styles.tokenDetails}>
                                    <div css={styles.tokenSymbol}>
                                        <span>srUSDe</span>
                                        <Tooltip
                                           title={'srUSDe is the senior risk tranche - an over-collateralized, yield-bearing dollar backed by USDe, offering a guaranteed min. yield with protected, uncapped upside.'}
                                        >
                                        <svg css={styles.infoIcon} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM5.75 7C5.33579 7 5 7.33579 5 7.75C5 8.16421 5.33579 8.5 5.75 8.5H6.5V10.25C6.5 10.6642 6.83579 11 7.25 11C7.66421 11 8 10.6642 8 10.25V7.75C8 7.33579 7.66421 7 7.25 7H5.75Z" fill="#90A0AC" fillOpacity="0.5"/>
                                        </svg>
                                        </Tooltip>
                                    </div>
                                    <Typography variant="body2" css={styles.tokenName}>
                                        Senior USDe
                                    </Typography>
                                </div>
                            </div>
                            <div css={styles.tokenBalances}>
                                <Typography variant="body1" css={styles.tokenAmount}>
                                    { balances == null ? <SvgLoadingInlined /> : NumberUtil.format(balances.srt.balance, { minFraction: 3 }) }
                                </Typography>
                                <Typography variant="body2" css={styles.tokenValue}>
                                    { balances == null ? <SvgLoadingInlined /> : '~ $' + NumberUtil.abbr(balances.srt.$) }
                                </Typography>
                            </div>
                        </div>

                        <div css={styles.tokenItem}>
                            <div css={styles.tokenInfo}>
                                <img src={jrUSDe} alt="jrUSDe" css={styles.tokenIcon} />
                                <div css={styles.tokenDetails}>
                                    <div css={styles.tokenSymbol}>
                                        <span>jrUSDe</span>
                                        <Tooltip
                                           title={'jrUSDe represents the junior risk tranche, providing leveraged upside to sUSDe APY while serving as a liquid insurance pool for the senior tranche.'}
                                        >
                                        <svg css={styles.infoIcon} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM5.75 7C5.33579 7 5 7.33579 5 7.75C5 8.16421 5.33579 8.5 5.75 8.5H6.5V10.25C6.5 10.6642 6.83579 11 7.25 11C7.66421 11 8 10.6642 8 10.25V7.75C8 7.33579 7.66421 7 7.25 7H5.75Z" fill="#90A0AC" fillOpacity="0.5"/>
                                        </svg>
                                        </Tooltip>
                                    </div>
                                    <Typography variant="body2" css={styles.tokenName}>
                                        Junior USDe
                                    </Typography>
                                </div>
                            </div>
                            <div css={styles.tokenBalances}>
                                <Typography variant="body1" css={styles.tokenAmount}>
                                    { balances == null ? <SvgLoadingInlined /> : NumberUtil.format(balances.jrt.balance, { minFraction: 3 }) }
                                </Typography>
                                <Typography variant="body2" css={styles.tokenValue}>
                                    { balances == null ? <SvgLoadingInlined /> : '~ $' + NumberUtil.abbr(balances.jrt.$) }
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        fullWidth
                        css={styles.buyButton}
                        onClick={onBuyButtonClicked}
                    >
                        Buy
                    </Button>
                </>
        </Paper>
    );
};

export default StrataAssetsBalanceCard;
