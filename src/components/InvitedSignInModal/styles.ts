import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = (backgroundImage?: string) => {
    const theme = useTheme();

    return {
        theme,
        // Custom modal styling to override the base modal
        modalOverride: css`
            .strata-modal {
                width: 400px !important;
                height: 444px !important;
                border-width: 1px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 20px !important;
                padding: 24px !important;
                background-image: url(${backgroundImage ||
                '/src/assets/img/background/earn_strata_points_bg.png'});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset !important;

                // Override the modal's default styling
                ::before {
                    display: none !important;
                }
            }

            .title_wrapper {
                padding: 0 !important;
                border-bottom: none !important;
                margin-bottom: 0 !important;
            }
        `,
        stepContainer: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;
            height: 100%;
            justify-content: center;
        `,
        strataIcon: css`
            width: 90px;
            height: 90px;
            margin-top: 30px;
            margin-bottom: 16px;
        `,
        title: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-style: normal;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            height: 52px;
            margin: 0;
        `,
        description: css`
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 16px;
            line-height: 150%;
            letter-spacing: 0px;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);
            margin: 0;
            max-width: 320px;
        `,
        inviteCodeContainer: css`
            background-color: rgba(255, 255, 255, 0.1);
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
        `,
        inviteCodeLabel: css`
            font-family: 'Chakra Petch', sans-serif;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            margin-right: 8px;
        `,
        inviteCodeValue: css`
            font-family: 'Chakra Petch', monospace;
            font-size: 14px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(255, 255, 255, 0.1);
            padding: 4px 8px;
            border-radius: 4px;
        `,
        connectButton: css`
            width: 352px;
            height: 50px;
            padding: 14px 24px;
            gap: 8px;
            border-radius: 5px;
            border: none;
            background: linear-gradient(90deg, #807cf4 0%, #3df0ed 100%);
            box-shadow:
                0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset,
                0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
                0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
                0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset;

            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 16px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            cursor: pointer;
            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;

            &:hover {
                transform: translateY(-1px);
                box-shadow:
                    0px 0px 12px 0px rgba(32, 175, 253, 0.15) inset,
                    0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
                    0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
                    0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset;
            }

            &:active {
                transform: translateY(0);
            }
        `,
        walletListContainer: css`
            padding: 0;
            width: 100%;

            // Override wallet list styling to fit the modal
            > div {
                margin: 0 !important;
                padding: 0 !important;
            }
        `,
        successIcon: css`
            width: 64px;
            height: 64px;
            background: linear-gradient(
                135deg,
                rgba(61, 240, 237, 0.9) 0%,
                rgba(128, 124, 244, 0.9) 100%
            );
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            color: white;
            margin-bottom: 16px;
        `,
        closeButton: css`
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            background: rgba(16, 23, 27, 1);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.8);
            font-size: 18px;
            font-weight: bold;
            backdrop-filter: blur(10px);
            transition: all 0.2s ease;

            &:hover {
                background: rgba(255, 255, 255, 0.15);
                color: rgba(255, 255, 255, 1);
                border-color: rgba(255, 255, 255, 0.3);
            }
        `,
    };
};
