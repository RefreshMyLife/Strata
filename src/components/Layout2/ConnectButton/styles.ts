import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        connectedButton: css`
            height: auto;
            //width: 157px;
            background: transparent;
            border: none;

            & span {
                height: 20px;
                font-family: 'Chakra Petch';
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                text-align: center;
                color: rgba(144, 160, 172, 0.8);
                letter-spacing: 0%;

                ${theme.breakpoints.down('md')} {
                    font-size: 14px;
                }
            }
        `,
        button: css`
            width: 122px !important;
            height: 40px !important;
            border-radius: 5px !important;
            padding: 10px 12px !important;
            background: rgba(255, 255, 255, 1) !important;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset !important;
            gap: 4px;
            font-family: 'Chakra Petch' !important;
            font-weight: 500 !important;
            font-size: 14px !important;
            line-height: 140% !important;
            text-align: center !important;
            color: rgba(0, 0, 0, 1) !important;
            border: none !important;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            ${theme.breakpoints.down('md')} {
                width: 100px !important;
                height: 36px !important;
                padding: 8px 10px !important;
                font-size: 12px !important;
            }

            &:hover {
                width: 122px !important;
                height: 40px !important;
                border-radius: 5px !important;
                padding: 10px 12px !important;
                background: rgba(255, 255, 255, 1) !important;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset !important;
                color: rgba(0, 0, 0, 1) !important;
                opacity: 1 !important;
                transform: none !important;

                ${theme.breakpoints.down('md')} {
                    width: 100px !important;
                    height: 36px !important;
                    padding: 8px 10px !important;
                }
            }

            &:focus {
                width: 122px !important;
                height: 40px !important;
                border-radius: 5px !important;
                padding: 10px 12px !important;
                background: rgba(255, 255, 255, 1) !important;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset !important;
                color: rgba(0, 0, 0, 1) !important;
                opacity: 1 !important;
                transform: none !important;

                ${theme.breakpoints.down('md')} {
                    width: 100px !important;
                    height: 36px !important;
                    padding: 8px 10px !important;
                }
            }

            &:active {
                width: 122px !important;
                height: 40px !important;
                border-radius: 5px !important;
                padding: 10px 12px !important;
                background: rgba(255, 255, 255, 1) !important;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset !important;
                color: rgba(0, 0, 0, 1) !important;
                opacity: 1 !important;
                transform: none !important;

                ${theme.breakpoints.down('md')} {
                    width: 100px !important;
                    height: 36px !important;
                    padding: 8px 10px !important;
                }
            }
        `,
        notConnected: css`
            width: 122;
            height: 40;
            gap: 4px;
            angle: 0 deg;
            opacity: 1;
            border-radius: 5px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset;
            border: none;
            font-family: 'Chakra Petch';
            font-weight: 500;
            font-size: 14px;
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
        dropdown: {
            width: '157px',
            mt: 1,
            background: 'rgba(12, 18, 21, 1)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '5px',
            boxShadow: '0px 10px 40px 0px rgba(0, 0, 0, 0.25)',
            padding: '5px 1px',
            gap: '2px',
            fontFamily: 'Chakra Petch',
            '& .MuiMenuItem-root': {
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '140%',
                color: 'rgba(255, 255, 255, 1)',
                width: '155px',
                //height: '28px',
                //padding: '4px 12px',
                padding: '10px 10px 10px 10px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                '&:hover': {
                    background: 'rgba(26, 34, 41, 1)',
                },
            },
            '& .MuiDivider-root': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                margin: '2px 0',
            },
        },
        socialMenuItem: {
            justifyContent: 'center !important',
            gap: '12px !important',
            '&:hover': {
                background: 'rgba(26, 34, 41, 1) !important',
            },
        },
        disconnectMenuItem: {
            color: 'rgba(234, 81, 29, 1) !important',
            //height: '32px !important',

            //justifyContent: 'center !important',
            '&:hover': {
                background: 'rgba(26, 34, 41, 1) !important',
            },
        },
        socialIcon: css`
            width: 16px;
            height: 16px;
            cursor: pointer;
        `,
        chevronIcon: css`
            margin-left: auto;
        `,
        walletAddressSpan: css`
            margin: 0 0.5em;
        `,
        chevronButton: css`
            width: 8px;
            height: 10px;
            color: currentColor;
            transition: transform 0.2s ease;
        `,
        menuButton: css`
            border-radius: 5px;
            :hover {
                background: rgba(109, 134, 164, .13);
            }
        `,
        menuButtonIcon: css`
            width: 20px;
            height: 20px;

            :active {
                transform: translateY(1px);
            }

            ${theme.breakpoints.down('md')} {
                width: 16px;
                height: 16px;
            }
        `
    };
};
