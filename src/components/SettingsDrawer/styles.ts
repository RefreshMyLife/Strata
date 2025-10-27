import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
    const theme = useTheme();

    return {
        backdrop: css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            backdrop-filter: blur(4px);
            z-index: 999;
            border-radius: 20px;
            cursor: pointer;
        `,
        dialog: css`
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-height: fit-content;
            display: flex;
            flex-direction: column;

            background: rgba(12, 18, 21, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
                0px 0px 250px 44px rgba(24, 70, 87, 0.25),
                0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            backdrop-filter: blur(12px);
            border-radius: 17px;
            z-index: 1000;

            animation: slideUpFromBottom 0.3s ease-out forwards;

            @keyframes slideUpFromBottom {
                from {
                    transform: translateY(10%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `,
        dialogHeading: css`
            position: relative;
            padding: ${theme.spacing(2)} ${theme.spacing(6)};
            height: 73px;
            display: flex;
            align-items: center;
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 22px;
            leading-trim: NONE;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            border-bottom: none;
        `,
        dialogHeadingBorder: css`
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin: 0 ${theme.spacing(3)};
        `,
        closeIcon: css`
            right: ${theme.spacing(2)};
            top: 50%;
            margin-top: ${-20}px;
            position: absolute;
            height: 40px;
            width: 40px;
            margin-left: auto;
            min-width: 0;
            padding: 10px;
            background-color: transparent !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease;

            &:hover {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
                box-shadow: none !important;
            }

            &:active {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
            }

            &:focus {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
                outline: none;
            }
        `,
        closeIconSize: 14,
        closeIconSvg: css`
            color: #e4dede;
        `,
        dialogBody: css`
            padding: ${theme.spacing(2)} calc(${theme.spacing(3)} + 4px);
            display: flex;
            flex-direction: column;
        `,
        settingsContainer: css`
            padding: 8px 10px;
            display: flex;
            flex-direction: column;
            gap: 30px;
        `,
        settingSection: css`
            display: flex;
            flex-direction: column;
            gap: ${theme.spacing(1)};
        `,
        settingLabelContainer: css`
            display: flex;
            align-items: center;
            gap: 2px;
            margin-bottom: ${theme.spacing(1)};
        `,
        settingLabel: css`
            width: 69px;
            height: 28px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 28px;
            letter-spacing: 0%;
            color: #fff;
            text-transform: capitalize;
        `,
        infoIcon: css`
            width: 16px;
            height: 16px;
            opacity: 0.7;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        `,
        forceMiningLabelContainer: css`
            display: flex;
            align-items: center;
            gap: 4px;
            width: fit-content;
        `,
        forceMiningLabel: css`
            height: 28px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0%;
            color: rgba(249, 250, 251, 1);
            text-transform: capitalize;
            display: flex;
            align-items: center;
        `,
        slippageContainer: css`
            display: flex;
            gap: 8px;
            align-items: center;
            position: relative;
            height: 40px;
        `,
        slippageButton: css`
            width: 54px;
            height: 40px;
            border-radius: 6px;
            border: none;
            background: rgba(26, 34, 41, 1);
            color: rgba(255, 255, 255, 1);
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14.75px;
            line-height: 24px;
            letter-spacing: 0%;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                border: none;
                background: rgba(26, 34, 41, 1);
            }
        `,
        slippageButtonActive: css`
            width: 54px;
            height: 40px;
            border-radius: 6px;
            border: none;
            background: rgba(15, 43, 58, 1);
            color: rgba(32, 176, 253, 1);
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 700;
            font-size: 14.75px;
            line-height: 24px;
            letter-spacing: 0%;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                border: none;
                background: rgba(15, 43, 58, 1);
            }
        `,
        customSlippageContainer: css`
            width: 300px;
            height: 40px;
            border-radius: 6px;
            border: 1px solid rgba(27, 34, 41, 1);
            background: rgba(21, 25, 28, 1);
            display: flex;
            align-items: center;
            position: relative;
            padding: 0 8px;
        `,
        customSlippageInput: css`
            background: transparent;
            border: none;
            color: #98a2b3;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14.75px;
            line-height: 24px;
            letter-spacing: 0%;
            width: 100%;
            outline: none;
            padding: 0;

            &::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
        `,
        settingRow: css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        `,
        toggleSwitch: css`
            position: relative;
        `,
        toggleInput: css`
            opacity: 0;
            width: 0;
            height: 0;
        `,
        toggleLabel: css`
            display: inline-block;
            width: 58px;
            height: 33px;
            background: #1e272f;
            border-radius: 70px;
            box-shadow: 0px 1px 1px 0px rgba(34, 193, 237, 0.1) inset;
            position: relative;
            cursor: pointer;
            transition:
                background-color 0.3s ease,
                box-shadow 0.3s ease;

            &::before {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                width: 27px;
                height: 27px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 0px 6.3px 0px rgba(0, 0, 0, 0.5);
                border: none;
                border-radius: 50%;
                transition: transform 0.3s ease;
            }

            input:checked + & {
                background: rgba(32, 176, 253, 1);
                box-shadow: 0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset;
            }

            input:checked + &::before {
                transform: translateX(25px);
            }
        `,
    };
};
