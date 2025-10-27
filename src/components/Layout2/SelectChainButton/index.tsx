/** @jsxImportSource @emotion/react */
import config from 'src/config';
import { ChainId, changeChainId } from 'src/packages/contracts';

import {
    Checkbox,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    SvgIcon,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'translation';

import { ReactComponent as LogoHardhat } from 'assets/img/chains/hardhat-logo.svg';
import SvgChevronLeft from 'src/components/Icon/icons/chevronLeft';

import { useAuth } from 'context/AuthContext';

import { Button, ButtonProps } from '../../Button';
import { useStyles } from './styles';
import { useSwitchNetwork } from 'wagmi';



export interface SelectChainButtonProps extends ButtonProps {
    accountAddress?: string;
    chevron?: boolean;
    iconOnly?: boolean;
    cssButton?: any

}

const Logos = {
    [ChainId.ETHEREUM_MAINNET]: LogoHardhat,
    [ChainId.ETHEREUM_TESTNET]: LogoHardhat,
    [ChainId.HARDAHAT]: LogoHardhat,
};

const Names = {
    [ChainId.ETHEREUM_MAINNET]: 'Mainnet',
    [ChainId.ETHEREUM_TESTNET]: 'Testnet',
    [ChainId.HARDAHAT]: `Hardhat`,
};

export const SelectChainButtonUi: React.FC<SelectChainButtonProps> = ({
    accountAddress,
    ...otherProps
}) => {

    const styles = useStyles();
    const { t } = useTranslation();
    const result = useSwitchNetwork();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showTestnets, setShowTestnets] = React.useState(false);

    const [SelectedLogo, setSelectedLogo] = React.useState(() => {
        return {
            chainId: config.chainId,
            Logo: Logos[config.chainId],
            name: Names[config.chainId],
        };
    });
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const menuClicked = (chainId: number) => {
        handleClose();
        if (result.switchNetworkAsync != null) {
            result
                .switchNetworkAsync(chainId)
                .then(x => changeChainId(chainId));
        } else {
            changeChainId(chainId);
        }


        setSelectedLogo({
            Logo: Logos[chainId],
            name: Names[chainId],
            chainId: chainId,
        });
    };
    const toggleShowTestnets = () => {
        setShowTestnets(!showTestnets);
    };

    return (
        <div css={styles.menu}>
            <Button
                css={[styles.button, otherProps.cssButton]}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                variant="tertiary"
            >
                <SvgIcon>
                    <SelectedLogo.Logo />
                </SvgIcon>
                { otherProps.iconOnly ? null : <span css={{ margin: '0 .7em' }}> { SelectedLogo.name }</span> }
                <SvgChevronLeft css={{ height: '1.2em', transform: 'rotate(-90deg)', color: '#444' }}/>

            </Button>
            <Menu
                css={styles.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem id='mainnet' onClick={() => menuClicked(ChainId.ETHEREUM_MAINNET)} disabled={SelectedLogo.chainId == ChainId.ETHEREUM_MAINNET }>
                    <LogoHardhat css={styles.menuLogo} /> Mainnet
                </MenuItem>
                <MenuItem id='testnet' onClick={() => menuClicked(ChainId.ETHEREUM_TESTNET)} disabled={SelectedLogo.chainId == ChainId.ETHEREUM_TESTNET }>
                    <LogoHardhat css={styles.menuLogo} /> Testnet
                </MenuItem>
            </Menu>
        </div>
    );
};

export const SelectChainButton: React.FC<ButtonProps> = props => {
    const { accountAddress, openAuthModal } = useAuth();
    return (
        <SelectChainButtonUi
            accountAddress={accountAddress}
            onClick={openAuthModal}
            variant={accountAddress ? 'secondary' : 'primary'}
            {...props}
        />
    );
};

export default SelectChainButton;
