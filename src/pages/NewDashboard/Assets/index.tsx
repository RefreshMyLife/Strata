/** @jsxImportSource @emotion/react */
import { Collapse, Menu, MenuItem } from '@mui/material';
import alot from 'alot';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { MetricsService } from 'src/services/MetricsService';

import jrUSDeIcon from 'assets/img/tokens/jrUSDe.svg';
import srUSDeIcon from 'assets/img/tokens/srUSDe.svg';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { DashboardAPYChart } from 'src/components/charts/DashboardAPYChart';
import { DashboardMarketCapChart } from 'src/components/charts/DashboardMarketCapChart';
import { DashboardPriceChart } from 'src/components/charts/DashboardPriceChart';
import { $chartData } from 'src/components/charts/utils/$chartData';
import { $timeframe } from 'src/components/charts/utils/$timeframe';
import { routes } from 'src/constants/routing';
import { $apr } from 'src/utilities/$apr';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { useStyles } from './styles';

// Fixed sample data for charts
const priceData = [
    { date: '2024-04-01', month: 'Apr', value: 1.05 },
    { date: '2024-05-01', month: 'May', value: 1.12 },
    { date: '2024-06-01', month: 'Jun', value: 1.08 },
    { date: '2024-07-01', month: 'Jul', value: 1.18 },
    { date: '2024-08-01', month: 'Aug', value: 1.22 },
    { date: '2024-09-01', month: 'Sep', value: 1.15 },
    { date: '2024-10-01', month: 'Oct', value: 1.1 },
];

const marketCapData = [
    { date: '2024-04-01', month: 'Apr', value: 2.2 },
    { date: '2024-05-01', month: 'May', value: 2.5 },
    { date: '2024-06-01', month: 'Jun', value: 2.8 },
    { date: '2024-07-01', month: 'Jul', value: 2.4 },
    { date: '2024-08-01', month: 'Aug', value: 2.9 },
    { date: '2024-09-01', month: 'Sep', value: 2.6 },
    { date: '2024-10-01', month: 'Oct', value: 2.3 },
];

const apyData = [
    { date: '2024-01-24', month: '1/24', value: 3.5 },
    { date: '2024-01-25', month: '1/25', value: 4.2 },
    { date: '2024-01-26', month: '1/26', value: 5.8 },
    { date: '2024-01-27', month: '1/27', value: 6.5 },
    { date: '2024-01-28', month: '1/28', value: 7.2 },
    { date: '2024-01-29', month: '1/29', value: 6.8 },
    { date: '2024-01-30', month: '1/30', value: 5.9 },
];

