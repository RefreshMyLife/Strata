/** @jsxImportSource @emotion/react */
import { InputAdornment, Select as MuiSelect, TextField } from '@mui/material';
import { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Token } from 'src/types';
import { truncateAddress } from 'src/utilities';
import { useTranslation } from 'translation';

import jrUSDeIcon from 'assets/img/tokens/jrUSDe.svg';
import srUSDeIcon from 'assets/img/tokens/srUSDe.svg';
import { useIsSmDown } from 'hooks/responsive';
import { TOKENS } from 'src/constants/tokens';
import { useLayout } from 'src/theme/useLayout';

import { Button, QuinaryButton, TextButton } from '../Button';
import { Icon } from '../Icon';
import { ScanLink } from '../ScanLink';
import { TokenIcon } from '../TokenIcon';
import { TokenPrice } from '../TokenTextField/TokenPrice';
import { TokenUserBalance, TokenUserBalancePrice } from '../TokenTextField/TokenUserBalance';
import { useSelectTokenDialogCss } from './SelectTokenDialogCss';
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
    onTokenSelected: (t: Token) => void;
    tokenSelectModalProps?: {
        showTokenSelectModal: boolean;
        setShowTokenSelectModal: (show: boolean) => void;
        tokenSelectData: any;
        setTokenSelectData: (data: any) => void;
    };
}

export const SelectTokenButton: React.FC<SelectTokenProps> = ({
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
    tokenSelectModalProps,
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isTokenSelectOpened, setTokenSelectOpened] = useState(false);
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

    const handleTokenSelectClose = () => {
        setTokenSelectOpened(false);
    };
    const onTokenSelectedInner = (token: Token) => {
        handleTokenSelectClose();
        onTokenSelected(token);
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
        <>
            <div className={className} css={styles.getContainer({ placeLabelToLeft })}>
                <QuinaryButton
                    css={styles.select({ isOpen, hasSelection: hasSelection })}
                    onClick={() => {
                        if (tokenSelectModalProps) {
                            tokenSelectModalProps.setTokenSelectData({
                                tokens,
                                selectedToken: token,
                                onTokenSelected,
                            });
                            tokenSelectModalProps.setShowTokenSelectModal(true);
                        } else {
                            setTokenSelectOpened(true);
                        }
                    }}
                >
                    <TokenIcon token={token} />
                    &nbsp; {token.symbol}
                    {hasSelection && (
                        <>
                            &nbsp;{' '}
                            <Icon
                                css={styles.getArrowIcon({ isMenuOpened: isOpen })}
                                name="arrowUp"
                            />
                        </>
                    )}
                </QuinaryButton>
            </div>
            <>
                <TokenSelectionSimple
                    token={token}
                    tokens={tokens}
                    onTokenSelected={onTokenSelectedInner}
                    isOpen={isTokenSelectOpened}
                    handleClose={handleTokenSelectClose}
                />
            </>
        </>
    );
};

// Define the main tokens to display outside component to avoid dependency issues
const MAIN_DEPOSIT_TOKENS = [
    // TOKENS.usdc,
    // TOKENS.usdt,
    TOKENS.usde,
    TOKENS.susde,
    TOKENS.pusde,
];

