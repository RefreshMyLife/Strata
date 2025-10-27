/** @jsxImportSource @emotion/react */
import { Tab, Tabs, Typography, styled } from '@mui/material';
import React, { ReactComponentElement, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { CommonService } from 'src/services/CommonService';
import { MetricsService } from 'src/services/MetricsService';
import { ProtocolsBalancesService } from 'src/services/ProtocolBalancesService';
import { Token } from 'src/types';

import { ReactComponent as BaseIcon } from 'src/assets/img/icons/base.svg';
import { ReactComponent as BNBIcon } from 'src/assets/img/icons/bnb.svg';
import { ReactComponent as CheveronDownIcon } from 'src/assets/img/icons/chevron-down-white.svg';
import { ReactComponent as EthereumIcon } from 'src/assets/img/icons/ethereum.svg';
import { ReactComponent as HyperliquidIcon } from 'src/assets/img/icons/hyperliquid.svg';
import { ReactComponent as MorphoIcon } from 'src/assets/img/icons/morpho.svg';
import { ReactComponent as PendleIcon } from 'src/assets/img/icons/pendle.svg';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import { ReactComponent as EulerIcon } from 'src/assets/img/protocols/euler.svg';
import { ReactComponent as EthenalIcon } from 'src/assets/img/tokens/ethena_p.svg';
import { ReactComponent as StrataIcon } from 'src/assets/img/tokens/strata.svg';
import { ReactComponent as StrataBlackIcon } from 'src/assets/img/tokens/strata_black.svg';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { routes } from 'src/constants/routing';
import { TOKENS } from 'src/constants/tokens';
import { useAuth } from 'src/context/AuthContext';
import { $apr } from 'src/utilities/$apr';
import { $error } from 'src/utilities/$error';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { PointsConstants } from './PointsIntegrations';
import { useStyles } from './styles';

const StyledTabs = styled(Tabs)(() => ({
    height: '40px',
    minHeight: '40px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    '& .MuiTabs-indicator': {
        backgroundColor: 'rgba(32, 176, 253, 1)',
        height: '1px',
    },
    '& .MuiTabs-flexContainer': {
        gap: '24px',
    },
}));

interface NetworkOption {
    id: string;
    name: string;
    chainId: string;
    icon: React.ReactNode;
}

const networkOptions: NetworkOption[] = [
    // { id: 'base', name: 'Base', chainId: '8453', icon: <BaseIcon /> },
    // { id: 'bnb', name: 'BNB', chainId: '56', icon: <BNBIcon /> },
    { id: 'ethereum', name: 'Ethereum', chainId: '1', icon: <EthereumIcon /> },
    // { id: 'hyperliquid', name: 'Hyperliquid', chainId: '998', icon: <HyperliquidIcon /> },
];

interface Activity {
    icon: ReactComponentElement<any>;
    id: string;
    name: string;
    description: string;
    category: 'lending' | 'dexs' | 'high-apy' | 'network' | 'pendle';
    balance: string;
    totalPoints: string;
    points24h: string;
    rewards: {
        strata?: number;
        ethena?: number;
        soon?: boolean;
        apy?: string;
    };
    chainId?: string | number;
    token?: Token;
    url?: string;
    getter?: string[];
}

