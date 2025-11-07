/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { CommonService } from 'src/services/CommonService';
import { MetricsService } from 'src/services/MetricsService';

import jrUSDe from 'assets/img/tokens/jrUSDe.svg';
import srUSDe from 'assets/img/tokens/srUSDe.svg';
import { useAuth, useAuthModal } from 'context/AuthContext';
import { routes } from 'src/constants/routing';
import { TOKENS } from 'src/constants/tokens';
import { $apr } from 'src/utilities/$apr';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import ReferralSection from '../ReferralSection';
import AssetCard from './AssetCard';
import EarnPointsCard from './EarnPointsCard';
import StrataAssetsBalanceCard from './StrataAssetsBalanceCard';
import { useStyles } from './styles';

interface StrataAssetsSectionProps {
    showViewHistory: boolean;
    setShowViewHistory: (show: boolean) => void;
}

const StrataAssetsSection: React.FC<StrataAssetsSectionProps> = ({
    showViewHistory,
    setShowViewHistory,
}) => {
    const styles = useStyles();
    const { accountAddress } = useAuth();
    const navigate = useNavigate();

    const { data: jrt, isLoading: isLoadingJrt } = MetricsService.useGetTrancheBasic('jrt');
    const { data: srt, isLoading: isLoadingSrt } = MetricsService.useGetTrancheBasic('srt');
    const { data: basicInfo, isLoading: isLoadingPerf } = MetricsService.useGetCurrentBasic();

    const isConnected = !!accountAddress;

    if (isConnected) {
        return (
            <div css={styles.container}>
                <Typography variant="h4" css={styles.title}>
                    Strata x Ethena Assets
                </Typography>

                <div css={styles.cardsGridNotConnected}>
                    <StrataAssetsBalanceCard
                        showViewHistory={showViewHistory}
                        setShowViewHistory={setShowViewHistory}
                    />

                    <EarnPointsCard />
                    <ReferralSection />
                </div>
            </div>
        );
    }

    let srtPrice = '-';
    let srtApy = '-';
    let srtTvl = '-';
    let srtCoverage = '-';
    if (srt != null) {
        srtPrice = '$' + NumberUtil.format(srt.price, { fraction: 2, minFraction: 2 });
        srtApy = NumberUtil.format(srt.apy7d, { fraction: 2, minFraction: 2 }) + '%';
        srtTvl = '$' + NumberUtil.abbr(srt.tvl);

        srtCoverage = srt.srtCoverage7d + '%';
    }
    let jrtPrice = '—';
    let jrtApy = '—';
    let jrtTvl = '—';
    let jrtOverperformance = '—';
    if (jrt != null) {
        jrtPrice = '$' + NumberUtil.format(jrt.price, { fraction: 2, minFraction: 2 });
        jrtApy = NumberUtil.format(jrt.apy7d, { fraction: 2, minFraction: 2 }) + '%';
        jrtTvl = '$' + NumberUtil.abbr(jrt.tvl);

        if (jrt.jrtOverperformance7d >= 100) {
            jrtOverperformance = jrt.jrtOverperformance7d + '%';
        }
    }
    if (basicInfo != null) {
        // srtCoverage = basicInfo.srtCoverage + '%';
        // if (basicInfo.jrtOverperformance >= 100) {
        //     jrtOverperformance = basicInfo.jrtOverperformance + '%';
        // }
        // jrtApy = $apr.format(basicInfo.apyJrt);
        // srtApy = $apr.format(basicInfo.apySrt);
    }

    function onSrtClicked() {
        CommonService.setPreferredTranche(TOKENS.srusde);
        CommonService.setConnectTick();
        navigate(routes.buyAndEarn.path);
    }
    function onJrtClicked() {
        CommonService.setPreferredTranche(TOKENS.jrusde);
        CommonService.setConnectTick();
        navigate(routes.buyAndEarn.path);
    }

    return (
        <div css={styles.container}>
            <Typography variant="h4" css={styles.title}>
                Strata x Ethena Assets
            </Typography>

            <div css={styles.cardsGrid}>
                <AssetCard
                    symbol="srUSDe"
                    iconSrc={srUSDe}
                    subText="Senior USDe"
                    riskLevel="Low Risk"
                    returnLevel="Moderate Return"
                    description="srUSDe is an over-collateralized, yield-bearing dollar backed by USDe, providing a guaranteed minimum yield at the Sky Savings Rate with protected, uncapped upside to sUSDe APY."
                    price={srtPrice}
                    apy={srtApy}
                    marketCap={srtTvl}
                    coverage={srtCoverage}
                    tranche="Senior"
                    buttonText="Connect Wallet and Buy"
                    isLoading={isLoadingSrt}
                    isLoadingPerf={isLoadingPerf}
                    onButtonClick={onSrtClicked}
                />

                <AssetCard
                    symbol="jrUSDe"
                    iconSrc={jrUSDe}
                    subText="Junior USDe"
                    riskLevel="High Return"
                    returnLevel="Moderate Risk"
                    description="jrUSDe is a yield-bearing investment product and liquid insurance pool, underwriting the risk of sUSDe APY<SSR while providing leveraged upside to sUSDe APY."
                    price={jrtPrice}
                    apy={jrtApy}
                    marketCap={jrtTvl}
                    overperformance={jrtOverperformance}
                    tranche="Junior"
                    buttonText="Connect Wallet and Buy"
                    isLoading={isLoadingJrt}
                    isLoadingPerf={isLoadingPerf}
                    onButtonClick={onJrtClicked}
                />

                <EarnPointsCard />
            </div>
        </div>
    );
};

export default StrataAssetsSection;
