import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            width: 100%;
            ${theme.breakpoints.down('md')} {
                padding: 20px;
            }
            margin-bottom: 24px;
        `,

        header: css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 24px;
        `,

        backButton: css`
            width: 71px;
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

        backIcon: css`
            width: 5px;
            height: 6px;
            margin-right: 4px;
        `,

        backText: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);
        `,

        title: css`
            width: 109px;
            height: 38px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: -1%;
            vertical-align: middle;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
        `,

        boxesContainer: css`
            display: flex;
            flex-direction: column;
            gap: 24px;
            flex: 1;
        `,

        historyBox: css`
            width: 100%;
            gap: 24px;
            opacity: 1;
            border-width: 1px;
            padding: 24px;
            border-radius: 20px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            overflow-y: auto;
        `,

        monthSection: css`
            display: flex;
            flex-direction: column;
            gap: 12px;
        `,

        monthItems: css`
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin: 0;
            padding: 0;
        `,

        monthTitle: css`
            width: 46px;
            height: 20px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 100%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 0.92);
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0;
        `,

        historyItem: css`
            width: 100%;
            height: auto;
            opacity: 1;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            gap: 12px;
            align-items: center;
            padding: 12px 0;
            &:last-child {
                padding-bottom: 6px;
            }

            ${theme.breakpoints.down('lg')} {
              grid-template-columns: 1fr 1fr 1fr 1fr;
            }

            ${theme.breakpoints.down('md')} {
               grid-template-columns: 1fr 1fr 1fr;
            }

            ${theme.breakpoints.down('sm')} {
               grid-template-columns: 1fr 1fr;
            }

        `,

        clickable: css`
            cursor: pointer;
            :active {
                transform: translateY(1px);
            }
        `,

        itemLeft: css`
            height: 40px;
            opacity: 1;
            display: flex;
            align-items: center;
            gap: 12px;
        `,

        tokenIcon: css`
            width: 40px;
            height: 40px;
            opacity: 1;
            border-radius: 50%;
        `,

        itemDetails: css`
            display: flex;
            flex-direction: column;
            gap: 2px;
        `,

        itemAction: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        itemToken: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
        `,

        itemColumn: css`
            display: flex;
            flex-direction: column;
            gap: 2px;

            &:nth-of-type(5) {
                ${theme.breakpoints.down('lg')} {
                    display: none;
                }
            }

            &:nth-of-type(4) {
                ${theme.breakpoints.down('md')} {
                    display: none;
                }
            }

            &:nth-of-type(3) {
                ${theme.breakpoints.down('sm')} {
                    display: none;
                }
            }
            ${theme.breakpoints.down('sm')} {
                align-items: flex-end;
            }
        `,

        itemInfo: css`
            display: flex;
            flex-direction: column;
            gap: 2px;
        `,

        itemDate: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        itemDateValue: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(255, 255, 255, 1);
        `,

        itemLabel: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        itemValue: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(255, 255, 255, 1);
        `,

        itemStatus: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(59, 239, 128, 1);
        `,

        itemStatusPending: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(235, 194, 48, 1);
        `,

        itemStatusFailed: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(234, 81, 29, 1);
        `,

        itemStatusClaim: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(32, 176, 253, 1);
        `,

        itemAmount: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: left;
            color: rgba(255, 255, 255, 1);
        `,

        itemAmountUSDC: css`
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,
    };
};
