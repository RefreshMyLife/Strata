/** @jsxImportSource @emotion/react */
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { href } from 'react-router';
import { useTranslation } from 'translation';

import { ReactComponent as LogoNoText } from 'assets/img/StrataLogoPureV2.svg';
import { ReactComponent as LogoDesktop } from 'assets/img/StrataLogoWithTextV2.svg';
import { routes } from 'src/constants/routing';

import { Icon } from '../../Icon';
import ConnectButton from '../ConnectButton';
import {
    STRATA_DOCS_AUDITS_URL,
    STRATA_DOCS_FAQ_URL,
    STRATA_DOCS_URL,
    STRATA_MIRROR_URL,
} from '../Footer2/constants';
import { Toolbar } from '../Toolbar';
import Link from './Link';
import { useStyles } from './styles';
import useGetMenuItems from './useGetMenuItems';

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
    <svg
        width="7"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(270deg)' }}
        className={expanded ? 'expanded' : ''}
    >
        <path
            d="M3.62669 5.61333L0.426596 1.34666C0.0310436 0.819272 0.407347 0.0666504 1.06659 0.0666504H7.46659C8.12582 0.0666504 8.50213 0.819252 8.1066 1.34664L4.90669 5.61331C4.5867 6.03998 3.9467 6.03999 3.62669 5.61333Z"
            fill="white"
        />
    </svg>
);
export const SidebarUi: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const styles = useStyles();
    const menuItems = useGetMenuItems();

    // const menuItems = [
    //     { label: 'Documentation', href: STRATA_DOCS_URL, external: true },
    //     { label: 'Dashboard', href: routes.dashboard.path },
    //     { label: 'Audits', href: STRATA_DOCS_AUDITS_URL, external: true },
    //     { label: 'Blog', href: STRATA_MIRROR_URL, external: true },
    //     { label: 'FAQ', href: STRATA_DOCS_FAQ_URL, external: true },
    //     { label: 'Terms of Service', href: routes.terms.path, external: true },
    //     { label: 'Privacy Policy', href: routes.privacy.path, external: true },
    // ];
    const openMenu = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };
    const onLogoClicked = () => {
        location.hash = '#/';
    };

    return (
        <>
            {/* Mobile menu */}
            <div css={styles.mobileMenuBox}>
                <div css={styles.flexRow}>
                    <LogoDesktop css={styles.mobileLogo} onClick={onLogoClicked} />
                    {/* <LogoNoText onClick={onLogoClicked} /> */}
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            paddingRight: '8px',
                        }}
                    >
                        <ConnectButton
                            fullWidth
                            css={styles.mobileConnectButton}
                            text="Connect Wallet"
                        />
                    </div>
                    {/* <SelectChainButton cssButton={styles.mobileSelectChainButton} iconOnly={true} /> */}

                    <button type="button" onClick={openMenu} css={styles.actionButton}>
                        <Icon name="burger" css={styles.burger} />
                    </button>
                </div>

                <Menu
                    css={styles.mobileMenu}
                    className="mobile-menu"
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={closeMenu}
                    transitionDuration={0}
                    marginThreshold={0}
                    TransitionProps={{ style: { transition: 'background 0.2s linear' } }}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 0, left: 0 }}
                >
                    <div css={[styles.flexRow, styles.doublePadding]}>
                        <LogoDesktop css={styles.mobileLogo} onClick={onLogoClicked} />

                        {/* <SelectChainButton cssButton={styles.mobileSelectChainButton} chevron={true} /> */}
                        <div css={styles.rightMenu}>
                            {' '}
                            <ConnectButton fullWidth css={styles.mobileConnectButton} />
                            <button type="button" onClick={closeMenu} css={styles.actionButton}>
                                <Icon name="closeRounded" css={styles.burger} />
                            </button>
                        </div>
                    </div>

                    <List>
                        {menuItems.map(({ href, icon, i18nKey, isNew, isLive, withBadge }) => (
                            <ListItemButton
                                key={i18nKey}
                                component="li"
                                css={[styles.listItem, styles.mobileListItem]}
                                disableRipple
                            >
                                <Link onClick={closeMenu} href={href}>
                                    <div css={styles.mobileLabel}>
                                        <ListItemIcon css={styles.listItemIcon}>
                                            <Icon name={icon} />
                                        </ListItemIcon>

                                        <Typography
                                            variant="body2"
                                            component="span"
                                            css={[styles.listItemText, styles.mobileListItemText]}
                                        >
                                            {t(i18nKey)}
                                        </Typography>

                                        {isNew && (
                                            <div css={styles.listItemNewBadge}>
                                                <Typography
                                                    variant="tiny"
                                                    css={styles.listItemNewBadgeText}
                                                >
                                                    {t('sidebar.newBadge')}
                                                </Typography>
                                            </div>
                                        )}
                                        {isLive && (
                                            <div css={styles.listItemNewBadge}>
                                                <Typography
                                                    variant="tiny"
                                                    css={styles.listItemNewBadgeText}
                                                >
                                                    {t('sidebar.liveBadge')}
                                                </Typography>
                                            </div>
                                        )}
                                        {withBadge != null && (
                                            <div css={styles.listItemNewBadge}>
                                                <Typography
                                                    variant="tiny"
                                                    css={styles.listItemNewBadgeText}
                                                >
                                                    {withBadge}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>

                                    <ChevronIcon />
                                </Link>
                            </ListItemButton>
                        ))}
                        {/* {menuItems.map(({ href, label }) => (
                            <ListItemButton
                                component="li"
                                css={[styles.listItem, styles.mobileListItem]}
                                disableRipple
                            >
                                <Link onClick={closeMenu} href={href}>
                                    <div css={styles.mobileLabel}>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            css={[styles.listItemText, styles.mobileListItemText]}
                                        >
                                            {label}
                                        </Typography>
                                    </div>

                                    <ChevronIcon expanded={false} />
                                </Link>
                            </ListItemButton>
                        ))} */}
                    </List>
                </Menu>
            </div>
        </>
    );
};

export default SidebarUi;
