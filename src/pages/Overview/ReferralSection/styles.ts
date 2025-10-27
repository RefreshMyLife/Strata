import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import ReferralBgBox from 'assets/img/background/referral_bg_box.png';
import ReferralBg from 'assets/img/background/refferal_background.png';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: (isConnected: boolean) => css`
            ${isConnected ? 'flex: 1;' : 'width: 100%;'}
            ${isConnected ? '' : 'max-width: 1304px; margin: 0 auto;'}
            min-height: ${isConnected ? '394px' : '106px'};
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            padding: 24px;
            ${isConnected ? '' : `margin-bottom: ${theme.spacing(5)};`}
            display: flex;
            ${isConnected ? 'justify-content: space-between;' : 'justify-content: space-between;'}
            align-items: center;
            flex-direction: ${isConnected ? 'column' : 'row'};
            background: ${isConnected
                ? `url(${ReferralBgBox}) no-repeat center center`
                : `url(${ReferralBg}) no-repeat center center`};
            background-size: cover;

            ${theme.breakpoints.down('sm')} {
                flex-direction: column;
                min-height: auto;
                align-items: stretch;
                padding: 20px;
                width: ${isConnected ? '100%' : '100%'};
                max-width: ${isConnected ? '100%' : '1304px'};
            }
        `,

        iconContainer: css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            margin-top: 40px;

            img {
                width: 90px;
                height: 90px;
                opacity: 1;
                border-radius: 225px;
            }
        `,

        content: (isConnected: boolean) => css`
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: ${isConnected ? 'center' : 'left'};
            flex: ${isConnected ? 'none' : '1'};
        `,

        title: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -0.32px;
            color: ${theme.palette.text.primary};
            margin: 0;
            margin-bottom: 8px;
            padding-top: 25px;
        `,

        subtitle: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0.15px;
            color: ${theme.palette.text.secondary};
            margin: 0;
        `,

        inviteButton: (isConnected: boolean) => css`
            width: ${isConnected ? '100%' : ''};
            height: ${isConnected ? '50px' : '40px'};
            padding: ${isConnected ? '14px 24px' : '10px 12px'};
            gap: ${isConnected ? '8px' : '4px'};
            opacity: 1;
            border-radius: 5px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset;
            border: none;
            font-family: 'Chakra Petch';
            font-weight: 600;
            font-size: 16px;
            line-height: 140%;
            text-align: center;
            color: rgba(0, 0, 0, 1);

            &:hover {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset;
                color: rgba(0, 0, 0, 1);
            }

            ${theme.breakpoints.down('sm')} {
                width: 100%;
            }
        `,
    };
};
