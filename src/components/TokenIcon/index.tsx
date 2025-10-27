/** @jsxImportSource @emotion/react */
import React from 'react';
import { Token } from 'types';

import { useStyles } from './styles';

export interface TokenIconProps {
  token: Token;
  className?: string;
  iconCss?: any
}

export const TokenIcon: React.FC<TokenIconProps> = ({ className, token, iconCss }) => {
  const styles = useStyles();

  return <img src={token.asset} css={[styles.icon, iconCss]} alt={token.symbol} className={className} />;
};
