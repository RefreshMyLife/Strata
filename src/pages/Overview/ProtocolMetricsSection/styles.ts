import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            width: 100%;
            max-width: 1304px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 24px;
            opacity: 1;
            margin-bottom: 20px;
        `,

        header: css`
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            opacity: 1;
        `,

        title: css`
            height: 38px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
            display: flex;
            align-items: center;

            ${theme.breakpoints.down('md')} {
                font-size: 24px;
                width: auto;
            }
        `,

        viewDashboardButton: css`
            width: 142px;
            height: 40px;
            background: rgba(26, 34, 41, 1);
            border-radius: 5px;
            border: none;
            padding: 10px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            opacity: 1;
            cursor: pointer;

            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);

            &:hover {
                background: rgba(32, 42, 51, 1);
            }

            ${theme.breakpoints.down('md')} {
                width: auto;
                padding: 8px 10px;
                font-size: 12px;
            }
        `,

        buttonContent: css`
            height: 20px;
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            white-space: nowrap;

            ${theme.breakpoints.down('md')} {
                width: auto;
            }
        `,

        metricsContainer: css`
            width: 100%;
            height: 280px;
            display: flex;
            gap: 20px;
            opacity: 1;

            ${theme.breakpoints.down('xl')} {
                flex-wrap: wrap;
                height: auto;
            }

            ${theme.breakpoints.down('md')} {
                flex-direction: column;
                gap: 16px;
            }
        `,

        metricBox: css`
            height: 280px;
            flex: 1;
            max-width: 420px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            padding: 24px;
            gap: 24px;
            opacity: 1;
            background: rgba(4, 8, 10, 1);
            display: flex;
            flex-direction: column;

            ${theme.breakpoints.down('xl')} {
                flex: 1;
                min-width: 300px;
                max-width: none;
            }

            ${theme.breakpoints.down('md')} {
                width: 100%;
                height: auto;
                min-height: 200px;
                padding: 24px;
            }
        `,

        metricHeader: css`
            height: 46px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
            gap: 24px;
            padding-left: 12px;
            border-left: 1px solid rgba(255, 255, 255, 1);
            opacity: 1;
        `,

        metricInfo: css`
            display: flex;
            flex-direction: column;
            gap: 4px;
        `,

        metricTitle: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
            margin-bottom: 4px;
        `,

        metricPeriod: css`
            height: 28px;
            gap: 4px;
            border-radius: 5px;
            padding: 4px 8px;
            background: rgba(26, 34, 41, 1);
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
        `,

        metricValue: css`
            height: 26px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            opacity: 1;
        `,
    };
};