const ChartDropdown: React.FC<{
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
}> = ({ options, selected, onSelect }) => {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        handleClose();
    };

    return (
        <>
            <button css={styles.dropdownButton} onClick={handleClick}>
                <span>{selected}</span>
                <svg
                    css={styles.chevronIcon}
                    viewBox="0 0 6 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.76675 3.6333L0.766684 0.966632C0.519463 0.637015 0.754653 0.166626 1.16668 0.166626H5.16668C5.5787 0.166626 5.81389 0.637002 5.56668 0.966621L3.56674 3.63329C3.36675 3.89996 2.96675 3.89996 2.76675 3.6333Z"
                        fill="#90A0AC"
                        fillOpacity="0.8"
                    />
                </svg>
            </button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: {
                        sx: styles.dropdownMenu,
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem key={option} onClick={() => handleSelect(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

const AssetCard: React.FC<{
    symbol: string;
    name: string;
    price: string;
    apy: string;
    marketCap: string;
    iconSrc: string;
    isExpanded?: boolean;
    isLoading?: boolean;
    onToggle?: () => void;
}> = ({
    symbol,
    name,
    price,
    apy,
    marketCap,
    iconSrc,
    isExpanded = false,
    onToggle,
    isLoading,
}) => {
    const styles = useStyles();
    const navigate = useNavigate();
    const [priceTimeframe, setPriceTimeframe] = useState('7d');
    const [apyTimeframe, setApyTimeframe] = useState('7d');
    const [marketCapTimeframe, setMarketCapTimeframe] = useState('7d');
    const { data: metrics, isLoading: isMetricsLoading } =
        MetricsService.useGetMetricsDashboardPublic();
    const tranche = symbol === 'jrUSDe' ? ('jrt' as const) : ('srt' as const);

    let priceData = null;
    let apyData = null as ReturnType<typeof $chartData.getApyData>;
    let marketCapData = null;
    if (metrics) {
        priceData = $chartData.getPriceData(tranche, metrics);
        apyData = $chartData.getApyData(tranche, metrics);
        marketCapData = $chartData.getTvlData(tranche, metrics);
    }

    let apyTimeframeValue = useMemo(() => {
        if (metrics == null) {
            return apy;
        }
        return $chartData.getApyAverage(tranche, apyTimeframe, metrics);
    }, [metrics, apy, apyTimeframe]);

    function onBuyButtonClick(e) {
        e.stopPropagation();
        e.preventDefault();
        navigate(routes.buyAndEarn.path);
    }

    return (
        <div css={[styles.assetCard, isExpanded && styles.selectedCard]}>
            <div css={styles.cardHeader}>
                <div css={styles.tokenInfo}>
                    <img src={iconSrc} alt={symbol} css={styles.tokenIcon} />
                    <div css={styles.tokenDetails}>
                        <p className="symbol">{symbol}</p>
                        <p className="name">{name}</p>
                    </div>
                </div>

                <div css={styles.metricsContainer}>
                    <div css={styles.metric}>
                        <p className="label">Price</p>
                        <p className="value">{isLoading ? <SvgLoadingInlined /> : price}</p>
                    </div>

                    <div css={styles.metric}>
                        <p className="label">7d APY</p>
                        <p className="value percentage">
                            {isLoading ? <SvgLoadingInlined /> : apy}
                        </p>
                    </div>

                    <div css={styles.metric}>
                        <p className="label">Market Cap</p>
                        <p className="value">{isLoading ? <SvgLoadingInlined /> : marketCap}</p>
                    </div>
                </div>

                <div css={styles.spacer}>
                    <button css={styles.buyButton} onClick={onBuyButtonClick}>
                        Buy
                    </button>

                    <div css={styles.chevronTrigger} onClick={onToggle}>
                        <svg
                            width="9"
                            height="6"
                            viewBox="0 0 9 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={isExpanded ? 'expanded' : ''}
                        >
                            <path
                                d="M3.62669 5.61333L0.426596 1.34666C0.0310436 0.819272 0.407347 0.0666504 1.06659 0.0666504H7.46659C8.12582 0.0666504 8.50213 0.819252 8.1066 1.34664L4.90669 5.61331C4.5867 6.03998 3.9467 6.03999 3.62669 5.61333Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <Collapse in={isExpanded}>
                <div css={styles.expandedContent}>
                    <div css={styles.chartsRow}>
                        <div css={styles.chart}>
                            <div className="chart-header">
                                <p className="chart-title">Price</p>
                                <ChartDropdown
                                    options={['All', '1y', '30d', '7d']}
                                    selected={priceTimeframe}
                                    onSelect={setPriceTimeframe}
                                />
                            </div>
                            <p className="chart-value">{price}</p>
                            <DashboardPriceChart
                                data={priceData}
                                timeframe={priceTimeframe}
                                symbol={symbol}
                            />
                        </div>

                        <div css={styles.chart}>
                            <div className="chart-header">
                                <p className="chart-title">{apyTimeframe} APY</p>
                                <ChartDropdown
                                    options={['All', '1y', '30d', '7d']}
                                    selected={apyTimeframe}
                                    onSelect={setApyTimeframe}
                                />
                            </div>
                            <p className="chart-value">{apyTimeframeValue}</p>
                            <DashboardAPYChart
                                data={apyData}
                                timeframe={apyTimeframe}
                                symbol={symbol}
                            />
                        </div>

                        <div css={styles.chart}>
                            <div className="chart-header">
                                <p className="chart-title">Market Cap</p>
                                <ChartDropdown
                                    options={['All', '1y', '30d', '7d']}
                                    selected={marketCapTimeframe}
                                    onSelect={setMarketCapTimeframe}
                                />
                            </div>
                            <p className="chart-value">{marketCap}</p>
                            <DashboardMarketCapChart
                                data={marketCapData}
                                timeframe={marketCapTimeframe}
                                symbol={symbol}
                            />
                        </div>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export const Assets: React.FC = () => {
    const styles = useStyles();
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(['jrUSDe', 'srUSDe']));

    const { data: jrt, isLoading: isLoadingJrt } = MetricsService.useGetTrancheBasic('jrt');
    const { data: srt, isLoading: isLoadingSrt } = MetricsService.useGetTrancheBasic('srt');
    const { data: metrics } = MetricsService.useGetMetricsDashboardPublic();
    let srtPrice = '-';
    let srtApy = '-';
    let srtTvl = '-';
    if (srt != null) {
        srtPrice = '$' + NumberUtil.format(srt.price, { fraction: 3, minFraction: 3 });
        srtApy = NumberUtil.format(srt.apy7d, { fraction: 2, minFraction: 2 }) + '%';
        srtTvl = '$' + NumberUtil.abbr(srt.tvl);
    }
    let jrtPrice = '-';
    let jrtApy = '-';
    let jrtTvl = '-';
    if (jrt != null) {
        jrtPrice = '$' + NumberUtil.format(jrt.price, { fraction: 3, minFraction: 3 });
        jrtApy = NumberUtil.format(jrt.apy7d, { fraction: 2, minFraction: 2 }) + '%';
        jrtTvl = '$' + NumberUtil.abbr(jrt.tvl);
    }
    if (metrics != null) {
        srtApy = $chartData.getApyAverage('srt', '7d', metrics);
        jrtApy = $chartData.getApyAverage('jrt', '7d', metrics);
    }

    const handleCardToggle = (symbol: string) => {
        setExpandedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(symbol)) {
                newSet.delete(symbol);
            } else {
                newSet.add(symbol);
            }
            return newSet;
        });
    };

    return (
        <div css={styles.container}>
            <AssetCard
                symbol="srUSDe"
                name="Senior USDe"
                price={srtPrice}
                apy={srtApy}
                marketCap={srtTvl}
                iconSrc={srUSDeIcon}
                isExpanded={expandedCards.has('srUSDe')}
                onToggle={() => handleCardToggle('srUSDe')}
                isLoading={isLoadingSrt}
            />
            <AssetCard
                symbol="jrUSDe"
                name="Junior USDe"
                price={jrtPrice}
                apy={jrtApy}
                marketCap={jrtTvl}
                iconSrc={jrUSDeIcon}
                isExpanded={expandedCards.has('jrUSDe')}
                onToggle={() => handleCardToggle('jrUSDe')}
                isLoading={isLoadingJrt}
            />
        </div>
    );
};
