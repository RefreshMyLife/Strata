/** @jsxImportSource @emotion/react */
// Icons
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { ReactComponent as LayersIcon } from 'assets/img/icons/mobile-navigation/buy&earn.svg';
import { ReactComponent as DashboardIcon } from 'assets/img/icons/mobile-navigation/dashboard.svg';
import { ReactComponent as BarChartIcon } from 'assets/img/icons/mobile-navigation/overview.svg';
import { ReactComponent as StarIcon } from 'assets/img/icons/mobile-navigation/points.svg';
import { routes } from 'src/constants/routing';

import { useStyles } from './styles';

const MobileNavigation: React.FC = () => {
    const styles = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
    };

    return (
        <Paper css={styles.paper} elevation={0}>
            <BottomNavigation
                value={location.pathname}
                onChange={handleChange}
                css={styles.bottomNavigation}
                showLabels
            >
                <BottomNavigationAction
                    label="OVERVIEW"
                    value={routes.overview.path}
                    icon={<BarChartIcon />}
                    css={styles.navigationAction}
                />
                <BottomNavigationAction
                    label="BUY & EARN"
                    value={routes.buyAndEarn.path}
                    icon={<LayersIcon />}
                    css={styles.navigationAction}
                />
                <BottomNavigationAction
                    label="POINTS"
                    value={routes.points.path}
                    icon={<StarIcon />}
                    css={styles.navigationAction}
                />
                <BottomNavigationAction
                    label="DASHBOARD"
                    value={routes.dashboard.path}
                    icon={<DashboardIcon />}
                    css={styles.navigationAction}
                />
            </BottomNavigation>
        </Paper>
    );
};

export default MobileNavigation;
