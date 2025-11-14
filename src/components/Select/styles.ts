import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import imgMark from 'assets/img/mark.svg';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const SELECTED_MENU_ITEM_CLASSNAME = 'SELECTED_MENU_ITEM_CLASSNAME';
export const useStyles = () => {
    const theme = useTheme();

    return {
        backdrop: css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            backdrop-filter: blur(4px);
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 999;
            cursor: pointer;
        `,
        dialog: css`
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 520px;
            max-height: 80vh;
            overflow-x: hidden;
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

            animation: fadeIn 0.2s ease-out forwards;

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            ${theme.breakpoints.down('sm')} {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: auto;
                transform: none;
                max-height: fit-content;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;

                animation: slideUpFromBottom 0.2s ease-out forwards;

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
            }
        `,
        dialogHeading: css`
            position: relative;
            padding: ${theme.spacing(2)} ${theme.spacing(4)};
            height: 73px;
            display: flex;
            align-items: center;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
        `,

        closeIcon: css`
            right: ${theme.spacing(2)};
            top: 50%;
            margin-top: ${-12}px;
            position: absolute;
            height: 24px;
            width: 24px;
            margin-left: auto;
            min-width: 0;
            padding: 0;
            background-color: transparent;
            box-shadow: none;
            border: none;
            border-radius: 4px;

            &&&:hover:not(:disabled) {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
                background-image: none !important;
                box-shadow: none !important;
                border-color: transparent !important;
            }

            &&&:focus:not(:disabled) {
                background-color: rgba(255, 255, 255, 0.1) !important;
                outline: none;
                box-shadow: none !important;
                border-color: transparent !important;
            }

            &&&:active:not(:disabled) {
                background-color: rgba(255, 255, 255, 0.1) !important;
                box-shadow: none !important;
                border-color: transparent !important;
            }
        `,
        closeIconSize: 14,
        closeIconSvg: css`
            color: #e4dede;
        `,
        dialogHeadingBorder: css`
            height: 1px;
            background: rgba(255, 255, 255, 0.08);
            margin: 0 ${theme.spacing(4)};
        `,
        getContainer: ({ placeLabelToLeft }: { placeLabelToLeft: boolean }) => css`
            font-family: ${FONTS.heading};
            ${placeLabelToLeft &&
            css`
                display: inline-flex;
                align-items: center;
            `}
        `,
        getLabel: ({ placeLabelToLeft }: { placeLabelToLeft: boolean }) => css`
            ${placeLabelToLeft
                ? css`
                      flex-shrink: 0;
                      margin-right: ${theme.spacing(3)};
                  `
                : css`
                      margin-bottom: ${theme.spacing(1)};
                      label {
                          color: ${theme.palette.text.primary};
                      }
                  `}
        `,
        select: ({ isOpen, hasSelection }: { isOpen: boolean; hasSelection?: boolean }) => css`
            pointer-events: ${hasSelection ? 'auto' : 'none'};
            flex: 1;
            background: rgba(26, 34, 41, 1);
            height: 40px;
            gap: 4px;
            opacity: 1;
            border-radius: 9999px;
            padding: 10px 12px;
            width: 100%;
            font-size: ${theme.typography.small2.fontSize};
            font-weight: ${theme.typography.small2.fontWeight};
            font-family: ${FONTS.heading};
            position: relative;
            border: none;
            display: flex;
            align-items: center;

            &:hover:not(:disabled) {
                background: rgba(15, 43, 58, 1);
            }

            > .MuiSelect-select {
                display: flex;
                align-items: center;
            }
        `,
        getArrowIcon: ({ isMenuOpened }: { isMenuOpened: boolean }) => css`
            // position: absolute;
            right: ${theme.spacing(3)};
            height: 0.4em;
            transition: transform 0.3s;
            transform: rotate(${!isMenuOpened ? '0' : '180deg'});
            color: white;
        `,
        menuItem: css`
            display: flex;
            color: ${theme.palette.text.primary};
            font-size: ${theme.typography.small2.fontSize};
            font-weight: ${theme.typography.small2.fontWeight};
            font-family: ${FONTS.heading};

            &:active,
            &:hover,
            &:focus {
                background-color: ${theme.palette.secondary.light};

                ${theme.breakpoints.down('sm')} {
                    background-color: ${theme.palette.secondary.light};
                }
            }

            &.${SELECTED_MENU_ITEM_CLASSNAME} {
                background: transparent;
                pointer-events: none;
                &:active,
                &:hover,
                &:focus {
                    background: transparent;
                    cursor: default;
                }
                ${theme.breakpoints.down('sm')} {
                    background-color: ${theme.palette.secondary.light}!important;
                }

                /* check mark for selected item */
                &::after {
                    content: '';
                    background: url(${imgMark}) center right no-repeat;
                    background-size: contain;
                    width: 12px;
                    height: 8px;
                    width: 24px;
                }
            }
            ${theme.breakpoints.down('sm')} {
                padding-top: 0;
            }
        `,
        mobileHeader: css`
            display: none;

            ${theme.breakpoints.down('sm')} {
                padding: ${theme.spacing(6, 4)};
                display: flex;
                align-items: center;
                justify-content: center;
                position: sticky;
                top: 0;
                background-color: ${theme.palette.background.paper};
                z-index: 1;
                border-bottom: 1px solid ${theme.palette.secondary.light};
            }
        `,
        closeMenuButton: css`
            position: absolute;
            right: 0;
        `,

        /* styles passed as MenuProps are not recognized if we pass them as emotion SerializedStyles */
        menuWrapper: {
            backgroundColor: theme.palette.secondary.light,
            padding: 0,
            marginTop: theme.spacing(1),

            [theme.breakpoints.down('sm')]: {
                minWidth: 'calc(100vw)',
                height: '100%',
                backgroundColor: theme.palette.background.paper,
            },
        },
        label: css`
            margin-bottom: ${theme.spacing(1)};

            label {
                color: ${theme.palette.text.primary};
            }
        `,
    };
};
