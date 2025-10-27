/** @jsxImportSource @emotion/react */
import { Interpolation, Theme } from '@emotion/react';
import Typography from '@mui/material/Typography';
import React, { ElementType } from 'react';
import { Token } from 'types';

import { TypographyVariant } from 'theme/MuiThemeProvider/muiTheme';

import { TokenIcon } from '../TokenIcon';
import { useStyles } from './styles';


export interface TokenIconWithSymbolProps {
  token: Token;
  className?: string;
  variant?: TypographyVariant;
  symbol?: string;
  labelCss?: Interpolation<Theme>;
}

export const TokenIconWithSymbol: React.FC<TokenIconWithSymbolProps> = ({
  className,
  token,
  symbol,
  variant,
  labelCss,
}) => {
  const styles = useStyles();

  return (
    <div className={className} css={styles.container}>
      <TokenIcon token={token} css={styles.icon} />

      <Typography component="span" variant={variant} css={labelCss}>
        {symbol ?? token.symbol}
      </Typography>
    </div>
  );
};