const activities: Activity[] = [
    {
        icon: <StrataBlackIcon width="40" height="40" />,
        id: 'strata-1',
        name: 'Strata',
        description: 'Buy & hold srUSDe',
        category: 'high-apy',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 30,
            ethena: 30,
        },
        chainId: '1',
        token: TOKENS.srusde,
        getter: ['tranche', 'srUSDe'],
    },
    {
        icon: <StrataBlackIcon width="40" height="40" />,
        id: 'strata-2',
        name: 'Strata',
        description: 'Buy & hold jrUSDe',
        category: 'high-apy',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 10,
            ethena: 5,
        },
        token: TOKENS.jrusde,
        getter: ['tranche', 'jrUSDe'],
    },
    {
        icon: <PendleIcon width="40" height="40" />,
        id: 'pendle-yt-sr-1',
        name: 'Pendle srUSDe LP (Jan 26)',
        description: 'Provide liquidity into Pendle srUSDe',
        category: 'pendle',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 60,
            ethena: 40,
        },
        url: 'https://app.pendle.finance/trade/pools/0xa83174f1dd8475378abca9d676dad3ce97409e0a/zap/in?chain=ethereum',
        token: {
            address: '0xa83174f1dd8475378abca9d676dad3ce97409e0a',
            symbol: 'Pendle LPT-srUSDe',
            decimals: 18,
            asset: null,
        },
        getter: ['pendle', 'srUSDe LP'],
    },
    {
        icon: <PendleIcon width="40" height="40" />,
        id: 'pendle-yt-sr-2',
        name: 'Pendle srUSDe YT (Jan 26)',
        description: 'Buy & hold Pendle YT-srUSDe',
        category: 'pendle',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 60,
            ethena: 40,
        },
        url: 'https://app.pendle.finance/trade/markets/0xa83174f1dd8475378abca9d676dad3ce97409e0a/swap?view=yt&chain=ethereum',
        token: {
            address: '0xbb9a3d650959386d40e52e6e9e5f242738b1ac76',
            symbol: 'Pendle YT-srUSDe',
            decimals: 18,
            asset: null,
        },
        getter: ['pendle', 'srUSDe YT'],
    },
    {
        icon: <PendleIcon width="40" height="40" />,
        id: 'pendle-yt-jr-1',
        name: 'Pendle jrUSDe LP (Jan 26)',
        description: 'Provide liquidity into Pendle jrUSDe',
        category: 'pendle',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 20,
            ethena: 10,
        },
        url: 'https://app.pendle.finance/trade/pools/0x41264f35ef7ef8c4905ca98052e8d7480f12859e/zap/in?chain=ethereum',
        token: {
            address: '0x41264f35ef7ef8c4905ca98052e8d7480f12859e',
            symbol: 'Pendle LPT-jrUSDe',
            decimals: 18,
            asset: null,
        },
        getter: ['pendle', 'jrUSDe LP'],
    },
    {
        icon: <PendleIcon width="40" height="40" />,
        id: 'pendle-yt-jr-2',
        name: 'Pendle jrUSDe YT (Jan 26)',
        description: 'Buy & hold Pendle YT-jrUSDe',
        category: 'pendle',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 20,
            ethena: 10,
        },
        url: 'https://app.pendle.finance/trade/markets/0x41264f35ef7ef8c4905ca98052e8d7480f12859e/swap?view=yt&chain=ethereum',
        token: {
            address: '0x1ec77f630ef8e8e0ae29aa44a48af8fa41c2f762',
            symbol: 'Pendle YT-jrUSDe',
            decimals: 18,
            asset: null,
        },
        getter: ['pendle', 'jrUSDe YT'],
    },
    {
        icon: <EulerIcon width="40" height="40" />,
        id: 'euler-esrusde',
        name: 'Euler Strata Frontier',
        description: 'Deposit srUSDe into Euler',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 30,
            ethena: 30,
        },
        url: 'https://app.euler.finance/vault/0xF0ee6229CB0c3ed8DA93cA49191c7261566783AF?network=ethereum',
        token: {
            address: '0xF0ee6229CB0c3ed8DA93cA49191c7261566783AF',
            symbol: 'esrUSDe',
            decimals: 18,
            asset: null,
        },
    },
    {
        icon: <EulerIcon width="40" height="40" />,
        id: 'euler-ejrusde',
        name: 'Euler Strata Frontier',
        description: 'Deposit jrUSDe into Euler',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 10,
            ethena: 5,
        },
        url: 'https://app.euler.finance/vault/0xfa68974D007D755697Cc4D4E1e4057034EA666df?network=ethereum',
        token: {
            address: '0xfa68974D007D755697Cc4D4E1e4057034EA666df',
            symbol: 'ejrUSDe',
            decimals: 18,
            asset: null,
        },
    },
    {
        icon: <EulerIcon width="40" height="40" />,
        id: 'euler-pt-srusde',
        name: 'Euler Strata Frontier',
        description: 'Deposit PT-srUSDe',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {},
        url: 'https://app.euler.finance/vault/0xDa8A66A3BD832B02f331330CCCC94D8e8987E9C7?network=ethereum',
    },
    {
        icon: <EulerIcon width="40" height="40" />,
        id: 'euler-pt-jrusde',
        name: 'Euler Strata Frontier',
        description: 'Deposit PT-jrUSDe',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {},
        url: 'https://app.euler.finance/vault/0x32eeB44e99195622290eC1BD229Cd5E766DA251C?network=ethereum',
    },
    {
        icon: <MorphoIcon width="40" height="40" />,
        id: 'morpho-esrusde',
        name: 'Morpho Hyperithm USDC',
        description: 'Deposit jrUSDe and borrow',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 10,
            ethena: 5,
        },
        url: 'https://app.morpho.org/ethereum/market/0x54cebd0c5d5ad84f551a883991c39c470e081a20452eaef47eec2377ffae9f98/jrusde-usdc?tab=market',
    },
    {
        icon: <MorphoIcon width="40" height="40" />,
        id: 'morpho-mev-capital-pts-usdc',
        name: 'Morpho MEV Capital PTs USDC',
        description: 'Deposit PT-srUSDe and borrow',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {},
        url: 'https://app.morpho.org/ethereum/market/0x79b4e55cef9e7c214b5cc965e1984229ada26a66051e35366a75c4d92b776735/pt-srusde-15jan2026-usdc',
    },
    {
        icon: <MorphoIcon width="40" height="40" />,
        id: 'morpho-hyperithm-pts-usdc-srusde',
        name: 'Morpho Hyperithm USDC',
        description: 'Deposit wLP-srUSDe and borrow',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 60,
            ethena: 40,
        },
        url: 'https://app.morpho.org/ethereum/market/0x3f246a31d3583a4c0ab8d83ea46907b188b8b463edb1c45af62b6265335084ee/wrapped-lp-srusde-15jan2026-usdc',
    },
    {
        icon: <MorphoIcon width="40" height="40" />,
        id: 'morpho-hyperithm-pts-usdc-jrusde',
        name: 'Morpho Hyperithm USDC',
        description: 'Deposit wLP-jrUSDe and borrow',
        category: 'lending',
        balance: '23,23 USDC',
        totalPoints: '1,001',
        points24h: '',
        rewards: {
            strata: 20,
            ethena: 10,
        },
        url: 'https://app.morpho.org/ethereum/market/0x7b6129564616bf5c2390d7c2b202d48fb1798146bdb4b90eb0dad035607a32ec/wrapped-lp-jrusde-15jan2026-usdc',
    },
];

