/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import { FormikTokenTextField } from 'src/components/Form/FormikTokenTextField';

import { useStyles } from './TokenSelectPanelCss';
import { Token } from 'src/types';

type ActiveModal = 'stake' | 'withdraw';

export interface TokenSelectPanelUiProps {
    token: Token;
    tokens: Token[];
    label: string;
    showPercentButtons: boolean;
    disabled: boolean;
    readonly?: boolean;
    onTokenSelected?;
    onInput?;
    value?;
    name?: string;
}

export type TokenSelectPanelProps = Omit<
    TokenSelectPanelUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

export const TokenSelectPanel: React.FC<TokenSelectPanelProps> = ({
    token,
    tokens,
    disabled,
    readonly,
    label,
    showPercentButtons,
    onTokenSelected,
    onInput,
    value,
    name,
}) => {
    const styles = useStyles();

    return (
        <div css={styles.panelSection}>
            <FormikTokenTextField
                label={label}
                name={name ?? "amount"}
                token={token}
                tokens={tokens}
                value={value}
                showPercentButtons={showPercentButtons}

                onTokenSelected = { onTokenSelected }
                onAmountSelected = { onInput }
                disabled={disabled}
                readOnly={readonly}
                css={styles.tokenTextField}
            />
        </div>
    );
};