export const TokenSelection1: React.FC<any> = ({
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
    isOpen,
    handleClose,
}) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const styles = useStyles();
    const dialogCss = useSelectTokenDialogCss();
    const l = useLayout();
    const isSmDown = useIsSmDown();
    const hasSelection = tokens.length > 1;

    const filteredTokens = useMemo(() => {
        const tokensToFilter = tokens;
        if (!searchQuery) return tokensToFilter;
        return tokensToFilter.filter(
            (t: Token) =>
                t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.address.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [tokens, searchQuery]);

    const tokenSymbols = tokens.map(t => t.symbol);
    const favoriteTokens = MAIN_DEPOSIT_TOKENS.filter(x => {
        return tokenSymbols.includes(x.symbol);
    });

    const handleDialogClose = () => {
        setSearchQuery('');
        handleClose();
    };

    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                handleDialogClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup on unmount or when closed
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleDialogClose]);

    if (!hasSelection) {
        return null;
    }

    return (
        <>
            {isOpen && (
                <>
                    <div css={styles.backdrop} />
                    <div css={styles.dialog} ref={dialogRef}>
                        <div css={styles.dialogHeading}>
                            Select a token
                            <Button css={styles.closeIcon} onClick={handleDialogClose}>
                                <Icon
                                    name="close"
                                    size={`${styles.closeIconSize}`}
                                    css={styles.closeIconSvg}
                                />
                            </Button>
                        </div>
                        <div css={dialogCss.searchContainer}>
                            <TextField
                                fullWidth
                                placeholder="Search tokens by name or address"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Icon
                                                name="magnifier"
                                                size="16"
                                                css={dialogCss.searchIcon}
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                                css={dialogCss.searchInput}
                            />
                        </div>
                        <div css={dialogCss.chipsContainer}>
                            {favoriteTokens.map(token => (
                                <button
                                    key={token.symbol}
                                    css={dialogCss.chip}
                                    onClick={() => onTokenSelected(token)}
                                >
                                    <TokenIcon token={token} css={dialogCss.chipIcon} />
                                    {token.symbol}
                                </button>
                            ))}
                        </div>
                        <div css={dialogCss.dialogBody}>
                            <div>
                                {filteredTokens.map((t: Token) => (
                                    <div
                                        key={t.address}
                                        css={styles.menuItem}
                                        onClick={() => onTokenSelected(t)}
                                    >
                                        <div css={[l.row, dialogCss.tokenItem]}>
                                            <TokenIcon
                                                token={t}
                                                css={dialogCss.dialogTokenIcon}
                                                iconCss={dialogCss.icon}
                                            />
                                            <div css={l.rowCellFull}>
                                                <div>{t.symbol}</div>
                                                <div css={dialogCss.hint}>
                                                    <div className="token_name">{t.symbol}</div>
                                                    <div className="token_explorer">
                                                        <ScanLink
                                                            urlType="address"
                                                            hash={t.address}
                                                            text={truncateAddress(t.address)}
                                                            className="hint_link"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div css={l.textRight}>
                                                    <TokenUserBalance
                                                        token={t}
                                                        label=""
                                                        className=""
                                                    />
                                                </div>
                                                <div css={[dialogCss.hint, l.textRight]}>
                                                    <TokenUserBalancePrice token={t} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

// Simple token dialog without search input (for pUSDe button)
export const TokenSelectionSimple: React.FC<any> = ({
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
    isOpen,
    handleClose,
}) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const dialogCss = useSelectTokenDialogCss();
    const l = useLayout();
    const isSmDown = useIsSmDown();

    const filteredTokens = tokens;

    const handleDialogClose = () => {
        handleClose();
    };

    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                handleDialogClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup on unmount or when closed
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleDialogClose]);

    return (
        <>
            {isOpen && (
                <>
                    <div css={styles.backdrop} />
                    <div css={styles.dialog} ref={dialogRef}>
                        <div css={styles.dialogHeading}>
                            Select a token
                            <Button css={styles.closeIcon} onClick={handleDialogClose}>
                                <Icon
                                    name="close"
                                    size={`${styles.closeIconSize}`}
                                    css={styles.closeIconSvg}
                                />
                            </Button>
                        </div>
                        <div css={styles.dialogHeadingBorder} />
                        <div css={dialogCss.dialogBody}>
                            <div>
                                {filteredTokens.map((t: Token) => (
                                    <div
                                        key={t.address}
                                        css={styles.menuItem}
                                        onClick={() => onTokenSelected(t)}
                                    >
                                        <div css={[l.row, dialogCss.tokenItem]}>
                                            <TokenIcon
                                                token={t}
                                                css={dialogCss.dialogTokenIcon}
                                                iconCss={dialogCss.icon}
                                            />
                                            <div css={l.rowCellFull}>
                                                <div>{t.symbol}</div>
                                                <div css={dialogCss.hint}>
                                                    <div className="token_name">{t.symbol}</div>
                                                    <div className="token_explorer">
                                                        <ScanLink
                                                            urlType="address"
                                                            hash={t.address}
                                                            text={truncateAddress(t.address)}
                                                            className="hint_link"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div css={l.textRight}>
                                                    <TokenUserBalance
                                                        token={t}
                                                        label=""
                                                        className=""
                                                    />
                                                </div>
                                                <div css={[dialogCss.hint, l.textRight]}>
                                                    <TokenUserBalancePrice token={t} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

// Smart dialog selector that chooses the right dialog based on token type
export const SelectDialogV2: React.FC<any> = ({ token, ...props }) => {
    if (token?.symbol === 'jrUSDe' || token?.symbol === 'srUSDe') {
        return <TokenSelectionSimple token={token} {...props} />;
    }
    return <TokenSelection1 token={token} {...props} />;
};

export const SelectTokenDialog = TokenSelection1;
