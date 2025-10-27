/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { Token } from 'types';

import { ButtonProps, TertiaryButton } from '../Button';
import { TextField, TextFieldProps } from '../TextField';
import { TokenIcon } from '../TokenIcon';
import { Select } from '../Select';
import { SelectTokenButton, SelectTokenDialog } from '../Select/SelectTokenV2';
import { useStyles } from './TokenTextFieldCss';
import { Box } from '@mui/material';
import { TokenPrice } from './TokenPrice';
import { TokenUserBalance } from './TokenUserBalance';
import { TokenService } from 'src/services/TokenService';
import { useAuth } from 'src/context/AuthContext';
import { NumberUtil } from 'src/utilities/NumberUtilt';

export interface RightMaxButton extends Omit<ButtonProps, 'variant' | 'children' | 'small'> {
  label: string;
}

// Note: although we display all the values in tokens (equivalent of ether for
// the given token) to the user, the underlying values (maxWei, value) are
// expressed in wei to make them easier to use with contracts
export interface TokenTextFieldProps
  extends Omit<TextFieldProps, 'onChange' | 'value' | 'max' | 'min'> {
  token: Token;
  value: string;
  onChange: (newValue: string) => void;
  onTokenSelected?: (token: Token) => void;
  rightMaxButton?: RightMaxButton;
  tokens?: Token[];
  displayTokenIcon?: boolean;
  max?: string;
  min?: string;
  label?: string
  isLoading?: boolean;
  showPercentButtons?: boolean;
  tokenSelectModalProps?: {
    showTokenSelectModal: boolean;
    setShowTokenSelectModal: (show: boolean) => void;
    tokenSelectData: any;
    setTokenSelectData: (data: any) => void;
  };

}

export const TokenTextField: React.FC<TokenTextFieldProps> = ({
  token,
  value,
  rightMaxButton,
  tokens,
  onChange,
  onTokenSelected,
  disabled,
  max,
  min,
  label,
  isLoading,
  displayTokenIcon = true,
  showPercentButtons = true,
  tokenSelectModalProps,
  ...otherProps
}) => {


  const styles = useStyles();
  const { accountAddress } = useAuth();
  const { data: userBalance } = TokenService.useGetBalance(token, accountAddress)
  //const [amountEther, setAmountEther] = useState(Number(otherProps.value ?? 0));
  //console.log(`TokenTextField`, otherProps.value, amountEther, Number(otherProps.value ?? 0));
  let amountEther = Number(value ?? 0);

  // const step = React.useMemo(() => {
  //   const tmpOneTokenInWei = new BigNumber(10).pow(token.decimals);
  //   const tmpOneWeiInTokens = new BigNumber(1).dividedBy(tmpOneTokenInWei);

  //   return tmpOneWeiInTokens.toFixed();
  // }, [token.decimals]);
  const step = '0.00000000001'



  const handleChange: TextFieldProps['onChange'] = ({ currentTarget: { value } }) => {
    // Forbid values with more decimals than the token provided supports
    const valueDecimals = value.includes('.') ? value.split('.')[1].length : 0;

    if (valueDecimals <= token.decimals) {
      //setAmountEther(valueDecimals);
      onChange(value);
    }
  };

  const onPercentsPicked = (percent: number) => {
    if (userBalance == null) {
      return;
    }
    //const newValue = (amountEther * (percent / 100)).toFixed();

    const newValue = NumberUtil.round(userBalance * percent / 100, 6, 'floor');
    onChange(String(newValue));
  };

  return (<>
    <div css={styles.container}>
      <TextField
        placeholder="0"
        min={min ?? 0}
        max={max}
        step={step}
        //onInput={handleChange}
        onChange={handleChange}
        onPercentsPicked={onPercentsPicked}
        showPercentButtons={showPercentButtons}
        disablePercentButtons={showPercentButtons && !accountAddress}
        isLoading={isLoading}

        type="number"
        label={label}
        cssInput={styles.input}
        isTransparent
        leftIconSrc={displayTokenIcon && tokens == null ? token : undefined}
        rightAdornment={
          rightMaxButton ? (
            <TertiaryButton disabled={disabled} {...rightMaxButton}>
              {rightMaxButton.label}
            </TertiaryButton>
          ) : (tokens != null ?

            <SelectTokenButton
              token={token}
              tokens={tokens}
              onTokenSelected={onTokenSelected}
              tokenSelectModalProps={tokenSelectModalProps}
            />
            : undefined)
        }
        value={value}
        disabled={disabled}
        {...otherProps}
      />
      <div css={styles.amounts}>
        <div><TokenPrice token={token} amount={amountEther} /> </div>
        <div><TokenUserBalance token={token} /></div>
      </div>
    </div>

  </>
  );
};
