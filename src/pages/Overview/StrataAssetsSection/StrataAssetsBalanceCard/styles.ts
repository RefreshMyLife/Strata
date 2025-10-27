import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        card: css`
            flex: 1;
            min-height: 394px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            padding: 24px;
            display: flex;
            flex-direction: column;
            background: rgba(4, 8, 10, 1);
            backdrop-filter: blur(10px);

            ${theme.breakpoints.down('md')} {
                min-height: 350px;
                padding: 20px;
                width: 100%;
            }
        `,
        

        header: css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        `,

        title: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
        `,

        viewHistoryButton: css`
            width: 119px;
            height: 40px;
            padding: 10px 12px;
            gap: 4px;
            border-radius: 5px;
            background: rgba(26, 34, 41, 1);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;

            &:hover {
                background: rgba(36, 44, 51, 1);
            }
        `,

        viewHistoryText: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);
        `,

        chevronIcon: css`
            width: 5px;
            height: 6px;
            margin-left: 4px;
        `,

        balance: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 32px;

            ${theme.breakpoints.down('md')} {
                font-size: 28px;
            }
        `,

        tokensList: css`
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-top: 30px;
            margin-bottom: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 24px;
        `,

        tokenItem: css`
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:not(:first-child) {
                margin-top: 24px;
            }
        `,

        tokenInfo: css`
            display: flex;
            align-items: center;
            gap: 12px;
        `,

        tokenIcon: css`
            width: 32px;
            height: 32px;
            border-radius: 50%;
        `,

        tokenDetails: css`
            display: flex;
            flex-direction: column;
            gap: 2px;
        `,

        tokenSymbol: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            gap: 4px;
        `,

        tokenName: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        tokenBalances: css`
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 2px;
        `,

        tokenAmount: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);
        `,

        tokenValue: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        infoIcon: css`
            width: 14px;
            height: 14px;
        `,

        buyButton: css`
            width: 100%;
            height: 50px;
            padding: 14px 24px;
            gap: 8px;
            background: rgba(32, 176, 253, 1);
            border: none;
            border-radius: 5px;

            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(255, 255, 255, 1);

            display: flex;
            align-items: center;
            justify-content: center;

            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
                0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
                0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
                0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset,
                0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset;

            &:hover {
                background: rgba(28, 154, 221, 1);
            }
        `,
    };
};
