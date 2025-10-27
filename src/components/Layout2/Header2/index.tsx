/** @jsxImportSource @emotion/react */
import { List, ListItemButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import { TokenService } from 'src/services/TokenService';
import { useTranslation } from 'src/translation';

import { ReactComponent as LogoNoText } from 'assets/img/StrataLogoPureV2.svg';
import { ReactComponent as LogoDesktop } from 'assets/img/StrataLogoWithTextV2.svg';
import { AnchorButton, QuinaryButton } from 'src/components/Button';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { toast } from 'src/components/Toast';
import { routes } from 'src/constants/routing';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import ConnectButton, { ConnectButtonMenuUi } from '../ConnectButton';
import Link from '../Sidebar/Link';
import useGetMenuItems from '../Sidebar/useGetMenuItems';
import { Toolbar } from '../Toolbar';
import { useStyles } from './styles';

const TVLInfo: React.FC = () => {
    const { data, isLoading } = TokenService.useGetTvl();
    const formatted = isLoading ? '' : data ? `${BigNumberUtil.format(data)}` : '--,--';
    return (
        <AnchorButton
            style={{ height: 'auto' }}
            href="https://dune.com/stratamoney/seasonzero"
            variant="quinary"
        >
            {isLoading ? <SvgLoadingInlined /> : `TVL : $${formatted}`}
        </AnchorButton>
    );
};

const MenuButton: React.FC = () => {
    const { data, isLoading } = TokenService.useGetTvl();
    const formatted = isLoading ? '' : data ? `${BigNumberUtil.format(data)}` : '--,--';
    return (
        <AnchorButton style={{ height: 'auto' }} variant="quinary">
            {isLoading ? <SvgLoadingInlined /> : `L`}
        </AnchorButton>
    );
};

const Header2: React.FC = () => {
    const styles = useStyles();
    const menuItems = useGetMenuItems();
    const { t } = useTranslation();

    const onLogoClicked = () => {
        location.hash = `#${routes.overview.path}`;
    };

    return (
        <AppBar position="relative" css={styles.appBar}>
            <Toolbar css={styles.toolbarLogo}>
                <LogoDesktop css={styles.logo} onClick={onLogoClicked} />
                <LogoNoText css={styles.logoMobile} onClick={onLogoClicked} />
                {/* <img
                    src={testnetImage}
                    style={{width: '36px'}}
                  /> */}
            </Toolbar>

            <List css={styles.menu}>
                <ListItemButton css={[styles.menuItem]} component="li" disableRipple>
                    <Link href={routes.overview.path}>Overview</Link>
                </ListItemButton>
                <ListItemButton css={[styles.menuItem]} component="li" disableRipple>
                    <Link href={routes.buyAndEarn.path}>Buy and Earn</Link>
                </ListItemButton>
                <ListItemButton component="li" css={[styles.menuItem]} disableRipple>
                    <Link href={routes.points.path}>Points</Link>
                </ListItemButton>

                <ListItemButton component="li" css={[styles.menuItem]} disableRipple>
                    <Link href={routes.dashboard.path}>Dashboard</Link>
                </ListItemButton>

                <ListItemButton component="li" css={[styles.menuItem]} disableRipple>
                    <Link href="https://deposit.strata.money">
                        PRE-DEPOSITS
                        <span css={styles.menuItemBadge}>Ended</span>
                    </Link>
                </ListItemButton>
            </List>

            <Toolbar css={styles.toolbar}>
                {/* <Breadcrumbs /> */}

                <div css={styles.ctaContainer}>
                    {/* <SelectChainButton /> */}
                    {/* <ConnectSolanaButton /> */}
                    {/* <TVLInfo /> */}
                    <ConnectButton />
                    <ConnectButtonMenuUi />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header2;
