/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useAccountAddress } from 'src/libs/wallet';

import ProtocolMetricsSection from './ProtocolMetricsSection';
import ReferralSection from './ReferralSection';
import StrataAssetsSection from './StrataAssetsSection';
import ViewHistory from './StrataAssetsSection/ViewHistory';
import { useStyles } from './styles';

export const OverviewPage: React.FC = () => {
    const styles = useStyles();
    const { accountAddress } = useAccountAddress();
    const isWalletConnected = !!accountAddress;
    const [showViewHistory, setShowViewHistory] = useState(false);

    // If ViewHistory is active, render only ViewHistory component
    if (showViewHistory) {
        return <ViewHistory onBack={() => setShowViewHistory(false)} />;
    }

    if (isWalletConnected) {
        return (
            <div css={styles.container}>
                <StrataAssetsSection
                    showViewHistory={showViewHistory}
                    setShowViewHistory={setShowViewHistory}
                />
                <ProtocolMetricsSection />
            </div>
        );
    }

    return (
        <div css={styles.container}>
            <StrataAssetsSection
                showViewHistory={showViewHistory}
                setShowViewHistory={setShowViewHistory}
            />
            <ReferralSection />
            <ProtocolMetricsSection />
        </div>
    );
};
