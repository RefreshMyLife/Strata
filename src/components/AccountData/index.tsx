/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'translation';
import { TokenAction } from 'types';


import { Delimiter } from '../Delimiter';
import { useStyles } from './styles';

export interface AccountDataProps {
  action: TokenAction;
  amountTokens: BigNumber;
  isUsingSwap?: boolean;
}

export const AccountData: React.FC<AccountDataProps> = ({
  action,
  amountTokens,
  isUsingSwap = false,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();



  return (
    <>

      <Delimiter css={styles.getRow({ isLast: true })} />


    </>
  );
};
