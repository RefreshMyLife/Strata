/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router';
import { StrataTVLChart } from 'src/components/charts/StartaTVLChart';
import { SrUSDeAPYChart } from 'src/components/charts/srUSDeAPYChart';
import { JrUSDeAPYChart } from 'src/components/charts/jrUSDeAPYChart';
import { ReactComponent as ChevronRightIcon } from 'src/assets/img/icons/chevron-right.svg';
import { routes } from 'src/constants/routing';
import { useStyles } from './styles';
import SvgLoading from 'src/components/Icon/icons/loading';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { MetricsService } from 'src/services/MetricsService';
import { $chartData } from 'src/components/charts/utils/$chartData';
import { $apr } from 'src/utilities/$apr';

export const ProtocolMetricsSection: React.FC = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { data: metrics7d, isLoading: isLoading7d } = MetricsService.useGetMetrics7d();
    const { data: metricsCurr, isLoading: isLoadingTvl } = MetricsService.useGetCurrentBasic();
    const { data: metrics, isLoading: isLoadingMetrics } = MetricsService.useGetMetricsDashboardPublic();

    const handleViewDashboard = () => {
        navigate(routes.dashboard.path);
    };


    //if (isLoading7d == null || isLoadingTvl == null || isLoadingMetrics == null) {
    if (metrics7d == null || metricsCurr == null || metrics == null) {
        return <div css={styles.container}>
            <SvgLoading style={{ height: '48px', verticalAlign: 'middle'}}/>
        </div>;
    }

    type TChartData = { date: string | '1/12', value: number };
    let tvlData = [] as TChartData[] ;
    let stableApyData = [] as TChartData[];
    let usdtApyData = [] as TChartData[];

    if (metrics != null) {
        tvlData = metrics7d.map(x => ({
            date: x.fmt,
            dateOrig: new Date(x.t * 1000),
            value: x.strataTVL
        }));

        stableApyData = metrics.d7.map(x => {
            return {
                date: $chartData.formatDate(x.date),
                dateOrig: new Date(x.date),
                value: x.srt.apy
            }
        });
        usdtApyData = metrics.d7.map(x => {
            return {
                date: $chartData.formatDate(x.date),
                dateOrig: new Date(x.date),
                value: x.jrt.apy
            }
        });
    }

    const fmtTvl    = metricsCurr == null ? '' : NumberUtil.abbr(metricsCurr.tvlTranches);
    const fmtApySrt = metricsCurr == null ? '' : $apr.format(metricsCurr.apySrt);
    const fmtApyJrt = metricsCurr == null ? '' : $apr.format(metricsCurr.apyJrt);

    return (
        <div css={styles.container}>
            <div css={styles.header}>
                <h2 css={styles.title}>Protocol Metrics</h2>
                <button css={styles.viewDashboardButton} onClick={handleViewDashboard}>
                    <div css={styles.buttonContent}>
                        View Dashboard
                        <ChevronRightIcon width="8px" height="8px" />
                    </div>
                </button>
            </div>

            <div css={styles.metricsContainer}>
                <div css={styles.metricBox}>
                    <div css={styles.metricHeader}>
                        <div css={styles.metricInfo}>
                            <div css={styles.metricTitle}>
                                Strata TVL
                            </div>
                            <div css={styles.metricValue}>
                                { fmtTvl }
                            </div>
                        </div>
                        {/* <div css={styles.metricPeriod}>7d</div> */}
                    </div>
                    <StrataTVLChart data={tvlData} color="#666666" />
                </div>

                <div css={styles.metricBox}>
                    <div css={[styles.metricHeader, { borderLeft: '1px solid rgba(33, 154, 253, 1)' }]}>
                        <div css={styles.metricInfo}>
                            <div css={styles.metricTitle}>
                                srUSDe APY
                            </div>
                            <div css={styles.metricValue}>
                                { fmtApySrt }
                            </div>
                        </div>
                        {/* <div css={styles.metricPeriod}>7d</div> */}
                    </div>
                    <SrUSDeAPYChart data={stableApyData} color="rgba(33, 154, 253, 1)" />
                </div>

                <div css={styles.metricBox}>
                    <div css={[styles.metricHeader, { borderLeft: '1px solid rgba(64, 186, 161, 1)' }]}>
                        <div css={styles.metricInfo}>
                            <div css={styles.metricTitle}>
                                jrUSDe APY
                            </div>
                            <div css={styles.metricValue}>
                                { fmtApyJrt }
                            </div>
                        </div>
                        {/* <div css={styles.metricPeriod}>7d</div> */}
                    </div>
                    <JrUSDeAPYChart data={usdtApyData} color="rgba(64, 186, 161, 1)" />
                </div>
            </div>
        </div>
    );
};

export default ProtocolMetricsSection;
