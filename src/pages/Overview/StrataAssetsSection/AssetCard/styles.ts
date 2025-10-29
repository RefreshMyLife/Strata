import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        card: css`
            flex: 1;
            min-height: 394px;
            border-radius: 20px;
            padding: 24px 24px 0 24px ;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            display: flex;
            flex-direction: column;

             

           
            & > *:not(:first-child) {
                margin-bottom: 24px; /* стандартный отступ */
            }

            & > *:first-child {
                margin-bottom: 10px; /* меньше для первого потомка */
            }

            ${theme.breakpoints.down('md')} {
                min-height: 350px;
                padding: 24px 24px 0 24px ;
                width:100%;
                
               
            }

        `,

        header: css`
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
        `,

        symbolSection: css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
        `,

        tokenIcon: css`
            width: 40px;
            height: 40px;
            color: ${theme.palette.primary.main};
        `,

        symbolTextContainer: css`
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
        `,

        symbol: css`
            width: 97px;
            height: 26px;
            gap: 2px;
            color: rgba(255, 255, 255, 1);
            font-weight: 600;
            display: flex;
            align-items: center;
        `,

        arrowIcon: css`
            width: 16px;
            height: 16px;
        `,

        subtext: css`
            width: 100%;
            height: 20px;
            opacity: 0.8;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.15px;
            color: rgba(144, 160, 172, 1);
        `,

        chipContainer: css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
            ${theme.breakpoints.down('sm')} {
                width:100%;
                flex-direction: column;
                align-items: flex-end;
                align-content: flex-end
        
            
        `,

        riskChip: css`
            height: 28px;
            border-radius: 4px;
            padding: 4px 6px;
            background: rgba(26, 34, 41, 1);
            border: none;

            .MuiChip-label {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 600;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 1);
                padding: 0 4px;
                white-space: nowrap;
                overflow: visible;
            }
        `,

        returnChip: css`
            height: 28px;
            border-radius: 4px;
            padding: 4px 6px;
            background: rgba(26, 34, 41, 1);
            border: none;

            .MuiChip-label {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 600;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 1);
                padding: 0 4px;
                white-space: nowrap;
                overflow: visible;
            }
        `,

        description: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.15px;
            color: rgba(255, 255, 255, 1);
            flex-grow: 1;
        `,

        metricsGrid: css`
            width: 100%;
            gap: 16px;
            display: flex;
            flex-wrap: wrap;
            //justify-content: space-between;
            justify-content: flex-start;

            ${theme.breakpoints.down('sm')} {
                column-gap: 8px;
                row-gap: 24px;
            }
        `,

        metric: css`
            flex: 1;
            gap: 2px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            flex: 0 0 30%;
        `,

        metricLabel: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.15px;
            color: rgba(144, 160, 172, 1);
            white-space: nowrap;
        `,

        metricValue: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 120%;
            letter-spacing: -0.32px;
            color: rgba(255, 255, 255, 1);
        `,

        button: css`
            width: 100%;
            height: 48px;
            border-radius: 5px;
            background: rgba(32, 176, 254, 1);
            border: none;
            margin-top: auto;

            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
                0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
                0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
                0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset,
                0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset,
                0px 0px 250px 44px rgba(24, 70, 87, 0.25);

            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(255, 255, 255, 1);

            &:hover {
                background: rgba(25, 160, 230, 1);
            }

            ${theme.breakpoints.down('sm')} {
                height: 44px;
                font-size: 14px;
            }
        `,
    };
};
