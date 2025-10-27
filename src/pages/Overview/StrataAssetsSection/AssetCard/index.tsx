/** @jsxImportSource @emotion/react */
import { Chip, Paper, Typography } from '@mui/material';
import { Button, Tooltip, TooltipIcon } from 'components';
import React from 'react';
import config from 'src/config';

import { ReactComponent as ArrowUpRight } from 'assets/img/icons/arrow-up-right.svg';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { TOKENS } from 'src/constants/tokens';
import generateBlockchainScanUrl from 'src/utilities/generateBlockchainScanUrl';

import { useStyles } from './styles';

interface AssetCardProps {
    symbol: 'srUSDe' | 'jrUSDe';
    iconSrc: string;
    subText: string;
    riskLevel: string;
    returnLevel: string;
    description: string;
    price: string;
    apy: string;
    marketCap: string;
    coverage?: string;
    overperformance?: string;

    tranche: string;
    buttonText: string;
    onButtonClick;
    isLoading: boolean;
    isLoadingPerf: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({
    symbol,
    iconSrc,
    subText,
    riskLevel,
    returnLevel,
    description,
    price,
    apy,
    marketCap,
    coverage,
    overperformance,
    tranche,
    buttonText,
    onButtonClick,
    isLoading,
    isLoadingPerf,
}) => {
    const styles = useStyles();
    const chainId = config.chainId;
    const token = TOKENS[symbol.toLowerCase()];

    return (
        <Paper css={styles.card}>
            <div css={styles.header}>
                <div css={styles.symbolSection}>
                    <img src={iconSrc} alt={symbol} css={styles.tokenIcon} />
                    <div css={styles.symbolTextContainer}>
                        <Typography
                            component="a"
                            variant="h6"
                            css={styles.symbol}
                            href={generateBlockchainScanUrl({
                                hash: token?.address,
                                urlType: 'address',
                                chainId: chainId,
                            })}
                            target="_blank"
                        >
                            {symbol}
                            <ArrowUpRight css={styles.arrowIcon} />
                        </Typography>
                        <Typography variant="body2" css={styles.subtext}>
                            {subText}
                        </Typography>
                    </div>
                </div>

                <div css={styles.chipContainer}>
                    <Chip label={riskLevel} css={styles.riskChip} size="small" />
                    <Chip label={returnLevel} css={styles.returnChip} size="small" />
                </div>
            </div>

            <Typography variant="body2" css={styles.description}>
                {description}
            </Typography>

            <div css={styles.metricsGrid}>
                <div css={styles.metric}>
                    <Typography variant="caption" css={styles.metricLabel}>
                        Price
                    </Typography>
                    <Typography variant="body1" css={styles.metricValue}>
                        {isLoading ? <SvgLoadingInlined /> : price}
                    </Typography>
                </div>

                <div css={styles.metric}>
                    <Typography variant="caption" css={styles.metricLabel}>
                        APY 7D
                    </Typography>
                    <Typography variant="body1" css={styles.metricValue}>
                        {isLoading ? <SvgLoadingInlined /> : apy}
                    </Typography>
                </div>

                <div css={styles.metric}>
                    <Typography variant="caption" css={styles.metricLabel}>
                        Market Cap
                    </Typography>
                    <Typography variant="body1" css={styles.metricValue}>
                        {isLoading ? <SvgLoadingInlined /> : marketCap}
                    </Typography>
                </div>
                <div css={styles.metric}>
                    <Typography variant="caption" css={styles.metricLabel}>
                        Tranche
                    </Typography>
                    <Typography variant="body1" css={styles.metricValue}>
                        {tranche}
                    </Typography>
                </div>
                {coverage != null && (
                    <div css={styles.metric}>
                        <Typography variant="caption" css={styles.metricLabel}>
                            <span>Coverage</span>
                            <TooltipIcon
                                mobileTitle={'Coverage'}
                                title="Over-collateralization with an additional coverage provided by the junior tranche (7-day average)"
                            />
                        </Typography>
                        <Typography variant="body1" css={styles.metricValue}>
                            {isLoadingPerf ? <SvgLoadingInlined /> : coverage}
                        </Typography>
                    </div>
                )}
                {overperformance != null && (
                    <div css={styles.metric}>
                        <Typography variant="caption" css={styles.metricLabel}>
                            Overperformance
                            <TooltipIcon
                                mobileTitle={'Overperformance'}
                                title={
                                    <span>
                                        Leveraged exposure to sUSDe APY <br />
                                        (7-day average){' '}
                                    </span>
                                }
                            />
                        </Typography>
                        <Typography variant="body1" css={styles.metricValue}>
                            {isLoadingPerf ? <SvgLoadingInlined /> : overperformance}
                        </Typography>
                    </div>
                )}
            </div>

            <Button variant="primary" fullWidth css={styles.button} onClick={onButtonClick}>
                {buttonText}
            </Button>
        </Paper>
    );
};

export default AssetCard;
