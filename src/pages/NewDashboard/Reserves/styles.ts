import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
      const theme = useTheme();
    return {
        container: css`
            display: flex;
            flex-direction: column;
            gap: 24px;
        `,

        chartsRow: css`
            display: flex;
            gap: 24px;
            margin-bottom: 24px;
            @media (max-width: 940px){
               flex-direction: column;
            }
        `,

        chart: css`
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 12px;
            overflow: hidden;
            padding: 24px 32px 20px 32px;
             ${theme.breakpoints.down('sm')} {
                 padding: 20px 10px 20px 10px;
            }
            .chart-header {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .chart-title {
                    font-family: 'Chakra Petch', sans-serif;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 140%;
                    letter-spacing: 0%;
                    color: rgba(144, 160, 172, 0.8);
                    margin: 0;
                }
            }

            .chart-value {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 22px;
                line-height: 120%;
                letter-spacing: -1%;
                color: rgba(255, 255, 255, 1);
                margin-bottom: 40px;
            }
        `,

        dropdownButton: css`
            min-width: 80px;
            height: 28px;
            padding: 4px 8px;
            gap: 4px;
            border-radius: 5px;
            background: rgba(26, 34, 41, 1);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            overflow: hidden;

            span {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 0.8);
                text-overflow: ellipsis;
                overflow: hidden;
                flex: 1;
                text-align: left;
            }

            &:hover {
                background: rgba(32, 42, 49, 1);
            }
        `,

        dropdownMenu: {
            mt: 1,
            background: 'rgba(12, 18, 21, 1)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '5px',
            boxShadow: '0px 10px 40px 0px rgba(0, 0, 0, 0.25)',
            padding: '5px 1px',
            gap: '2px',
            fontFamily: 'Chakra Petch',
            minWidth: '80px',
            '& .MuiMenuItem-root': {
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '140%',
                color: 'rgba(144, 160, 172, 0.8)',
                height: '28px',
                padding: '4px 8px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    background: 'rgba(26, 34, 41, 1)',
                },
            },
        },

        chevronIcon: css`
            width: 6px;
            height: 4px;
            margin-left: 4px;
        `,

        tableContainer: css`
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 12px;
            overflow: hidden;
        `,

        tableHeader: css`
            display: grid;
            grid-template-columns: 250px 150px 300px 200px;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 16px 20px;

            .asset-column,
            .apy-column,
            .value-column,
            .share-column {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 0.8);
            }

            .asset-column {
                justify-self: start;
            }

            .apy-column,
            .value-column {
                justify-self: center;
            }
            .share-column {
                justify-self: end;
            }
        `,

        tableRow: css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 16px 20px;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);

            &:last-child {
                border-bottom: none;
            }

            .asset-column {
                display: flex;
                align-items: center;
                gap: 12px;
                justify-self: start;

                span {
                    font-family: 'Chakra Petch', sans-serif;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 125%;
                    letter-spacing: 0px;
                    text-align: left;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .apy-column,
            .value-column,
            .share-column {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                color: rgba(255, 255, 255, 1);
                justify-self: center;
            }
            .share-column {
                justify-self: end;
            }
        `,

        tokenIcon: css`
            width: 24px;
            height: 24px;
        `,

        apyHeaderContainer: css`
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 30px;
        `,

        apyMetricsRow: css`
            display: flex;
            gap: 140px;
             @media (max-width: 1240px) {
                gap:60px;
            }
            ${theme.breakpoints.down('sm')} {
                gap:15px
            }
        `,

        apyMetricBoxWhite: css`
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding-left: 8px;
            border-left: 2px solid rgba(255, 255, 255, 1);
        `,

        apyMetricBoxPurple: css`
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding-left: 8px;
            border-left: 2px solid rgba(141, 103, 255, 1);
        `,

        apyLabel: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
            @media(max-width:400px){
              font-size: 12px;
            }
        `,

        apyValue: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 125%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
        `,
    };
};
