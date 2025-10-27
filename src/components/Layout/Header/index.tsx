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

import ConnectButton from '../ConnectButton';
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

const Header: React.FC = () => {
    const styles = useStyles();
    const menuItems = useGetMenuItems();
    const { t } = useTranslation();

    const onLogoClicked = () => {
        location.hash = '#/';
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
                <ListItemButton
                    css={[styles.menuItem, styles.menuItemSelected]}
                    component="li"
                    to="/#predeposit"
                >
                    <Link href={routes.preDeposit.path}>Pre-Deposit</Link>
                </ListItemButton>
                <ListItemButton css={[styles.menuItem]} component="li" to="/#account">
                    <Link href={routes.account.path}>Portfolio</Link>
                </ListItemButton>
                {/* <ListItemButton
                    component="li"
                    css={[styles.menuItem]}
                    disableRipple
                    component="li"
                    to="/#points"
                >
                    <Link href={routes.points.path}>Points</Link>
                </ListItemButton> */}
            </List>

            <Toolbar css={styles.toolbar}>
                {/* <Breadcrumbs /> */}

                <div css={styles.ctaContainer}>
                    {/* <SelectChainButton /> */}
                    {/* <ConnectSolanaButton /> */}
                    <TVLInfo />
                    <ConnectButton />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
