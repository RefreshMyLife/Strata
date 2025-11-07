/** @jsxImportSource @emotion/react */
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import config from 'src/config';
import { useAuthModal } from 'src/libs/wallet';
import { useTranslation } from 'translation';
import { generateBlockchainScanUrl, truncateAddress } from 'utilities';
import { useDisconnect } from 'wagmi';

import { ReactComponent as CheveronDown } from 'assets/img/icons/chevron-down.svg';
import img_discord from 'assets/img/icons/discord.svg';
import img_gitbook from 'assets/img/icons/gitbook.svg';
import img_github from 'assets/img/icons/github.svg';
import img_metamask from 'assets/img/icons/metamask.svg';
import img_notion from 'assets/img/icons/notion.svg';
import img_twitter from 'assets/img/icons/twitter.svg';
import { useAuth } from 'context/AuthContext';
import SvgBurger from 'src/components/Icon/icons/burger';
import { SvgWallet2 } from 'src/components/Icon/icons/wallet';
import { routes } from 'src/constants/routing';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';

import { Button, ButtonProps, PrimaryButton } from '../../Button';
import {
    STRATA_DISCORD_URL,
    STRATA_DOCS_AUDITS_URL,
    STRATA_DOCS_FAQ_URL,
    STRATA_DOCS_URL,
    STRATA_GITBOOK_URL,
    STRATA_GITHUB_URL,
    STRATA_MEDIUM_URL,
    STRATA_MIRROR_URL,
    STRATA_PREDEPOSIT_URL,
    STRATA_TWITTER_URL,
} from '../Footer2/constants';
import { useStyles } from './styles';

export interface ConnectButtonProps extends ButtonProps {
    accountAddress?: string;
    accountNs?: string;
    text?: string;
}