interface PointsWalletConnectedProps {}

export const PointsActivitiesPanel: React.FC<PointsWalletConnectedProps> = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { accountAddress } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
    const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { data: metrics } = MetricsService.useGetCurrentBasic();
    const { data: balances } = ProtocolsBalancesService.useGetBalances(
        activities.map(x => x.token).filter(Boolean),
        accountAddress,
    );
    const { data: userPoints } = useGetPointsStats({ accountAddress, season: 1 });
    const itemsPerPage = 6;
    const className = accountAddress ? '' : 'no-account';

    if (metrics != null) {
        let srUSDe = activities.find(x => x.id === 'strata-1');
        srUSDe.rewards.apy = $apr.format(metrics.apySrt);

        let jrUSDe = activities.find(x => x.id === 'strata-2');
        jrUSDe.rewards.apy = $apr.format(metrics.apyJrt);
    }
    if (balances != null) {
        balances.forEach(balance => {
            let idx = activities.findIndex(x => x.token?.address === balance.token.address);
            if (idx > -1) {
                activities[idx].balance = !balance.balance ? '' : NumberUtil.abbr(balance.balance);
            }
        });
    }
    useMemo(() => {
        if (userPoints == null) {
            return;
        }
        activities
            .filter(x => x.getter != null)
            .forEach(activity => {
                let [key, name] = activity.getter;
                let points = userPoints.account.points[key];
                if (points == null) {
                    return;
                }
                let integration = PointsConstants.IntegrationsS1.find(x => x.key === key);
                if (integration == null) {
                    console.error(`Invalid integration for ${key}`);
                    return;
                }
                let idx = integration.names?.indexOf(name);
                if (idx === -1) {
                    $error.throwOnLocal(`Invalid name for ${key} in ${name}`);
                    return;
                }
                let p = points[idx] ?? 0;
                if (p > 0) {
                    activity.totalPoints = NumberUtil.abbr(p);
                }
            });
    }, [userPoints]);

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

    const handleDeposit = (activity: Activity) => {
        if (activity.id === 'strata-1') {
            CommonService.setPreferredTranche(TOKENS.srusde);
            navigate(routes.buyAndEarn.path);
            return;
        }
        if (activity.id === 'strata-2') {
            CommonService.setPreferredTranche(TOKENS.jrusde);
            navigate(routes.buyAndEarn.path);
            return;
        }
        if (activity.url) {
            window.open(activity.url, '_blank');
            return;
        }
    };

    // Filter activities based on search query and selected filter
    const filteredActivities = useMemo(() => {
        return activities.filter(activity => {
            const matchesSearch =
                !searchQuery ||
                activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter =
                selectedFilter === 'all' ||
                selectedFilter === 'network' ||
                activity.category === selectedFilter;
            const matchesNetwork = true;
            return matchesSearch && matchesFilter && matchesNetwork;
        });
    }, [searchQuery, selectedFilter]);

    const startIndex = (currentPage - 1) * itemsPerPage;

    return (
        <div css={styles.activitiesSection}>
            <Typography variant="h4" css={styles.activitiesTitle}>
                Earning Activities
            </Typography>

            <div css={styles.activitiesHeader}>
                {/* Activity Filters */}
                <div css={styles.filterTabs}>
                    <button
                        css={[styles.filterTab, selectedFilter === 'all' && styles.activeFilterTab]}
                        onClick={() => {
                            setSelectedFilter('all');
                            setCurrentPage(1);
                        }}
                    >
                        All
                    </button>
                    <button
                        css={[
                            styles.filterTab,
                            selectedFilter === 'lending' && styles.activeFilterTab,
                        ]}
                        onClick={() => {
                            setSelectedFilter('lending');
                            setCurrentPage(1);
                        }}
                    >
                        Lending
                    </button>
                    <button
                        css={[
                            styles.filterTab,
                            selectedFilter === 'dexs' && styles.activeFilterTab,
                        ]}
                        onClick={() => {
                            setSelectedFilter('dexs');
                            setCurrentPage(1);
                        }}
                    >
                        DEXs
                    </button>
                    <button
                        css={[
                            styles.filterTab,
                            selectedFilter === 'pendle' && styles.activeFilterTab,
                        ]}
                        onClick={() => {
                            setSelectedFilter('pendle');
                            setCurrentPage(1);
                        }}
                    >
                        Pendle
                    </button>
                    <button
                        css={[
                            styles.filterTab,
                            selectedFilter === 'high-apy' && styles.activeFilterTab,
                        ]}
                        onClick={() => {
                            setSelectedFilter('high-apy');
                            setCurrentPage(1);
                        }}
                    >
                        High APY
                    </button>
                    <div css={styles.networkDropdownContainer} ref={dropdownRef}>
                        <button
                            css={[
                                styles.filterTab,
                                styles.networkDropdownButton,
                                (selectedFilter === 'network' ||
                                    selectedNetworks.length > 0 ||
                                    isNetworkDropdownOpen) &&
                                    styles.activeFilterTab,
                            ]}
                            onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                        >
                            {selectedNetworks.length === 0
                                ? 'Network'
                                : selectedNetworks.length === 1
                                  ? networkOptions.find(n => n.id === selectedNetworks[0])?.name ||
                                    'Network'
                                  : `${selectedNetworks.length} Networks`}
                            <CheveronDownIcon
                                style={{
                                    marginLeft: '4px',
                                    transform: isNetworkDropdownOpen
                                        ? 'rotate(180deg)'
                                        : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease',
                                }}
                            />
                        </button>

                        {isNetworkDropdownOpen && (
                            <div css={styles.networkDropdownMenu}>
                                {networkOptions.map(network => (
                                    <div
                                        key={network.id}
                                        css={[
                                            styles.networkDropdownItem,
                                            selectedNetworks.includes(network.id) &&
                                                styles.selectedNetworkItem,
                                        ]}
                                        onClick={() => {
                                            const isSelected = selectedNetworks.includes(
                                                network.id,
                                            );
                                            if (isSelected) {
                                                setSelectedNetworks(
                                                    selectedNetworks.filter(
                                                        id => id !== network.id,
                                                    ),
                                                );
                                            } else {
                                                setSelectedNetworks([
                                                    ...selectedNetworks,
                                                    network.id,
                                                ]);
                                            }
                                            setSelectedFilter('network');
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <div css={styles.networkInfo}>
                                            <input
                                                type="checkbox"
                                                checked={selectedNetworks.includes(network.id)}
                                                onChange={() => {}}
                                                style={{ marginRight: '8px' }}
                                            />
                                            {network.icon}
                                            <span css={styles.networkName}>{network.name}</span>
                                        </div>
                                        <span css={styles.networkChainId}>{network.chainId}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search */}
                <div css={styles.searchContainer}>
                    <SearchIcon width="16" height="16" css={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={e => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        css={styles.searchInput}
                    />
                </div>
            </div>

            {/* Activities Table */}
            {filteredActivities.length > 0 ? (
                <div css={styles.activitiesTable} className={className}>
                    <div css={styles.tableHeader}>
                        <div css={styles.tableHeaderCell}>Pool</div>
                        {accountAddress != null && (
                            <>
                                <div css={styles.tableHeaderCell}>Balance</div>
                                <div css={styles.tableHeaderCell}>Total Points</div>
                                {/* <div css={styles.tableHeaderCell}>24h Points</div> */}
                            </>
                        )}
                        <div css={styles.tableHeaderCell}>APY & Rewards</div>
                        <div css={[styles.tableHeaderCell, styles.tableActions]}>Action</div>
                    </div>

                    {filteredActivities.map(activity => (
                        <div key={activity.id} css={styles.tableRow}>
                            <div css={styles.tableCell}>
                                <div css={styles.poolInfo}>
                                    {activity.icon}
                                    <div>
                                        <Typography variant="body1" css={styles.poolName}>
                                            {activity.name}
                                        </Typography>
                                        <Typography variant="body2" css={styles.poolDescription}>
                                            {activity.description}
                                        </Typography>
                                    </div>
                                </div>
                            </div>

                            {accountAddress != null && (
                                <>
                                    <div css={styles.tableCell}>
                                        <Typography variant="body1" css={styles.totalPoints}>
                                            {activity.token != null && activity.balance == null ? (
                                                <SvgLoadingInlined />
                                            ) : (
                                                activity.balance
                                            )}
                                        </Typography>
                                    </div>
                                    <div css={styles.tableCell}>
                                        <Typography variant="body1" css={styles.totalPoints}>
                                            {activity.totalPoints}
                                        </Typography>
                                    </div>

                                    {/* <div css={styles.tableCell}>
                      <Typography variant="body1" css={styles.points24h}>
                        {activity.points24h}
                      </Typography>
                    </div> */}
                                </>
                            )}

                            <div css={styles.tableCell}>
                                <div css={styles.rewards}>
                                    {activity.rewards.apy && (
                                        <div css={styles.reward}>
                                            <Typography variant="body1" css={styles.rewardValue1}>
                                                {activity.rewards.apy} +
                                            </Typography>
                                        </div>
                                    )}
                                    {activity.rewards.strata && (
                                        <div css={styles.reward}>
                                            <Typography variant="body1" css={styles.rewardValue1}>
                                                {activity.rewards.strata}x
                                            </Typography>
                                            <StrataIcon width="16" height="16" />
                                        </div>
                                    )}
                                    {activity.rewards.ethena && (
                                        <div css={styles.reward}>
                                            <Typography variant="body1" css={styles.rewardValue2}>
                                                + {activity.rewards.ethena}x
                                            </Typography>
                                            <EthenalIcon width="16" height="16" />
                                        </div>
                                    )}
                                    {activity.rewards.soon && (
                                        <div css={styles.reward}>
                                            <Typography variant="body1" css={styles.rewardValue1}>
                                                Soon
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div css={[styles.tableCell, styles.tableActions]}>
                                <button
                                    css={styles.depositButton}
                                    disabled={activity.rewards.soon}
                                    onClick={() => handleDeposit(activity)}
                                >
                                    {activity.rewards.soon ? 'Soon' : 'Deposit'}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Table Footer with Pagination */}
                    {/* <div css={styles.tableFooter}>
                  <div css={styles.paginationContainer}>
                    <Typography variant="body1" css={styles.activitiesCount}>
                      6 of 19,683
                      <br />
                      <span css={styles.activitiesSubtext}>activities shown</span>
                    </Typography>

                    <div css={styles.progressLine}>
                      <div
                        css={styles.progressFill}
                        style={{ width: `${filteredActivities.length > 0 ? (displayedActivities.length / filteredActivities.length) * 100 : 0}%` }}
                      />
                    </div>

                    <button
                      css={styles.loadMoreButton}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={displayedActivities.length >= filteredActivities.length}
                    >
                      Load more
                      <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.26699 3.63342L0.266928 0.966754C0.0197074 0.637137 0.254897 0.166748 0.666923 0.166748H4.66692C5.07894 0.166748 5.31413 0.637124 5.06693 0.966743L3.06699 3.63341C2.86699 3.90008 2.46699 3.90009 2.26699 3.63342Z" fill="#90A0AC" fillOpacity="0.8" />
                      </svg>
                    </button>
                  </div>
                </div> */}
                </div>
            ) : (
                <div css={styles.activitiesTable}>
                    <div
                        style={{
                            padding: '40px',
                            textAlign: 'center',
                            color: 'rgba(144, 160, 172, 0.8)',
                        }}
                    >
                        No activities found
                    </div>
                </div>
            )}
        </div>
    );
};
