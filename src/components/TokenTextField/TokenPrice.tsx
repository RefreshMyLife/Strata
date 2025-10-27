/** @jsxImportSource @emotion/react */
import React from 'react';
import { Token } from 'types';

import { OracleService } from 'src/services/OracleService';
import { useQuery } from '@tanstack/react-query';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { Typography } from '@mui/material';
import { SvgLoadingInlined } from '../Icon/icons/loading';

export interface TokenPriceFieldProps {
    token: Token;
    amount: number | string;
    balance$?: number
    price$?: number
}

export const TokenPrice: React.FC<TokenPriceFieldProps> = ({ token, amount, balance$ }) => {
    amount ??= 0;
    let { data: price, isLoading } = useQuery({
        queryFn: () => OracleService.getPrice(token, amount),
        queryKey: ['oracle', token.address, amount],
        enabled: balance$ == null || amount === 0
    });
    if (balance$ != null) {
        isLoading = false;
        price = balance$;
    }

    let str = isLoading ? <SvgLoadingInlined />  : NumberUtil.format(price, { minFraction: 2});
    return <span className='hint'>${str}</span>;
};
