/** @jsxImportSource @emotion/react */
import { Select as MuiSelect } from '@mui/material';
import { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';
import { Token } from 'src/types';
import { useTranslation } from 'translation';

import { useIsSmDown } from 'hooks/responsive';

import { TextButton } from '../Button';
import { Icon } from '../Icon';
import { TokenIcon } from '../TokenIcon';
import { SELECTED_MENU_ITEM_CLASSNAME, useStyles } from './styles';

export interface SelectTokenOption {
    value: string | number;
    label: string;
}

export interface SelectTokenProps {
    token: Token;
    tokens: Token[];
    onChange?: (e: SelectChangeEvent<Token>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    ariaLabel?: string;
    className?: string;
    label?: string;
    placeLabelToLeft?: boolean;
    name?: string;
}

export const SelectToken: React.FC<SelectTokenProps> = ({
    className,
    tokens,
    token,
    onChange,
    onBlur,
    ariaLabel,
    label,
    placeLabelToLeft = false,
    name,
    onTokenSelected,
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const styles = useStyles();
    const isSmDown = useIsSmDown();
    const hasSelection = tokens.length > 1;

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        if (!hasSelection) {
            return;
        }
        setIsOpen(true);
    };

    const menuProps = useMemo(() => {
        const mobileStyles: Partial<MenuProps> = {
            transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            anchorReference: 'none',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        };
        return {
            PaperProps: {
                sx: styles.menuWrapper,
            },
            ...(isSmDown ? mobileStyles : {}),
        };
    }, [isSmDown]);

    return (
        <div className={className} css={styles.getContainer({ placeLabelToLeft })}>
            <MuiSelect<string>
                name={name}
                open={isOpen}
                onClose={handleClose}
                onOpen={handleOpen}
                css={styles.select({ isOpen, hasSelection })}
                value={token.address}
                onChange={onChange}
                onBlur={onBlur}
                displayEmpty
                inputProps={{ 'aria-label': ariaLabel }}
                IconComponent={() =>
                    hasSelection && (
                        <Icon css={styles.getArrowIcon({ isMenuOpened: isOpen })} name="arrowUp" />
                    )
                }
                MenuProps={menuProps}
                autoWidth={isSmDown}
            >
                <div css={styles.mobileHeader}>
                    <Typography variant="h4">{label || t('SelectToken.defaultLabel')}</Typography>
                    <TextButton css={styles.closeMenuButton} onClick={handleClose}>
                        <Icon name="closeRounded" />
                    </TextButton>
                </div>

                {tokens.map(token => (
                    <MenuItem
                        disableRipple
                        css={styles.menuItem}
                        key={token.address}
                        classes={{ selected: SELECTED_MENU_ITEM_CLASSNAME }}
                        value={token.address}
                    >
                        <TokenIcon token={token} />
                        &nbsp; {token.symbol}
                    </MenuItem>
                ))}
            </MuiSelect>
        </div>
    );
};
