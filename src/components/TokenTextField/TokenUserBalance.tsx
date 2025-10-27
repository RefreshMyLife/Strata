/** @jsxImportSource @emotion/react */
import React from 'react';
import { Token } from 'types';

import { OracleService } from 'src/services/OracleService';
import { useQuery } from '@tanstack/react-query';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { useGetBalanceOf } from 'src/clients/api';
import { useAuth } from 'src/context/AuthContext';
import { TokenService } from 'src/services/TokenService';
import SvgLoading, { SvgLoadingInlined } from '../Icon/icons/loading';
import { TokenPrice } from './TokenPrice';

export interface TokenPriceFieldProps {
    token: Token;
    label?: string
    className?: string
}

export const TokenUserBalance: React.FC<TokenPriceFieldProps> = ({
    token,
    label = 'Balance: ',
    className = 'hint',
}) => {
    let { accountAddress } = useAuth();
    let {isLoading, data: balance }  = TokenService.useGetBalance(token, accountAddress);

    if (!accountAddress) {
        return <span className={className}>{label}0.0000</span>;
    }
    let str = isLoading ? <SvgLoadingInlined /> : NumberUtil.format(balance, { fraction: 4 });

    //str = <SvgLoading css={{ height: '1.5em', verticalAlign: 'middle' }}/>
    return <span className={className}>{label}{str}</span>;
};


export const TokenUserBalancePrice: React.FC<TokenPriceFieldProps> = ({
    token,
    label = 'Balance: '
}) => {
    let { accountAddress } = useAuth();
    let {isLoading, data: balance }  = TokenService.useGetBalance(token, accountAddress);

    if (!accountAddress) {
        return <span>$0.00</span>;
    }
    let str = isLoading ? <SvgLoadingInlined /> : <TokenPrice token={token} amount={balance} />;
    return str;
};
