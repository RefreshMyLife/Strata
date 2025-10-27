/** @jsxImportSource @emotion/react */
import React from 'react';
import { Paper, Typography } from '@mui/material';

import { Button } from 'components';
import { ReactComponent as StrataIcon } from 'assets/img/tokens/strata.svg';
import { useAuth } from 'context/AuthContext';
import { useStyles } from './styles';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { routes } from 'src/constants/routing';
import { useNavigate } from 'react-router';

const EarnPointsCard: React.FC = () => {
    const styles = useStyles();
    const { accountAddress } = useAuth();
    const navigate = useNavigate();
    const isConnected = !!accountAddress;
    const { data: stats } = useGetPointsStats({ accountAddress });
    const onEarnButtonClicked = () => {
        navigate(routes.points.path);
    };

    if (isConnected) {
        return (
            <Paper css={styles.card}>
                <div css={styles.connectedContent}>
                    <div css={styles.iconContainer}>
                        <StrataIcon css={styles.icon} />
                    </div>

                    <Typography variant="h5" css={styles.connectedTitle}>
                        Your Strata Points
                    </Typography>

                    <div css={styles.statsContainer}>
                        <div css={styles.statItem}>
                            <Typography variant="h3" css={styles.statValue}>
                                { stats == null ? <SvgLoadingInlined /> : NumberUtil.abbr(stats.account?.points.total)  }
                            </Typography>
                            <Typography variant="body2" css={styles.statLabel}>
                                S1 Total points
                            </Typography>
                        </div>
                        <div css={styles.statItem}>
                            <Typography variant="h3" css={styles.statValue}>
                                { stats == null ? <SvgLoadingInlined /> : stats.account?.rank  }
                            </Typography>
                            <Typography variant="body2" css={styles.statLabel}>
                                S1 Leaderboard Rank
                            </Typography>
                        </div>
                    </div>
                </div>

                <Button
                    variant="primary"
                    fullWidth
                    css={styles.button}
                    onClick={onEarnButtonClicked}
                >
                    Earn Points
                </Button>
            </Paper>
        );
    }

    return (
        <Paper css={styles.card}>
            <div css={styles.content}>
                <div css={styles.iconContainer} className='points'>
                    <StrataIcon css={styles.icon} />
                </div>

                <Typography variant="h5" css={styles.title}>
                    Earn Strata Points
                </Typography>

                <Typography variant="body2" css={styles.description}>
                    Use srUSDe and jrUSDe across Strata’s DeFi ecosystem to earn Strata Points and Ethena Sats.
                </Typography>
            </div>

            <Button
                variant="primary"
                fullWidth
                css={styles.button}
                onClick={onEarnButtonClicked}
            >
                Earn Points
            </Button>
        </Paper>
    );
};

export default EarnPointsCard;
