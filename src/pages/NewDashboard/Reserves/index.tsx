/** @jsxImportSource @emotion/react */
import { Menu, MenuItem } from '@mui/material';
import alot from 'alot';
import React, { useMemo, useState } from 'react';
import { MetricsService } from 'src/services/MetricsService';

import USDeIcon from 'assets/img/tokens/USDe.svg';
import sUSDeIcon from 'assets/img/tokens/sUSDe-white.svg';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { APYComparisonChart } from 'src/components/charts/APYComparisonChart';
import { ReservesTotalAssetsChart } from 'src/components/charts/ReservesTotalAssetsChart';
import { $chartData } from 'src/components/charts/utils/$chartData';
import { $timeframe } from 'src/components/charts/utils/$timeframe';
import { $apr } from 'src/utilities/$apr';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { useStyles } from './styles';

const totalAssetsData = [
    { date: '2024-04-01', month: 'Apr', value: 2.3 },
    { date: '2024-05-01', month: 'May', value: 2.4 },
    { date: '2024-06-01', month: 'Jun', value: 2.45 },
    { date: '2024-07-01', month: 'Jul', value: 2.35 },
    { date: '2024-08-01', month: 'Aug', value: 2.5 },
    { date: '2024-09-01', month: 'Sep', value: 2.48 },
    { date: '2024-10-01', month: 'Oct', value: 2.509 },
];

const apyComparisonData = [
    { date: '2024-04-01', month: 'Apr', collateralPoolAPY: 4.8, benchmarkAPY: 6.9 },
    { date: '2024-05-01', month: 'May', collateralPoolAPY: 4.9, benchmarkAPY: 7.0 },
    { date: '2024-06-01', month: 'Jun', collateralPoolAPY: 5.1, benchmarkAPY: 7.1 },
    { date: '2024-07-01', month: 'Jul', collateralPoolAPY: 4.7, benchmarkAPY: 6.8 },
    { date: '2024-08-01', month: 'Aug', collateralPoolAPY: 5.0, benchmarkAPY: 7.0 },
    { date: '2024-09-01', month: 'Sep', collateralPoolAPY: 5.1, benchmarkAPY: 7.2 },
    { date: '2024-10-01', month: 'Oct', collateralPoolAPY: 5.02, benchmarkAPY: 7.0 },
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

export const Reserves: React.FC = () => {
    const styles = useStyles();
    const [totalAssetsTimeframe, setTotalAssetsTimeframe] = useState('7d');
    const [apyTimeframe, setApyTimeframe] = useState('7d');
    const { data: metrics7d, isLoading: isLoading7dMetrics } = MetricsService.useGetMetrics7d();
    const { data: metricsCurrent, isLoading: isLoadingCurrent } =
        MetricsService.useGetCurrentBasic();
    const { data: metrics, isLoading: isMetricsReserveLoading } =
        MetricsService.useGetMetricsDashboardPublic();

    const reserveAssets = [
        {
            symbol: 'sUSDe',
            icon: sUSDeIcon,
            apy: $timeframe.avg(metrics7d?.map(x => x.apyBase)) + '%',
            value:
                metricsCurrent == null ? null : `$${NumberUtil.abbr(metricsCurrent.tvlTranches)}`,
            share: '100%',
            isLoading: isLoading7dMetrics,
        },
    ];
    let marketCapData = null;
    let apyComparisonData = null;
    if (metrics) {
        marketCapData = $chartData.getTvlData('sum', metrics);
        apyComparisonData = $chartData.getApyBasicData(metrics);
    }

    let apys = useMemo(() => {
        if (metrics == null) {
            return null;
        }
        let key = $timeframe.toKey(apyTimeframe) as 'd7';
        let arr = metrics[key];
        let apyBase = alot(arr).sum(x => x.apys.base) / arr.length;
        let apyTarget = alot(arr).sum(x => x.apys.target) / arr.length;
        return { apyBase, apyTarget };
    }, [metrics, apyTimeframe]);

    return (
        <div css={styles.container}>
            <div css={styles.chartsRow}>
                <div css={styles.chart}>
                    <div className="chart-header">
                        <p className="chart-title">Total Assets</p>
                        <ChartDropdown
                            options={['All', '1y', '30d', '7d']}
                            selected={totalAssetsTimeframe}
                            onSelect={setTotalAssetsTimeframe}
                        />
                    </div>
                    <p className="chart-value">
                        {metricsCurrent == null ? (
                            <SvgLoadingInlined />
                        ) : (
                            '$' + NumberUtil.abbr(metricsCurrent.tvlTranches)
                        )}
                    </p>
                    <ReservesTotalAssetsChart
                        data={marketCapData}
                        timeframe={totalAssetsTimeframe}
                        symbol="Total Assets"
                    />
                </div>
                <div css={styles.chart}>
                    <div className="chart-header">
                        <div css={styles.apyHeaderContainer}>
                            <div css={styles.apyMetricsRow}>
                                <div css={styles.apyMetricBoxWhite}>
                                    <span css={styles.apyLabel}>Collateral Pool APY</span>
                                    <span css={styles.apyValue}>
                                        {apys == null ? (
                                            <SvgLoadingInlined />
                                        ) : (
                                            $apr.format(apys.apyBase)
                                        )}
                                    </span>
                                </div>
                                <div css={styles.apyMetricBoxPurple}>
                                    <span css={styles.apyLabel}>Benchmark APY</span>
                                    <span css={styles.apyValue}>
                                        {apys == null ? (
                                            <SvgLoadingInlined />
                                        ) : (
                                            $apr.format(apys.apyTarget)
                                        )}
                                    </span>
                                </div>
                            </div>
                            <ChartDropdown
                                options={['All', '1y', '30d', '7d']}
                                selected={apyTimeframe}
                                onSelect={setApyTimeframe}
                            />
                        </div>
                    </div>
                    <APYComparisonChart data={apyComparisonData} timeframe={apyTimeframe} />
                </div>
            </div>

            <div css={styles.tableContainer}>
                <div css={styles.tableHeader}>
                    <div className="asset-column">Asset</div>
                    <div className="apy-column">7d APY</div>
                    <div className="value-column">Value</div>
                    <div className="share-column">Share</div>
                </div>
                {reserveAssets.map(asset => (
                    <div key={asset.symbol} css={styles.tableRow}>
                        <div className="asset-column">
                            <img src={asset.icon} alt={asset.symbol} css={styles.tokenIcon} />
                            <span>{asset.symbol}</span>
                        </div>
                        <div className="apy-column">
                            {asset.isLoading ? <SvgLoadingInlined /> : asset.apy}
                        </div>
                        <div className="value-column">
                            {asset.value == null ? <SvgLoadingInlined /> : asset.value}
                        </div>
                        <div className="share-column">{asset.share}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
