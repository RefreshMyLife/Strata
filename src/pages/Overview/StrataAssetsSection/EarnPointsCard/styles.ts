import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import EarnPointsBg from 'assets/img/background/earn_strata_points_bg.png';

export const useStyles = () => {
    const theme = useTheme();

    return {
        card: css`
            flex: 1;
            //min-height: 394px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            justify-content: flex-end;
            align-items: center;
            padding: 24px;
            display: flex;
            flex-direction: column;
            background: url(${EarnPointsBg}) no-repeat center center;
            background-size: cover;
            
            ${theme.breakpoints.down('md')} {
                width: 100%;
                padding: 20px;
            }
        `,

        content: css`
            // width: 373.33px;
            // height: 149px;
            gap: 16px;
            opacity: 1;
            padding-bottom: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            justify-content: space-between;

            ${theme.breakpoints.down('lg')} {
                width: 100%;
                height: auto;
            }
        `,

        iconContainer: css`
            width: 373.33px;
            height: 149px;
            gap: 10px;
            opacity: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            //padding: 40px;
            padding-top: 12%;
            padding-bottom: 8%;

            &.points {
                padding-top: 0;
                padding-bottom: 25%;
            }

            ${theme.breakpoints.down('lg')} {
                width: 100%;
                height: auto;
                padding: 10px;
            }
        `,

        icon: css`
            width: 90px;
            height: 90px;
            color: white;
        `,

        title: css`
            width: 373.33px;
            height: 26px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -0.32px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            margin-top: 20px;

            ${theme.breakpoints.down('lg')} {
                width: 100%;
            }
        `,

        description: css`
            width: 373.33px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.15px;
            text-align: center;
            color: rgba(255, 255, 255, 1);

            ${theme.breakpoints.down('lg')} {
                width: 100%;
            }
        `,

        button: css`
            width: 373.33px;
            height: 48px;
            opacity: 0.8;
            background: linear-gradient(90deg, #27eefc 0%, #5d28fb 100%);
            border: none;
            border-radius: 4px;

            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
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
                0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset,
                0px 0px 250px 44px rgba(24, 70, 87, 0.25);

            &:hover {
                background: linear-gradient(90deg, #20d5e3 0%, #4a1fe8 100%);
            }

            ${theme.breakpoints.down('lg')} {
                width: 100%;
            }
        `,

        connectedContent: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex: 1;
            gap: 16px;
        `,

        connectedTitle: css`
            height: 26px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            margin-top: 30px;
        `,

        statsContainer: css`
            width: 373.33px;
            height: 46px;
            padding-top: 2px;
            padding-bottom: 2px;
            display: flex;
            justify-content: space-between;
            gap: 16px;

            ${theme.breakpoints.down('lg')} {
                width: 100%;
            }
        `,

        statItem: css`
            width: 178.67px;
            height: 42px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;

            ${theme.breakpoints.down('lg')} {
                width: auto;
                flex: 1;
            }
        `,

        statValue: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
        `,

        statLabel: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);
        `,
    };
};
