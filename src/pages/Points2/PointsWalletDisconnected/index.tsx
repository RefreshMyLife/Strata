/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuthModal } from 'src/libs/wallet';
import { MetricsService } from 'src/services/MetricsService';

import { ReactComponent as CheveronRightIcon } from 'src/assets/img/icons/chevron-right.svg';
import { ReactComponent as StrataIcon } from 'src/assets/img/tokens/strata.svg';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { PointsActivitiesPanel } from '../PointsWalletConnected/PointsActivitiesPanel';
import { useStyles as useStylesConnected } from '../PointsWalletConnected/styles';
import { useStyles } from './styles';

interface NetworkOption {
    id: string;
    name: string;
    chainId: string;
    icon: React.ReactNode;
}

export interface PointsWalletDisconnectedUiProps {
    isWalletConnected: boolean;
    openAuthModal: () => void;
}

export const PointsWalletDisconnectedUi: React.FC<PointsWalletDisconnectedUiProps> = ({
    isWalletConnected,
    openAuthModal,
}) => {
    const styles = useStyles();
    const stylesConnected = useStylesConnected();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedSeason, setSelectedSeason] = useState('season1');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
    const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { data: stats } = MetricsService.useGetPointsOverview();
    const itemsPerPage = 6;

    const singleStats = useMemo(() => {
        if (stats == null) {
            return null;
        }
        let key = selectedSeason;
        let stat = stats[key];
        if (stat == null) {
            throw new Error('Invalid season');
        }
        return stat;
    }, [selectedSeason, stats]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsNetworkDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (isWalletConnected) {
        return null;
    }

    const handleConnectWallet = () => {
        openAuthModal();
    };

    const startIndex = (currentPage - 1) * itemsPerPage;

    return (
        <div css={styles.container}>
            {/* Header Section */}
            <div css={styles.header}>
                <Typography variant="h3" css={styles.title}>
                    Strata Points
                </Typography>

                {/* Season Tabs */}
                <div css={styles.seasonTabs}>
                    {/* <div
            css={[styles.seasonTab, selectedSeason === 'overall' && styles.activeSeasonTab]}
            onClick={() => setSelectedSeason('overall')}
          >
            <span>Overview</span>
          </div> */}
                    <div
                        css={[
                            styles.seasonTab,
                            selectedSeason === 'season1' && styles.activeSeasonTab,
                        ]}
                        onClick={() => setSelectedSeason('season1')}
                    >
                        <span>Season 1</span>
                        <span css={styles.liveIndicator}>Live</span>
                    </div>
                    <div
                        css={[
                            styles.seasonTab,
                            selectedSeason === 'season0' && styles.activeSeasonTab,
                        ]}
                        onClick={() => setSelectedSeason('season0')}
                    >
                        <span>Season 0</span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div css={styles.statsContainer}>
                <div css={styles.statCard}>
                    <div css={styles.statContent}>
                        <Typography variant="body2" css={styles.statLabel}>
                            Total Users
                        </Typography>
                        <div css={styles.statValueRow}>
                            <div css={styles.statIcon}>
                                <svg
                                    width="30"
                                    height="26"
                                    viewBox="0 0 30 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.2047 9.79995C12.8557 9.79995 15.0047 7.65092 15.0047 4.99995C15.0047 2.34898 12.8557 0.199951 10.2047 0.199951C7.55372 0.199951 5.40469 2.34898 5.40469 4.99995C5.40469 7.65092 7.55372 9.79995 10.2047 9.79995Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M22.2047 11.4C24.4138 11.4 26.2047 9.60909 26.2047 7.39995C26.2047 5.19081 24.4138 3.39995 22.2047 3.39995C19.9955 3.39995 18.2047 5.19081 18.2047 7.39995C18.2047 9.60909 19.9955 11.4 22.2047 11.4Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M1.58913 23.2847C0.953448 22.8777 0.585243 22.1536 0.678367 21.4046C1.26734 16.6672 5.30779 13 10.2045 13C15.1013 13 19.1417 16.6662 19.7307 21.4034C19.8238 22.1525 19.4556 22.8765 18.8199 23.2836C16.333 24.876 13.3766 25.8 10.2045 25.8C7.03248 25.8 4.07603 24.8769 1.58913 23.2847Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M22.2048 22.6C22.1483 22.6 22.0919 22.5996 22.0356 22.5988C22.1457 22.1239 22.1762 21.6216 22.1123 21.1073C21.8316 18.8499 20.9248 16.7872 19.5711 15.0986C20.388 14.7767 21.2779 14.6 22.2092 14.6C25.3128 14.6 27.9577 16.5637 28.9693 19.3164C29.1868 19.908 28.9319 20.5585 28.3921 20.8839C26.5854 21.9733 24.4683 22.6 22.2048 22.6Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                </svg>
                            </div>
                            <Typography variant="h4" css={styles.statValue}>
                                {singleStats == null ? (
                                    <SvgLoadingInlined />
                                ) : (
                                    NumberUtil.format(singleStats.users)
                                )}
                            </Typography>
                        </div>
                    </div>
                </div>

                <div css={styles.statCard}>
                    <div css={styles.statContent}>
                        <Typography variant="body2" css={styles.statLabel}>
                            Total Points
                        </Typography>
                        <div css={styles.statValueRow}>
                            <div css={styles.statIcon}>
                                <StrataIcon width="30" height="30" />
                            </div>
                            <Typography variant="h4" css={styles.statValue}>
                                {singleStats == null ? (
                                    <SvgLoadingInlined />
                                ) : (
                                    NumberUtil.abbr(singleStats.points)
                                )}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/* Season 1 Content */}
            {selectedSeason === 'season1' && (
                <>
                    {/* Earning Activities Section */}
                    <PointsActivitiesPanel />
                </>
            )}
            {selectedSeason === 'season0' && (
                <>
                    <div css={stylesConnected.activitiesSection}>
                        <Typography variant="h4" css={stylesConnected.activitiesTitle}>
                            Earning Activities
                        </Typography>
                        <div css={stylesConnected.season1ActivitySection}>
                            <div>
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M17 0.75C8.02537 0.75 0.75 8.02537 0.75 17C0.75 25.9746 8.02537 33.25 17 33.25C25.9746 33.25 33.25 25.9746 33.25 17C33.25 8.02537 25.9746 0.75 17 0.75ZM18.25 7C18.25 6.30964 17.6904 5.75 17 5.75C16.3096 5.75 15.75 6.30964 15.75 7V17C15.75 17.6904 16.3096 18.25 17 18.25H24.5C25.1904 18.25 25.75 17.6904 25.75 17C25.75 16.3096 25.1904 15.75 24.5 15.75H18.25V7Z"
                                        fill="#20B0FD"
                                    />
                                </svg>
                            </div>
                            <div css={stylesConnected.season1TextSection}>
                                <Typography variant="h4" css={stylesConnected.season1Title}>
                                    Season 0 Ended
                                </Typography>
                                <Typography
                                    variant="body2"
                                    css={stylesConnected.season1Description}
                                >
                                    Partcipate in Strata Season 1 to start earning points
                                </Typography>
                            </div>
                            <button
                                css={stylesConnected.seasonButton}
                                onClick={() => {
                                    setSelectedSeason('season1');
                                }}
                            >
                                Go to Season 1
                                <CheveronRightIcon />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const PointsWalletDisconnected: React.FC = () => {
    const { openAuthModal } = useAuthModal();

    return <PointsWalletDisconnectedUi isWalletConnected={false} openAuthModal={openAuthModal} />;
};

export default PointsWalletDisconnected;
