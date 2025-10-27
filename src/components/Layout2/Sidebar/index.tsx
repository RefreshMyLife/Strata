/** @jsxImportSource @emotion/react */
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'translation';

import { Icon } from '../../Icon';
import ConnectButton from '../ConnectButton';
import { Toolbar } from '../Toolbar';
import Link from './Link';
import { useStyles } from './styles';
import useGetMenuItems from './useGetMenuItems';

export const SidebarUi: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const { t } = useTranslation();
    const styles = useStyles();
    const menuItems = useGetMenuItems();

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
                    <Icon name="logoMobile" css={styles.mobileLogo} onClick={onLogoClicked} />

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            paddingRight: '8px',
                        }}
                    >
                        <ConnectButton fullWidth css={styles.mobileConnectButton} text="Wallet" />
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
                        <Icon name="logoMobile" css={styles.mobileLogo} />

                        {/* <ConnectButton fullWidth css={styles.mobileConnectButton} /> */}
                        {/* <SelectChainButton cssButton={styles.mobileSelectChainButton} chevron={true} /> */}

                        <button type="button" onClick={closeMenu} css={styles.actionButton}>
                            <Icon name="closeRounded" css={styles.burger} />
                        </button>
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

                                    <Icon name="arrowRight" css={styles.mobileArrow} />
                                </Link>
                            </ListItemButton>
                        ))}
                    </List>
                </Menu>
            </div>
        </>
    );
};

export default SidebarUi;
