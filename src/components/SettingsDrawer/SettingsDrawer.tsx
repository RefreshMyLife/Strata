/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Button, Icon } from 'components';

import { ReactComponent as PercentageIcon } from 'src/assets/img/icons/percentage.svg';
import { ReactComponent as InfoIcon } from 'src/assets/img/icons/info.svg';
import { ReactComponent as CloseIcon } from 'src/assets/img/icons/close.svg';
import { useStyles } from './styles';

export interface SettingsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isOpen,
    onClose,
}) => {
    const styles = useStyles();
    const [slippage, setSlippage] = useState('0.3');

    const handleSlippageChange = (value: string) => {
        setSlippage(value);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div css={styles.backdrop} onClick={onClose} />
            <div css={styles.dialog}>
                <div css={styles.dialogHeading}>
                    Transaction Settings
                    <Button css={styles.closeIcon} onClick={onClose}>
                        <CloseIcon css={styles.closeIconSvg} />
                    </Button>
                </div>
                <div css={styles.dialogHeadingBorder} />
                <div css={styles.dialogBody}>
                    <div css={styles.settingsContainer}>
                        <div css={styles.settingSection}>
                            <div css={styles.settingLabelContainer}>
                                <div css={styles.settingLabel}>Slippage</div>
                                <InfoIcon css={styles.infoIcon} />
                            </div>
                            <div css={styles.slippageContainer}>
                                {['0.3%', '0.5%', '1.0%'].map((value) => (
                                    <button
                                        key={value}
                                        css={[
                                            styles.slippageButton,
                                            (value === '0.3%' && slippage === '0.3') ||
                                                (value === '0.5%' && slippage === '0.5') ||
                                                (value === '1.0%' && slippage === '1.0')
                                                ? styles.slippageButtonActive : null
                                        ]}
                                        onClick={() => handleSlippageChange(value.replace('%', ''))}
                                    >
                                        {value}
                                    </button>
                                ))}
                                <div css={styles.customSlippageContainer}>
                                    <input
                                        css={styles.customSlippageInput}
                                        type="number"
                                        value={!['0.3', '0.5', '1.0'].includes(slippage) ? slippage : ''}
                                        onChange={(e) => handleSlippageChange(e.target.value)}
                                        placeholder="Custom"
                                    />
                                    <PercentageIcon />
                                </div>
                            </div>
                        </div>

                        <div css={styles.settingSection}>
                            <div css={styles.settingRow}>
                                <div css={styles.forceMiningLabelContainer}>
                                    <div css={styles.forceMiningLabel}>Force Mint/Redemption</div>
                                    <InfoIcon css={styles.infoIcon} />
                                </div>
                                <div css={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        id="forceMining"
                                        css={styles.toggleInput}
                                    />
                                    <label htmlFor="forceMining" css={styles.toggleLabel}></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};