export const ConnectButtonUi: React.FC<ConnectButtonProps> = ({
    accountAddress,
    accountNs,
    ...otherProps
}) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { disconnectAsync } = useDisconnect();
    const isMenuOpen = Boolean(anchorEl);
    const copy = useCopyToClipboard('Account address');

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (accountAddress) {
            setAnchorEl(event.currentTarget);
        } else {
            otherProps.onClick?.(event);
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleCopyAddress = () => {
        copy(accountAddress);
        handleMenuClose();
    };
    const handleOpenEtherscan = () => {
        const url = generateBlockchainScanUrl({
            hash: accountAddress,
            urlType: 'address',
            chainId: config.chainId,
        });
        window.open(url, '_blank');
        handleMenuClose();
    };

    const handleDisconnect = async () => {
        try {
            await disconnectAsync();
            handleMenuClose();
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    const menuItems = [
        { label: 'Documentation', href: STRATA_DOCS_URL, external: true },
        { label: 'Dashboard', href: routes.dashboard.path },
        { label: 'Audits', href: STRATA_DOCS_AUDITS_URL, external: true },
        { label: 'Blog', href: STRATA_MIRROR_URL, external: true },
        { label: 'FAQ', href: STRATA_DOCS_FAQ_URL, external: true },
    ];

    const socialLinks = [
        { icon: img_gitbook, href: STRATA_DOCS_URL, alt: 'Docs' },
        { icon: img_twitter, href: STRATA_TWITTER_URL, alt: 'Twitter' },
        { icon: img_discord, href: STRATA_DISCORD_URL, alt: 'Discord' },
        { icon: img_github, href: STRATA_GITHUB_URL, alt: 'GitHub' },
        { icon: img_notion, href: STRATA_MIRROR_URL, alt: 'Mirror' },
    ];

    if (accountAddress) {
        return (
            <>
                <Button
                    css={styles.connectedButton}
                    aria-label="account of current user"
                    aria-controls={isMenuOpen ? 'wallet-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                    color="inherit"
                    onClick={handleMenuOpen}
                    variant={accountAddress ? 'quinary' : 'quaternary'}
                >
                    <SvgWallet2 />
                    <span css={styles.walletAddressSpan}>
                        {accountNs || truncateAddress(accountAddress)}
                    </span>
                    <CheveronDown
                        css={[
                            styles.chevronButton,
                            { transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)' },
                        ]}
                    />
                </Button>
                <Menu
                    id="wallet-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    slotProps={{
                        paper: {
                            sx: styles.dropdown,
                        },
                    }}
                >
                    {/* {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                if (item.external) {
                  window.open(item.href, '_blank');
                } else {
                  window.location.hash = item.href;
                }
                handleMenuClose();
              }}
            >
              <span>{item.label}</span>
              <CheveronDown />
            </MenuItem>
          ))} */}

                    <MenuItem onClick={handleCopyAddress}>Copy Address</MenuItem>
                    <MenuItem onClick={handleOpenEtherscan}>Open on Etherscan</MenuItem>

                    {/* Disconnect Wallet */}
                    <MenuItem onClick={handleDisconnect} sx={styles.disconnectMenuItem}>
                        Disconnect Wallet
                    </MenuItem>
                </Menu>
            </>
        );
    }

    return (
        <PrimaryButton css={[styles.button, styles.notConnected]} {...otherProps}>
            {!accountAddress
                ? (otherProps?.text ?? t('connectButton.title'))
                : truncateAddress(accountAddress)}
        </PrimaryButton>
    );
};

export const ConnectButtonMenuUi: React.FC<ConnectButtonProps> = ({
    accountAddress,
    accountNs,
    ...otherProps
}) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { disconnectAsync } = useDisconnect();
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDisconnect = async () => {
        try {
            await disconnectAsync();
            handleMenuClose();
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    const menuItems = [
        { label: 'Documentation', href: STRATA_DOCS_URL, external: true },
        { label: 'Dashboard', href: routes.dashboard.path },
        { label: 'Audits', href: STRATA_DOCS_AUDITS_URL, external: true },
        { label: 'Blog', href: STRATA_MIRROR_URL, external: true },
        { label: 'FAQ', href: STRATA_DOCS_FAQ_URL, external: true },
    ];

    const socialLinks = [
        { icon: img_gitbook, href: STRATA_DOCS_URL, alt: 'Docs' },
        { icon: img_twitter, href: STRATA_TWITTER_URL, alt: 'Twitter' },
        { icon: img_discord, href: STRATA_DISCORD_URL, alt: 'Discord' },
        { icon: img_github, href: STRATA_GITHUB_URL, alt: 'GitHub' },
        { icon: img_notion, href: STRATA_MIRROR_URL, alt: 'Mirror' },
    ];

    return (
        <>
            <IconButton
                aria-label="menu of docs"
                aria-controls={isMenuOpen ? 'burger-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? 'true' : undefined}
                color="inherit"
                onClick={handleMenuOpen}
                css={styles.menuButton}
            >
                <SvgBurger css={[styles.menuButtonIcon]} />
            </IconButton>

            <Menu
                id="burger-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: styles.dropdown,
                    },
                }}
            >
                <MenuItem
                    css={styles.preDepositsLink}
                    onClick={() => {
                        window.open(STRATA_PREDEPOSIT_URL, '_blank');
                        handleMenuClose();
                    }}
                >
                    <span>Pre-desopits</span>
                    <CheveronDown />
                </MenuItem>
                {menuItems.map(item => (
                    <MenuItem
                        key={item.label}
                        onClick={() => {
                            if (item.external) {
                                window.open(item.href, '_blank');
                            } else {
                                window.location.hash = item.href;
                            }
                            handleMenuClose();
                        }}
                    >
                        <span>{item.label}</span>
                        <CheveronDown />
                    </MenuItem>
                ))}

                {/* Social Media Links Row */}
                <MenuItem sx={styles.socialMenuItem}>
                    {socialLinks.map((social, index) => (
                        <img
                            key={index}
                            src={social.icon}
                            alt={social.alt}
                            css={styles.socialIcon}
                            onClick={e => {
                                e.stopPropagation();
                                window.open(social.href, '_blank');
                                handleMenuClose();
                            }}
                        />
                    ))}
                </MenuItem>
            </Menu>
        </>
    );
};

export const ConnectButton: React.FC<ButtonProps> = props => {
    const { openAuthModal } = useAuthModal();
    const { accountAddress } = useAuth();

    return (
        <ConnectButtonUi
            accountAddress={accountAddress}
            onClick={openAuthModal}
            variant={accountAddress ? 'primary' : 'quinary'}
            {...props}
        />
    );
};

export default ConnectButton;
