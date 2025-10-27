import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { head } from 'lodash';

export const useStyles = () => {
    const theme = useTheme();

    return {
        logo: css`
            height: 1.4em;
            opacity: 0.8;
        `,
        head: css`
            font-size: 14px;
            line-height: 1;
            color: rgba(236, 236, 236, 1);
        `,
        right: css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 28px;
             ${theme.breakpoints.down('lg')} {
                small {
                display: none;
                }
            }
            ${theme.breakpoints.down('md')} {
                display: flex;
                gap: 26px;
                justify-items: center;
            }
        `,
        group: css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2em;
            color: rgba(229, 229, 229, 0.5);
            font-size: 14px;
            line-height: 1;
             ${theme.breakpoints.down('lg')} {
                font-size: 1em;
            }
            ${theme.breakpoints.down('md')} {
                gap: 1.5em;
                font-size: 12px;
            }
        `,
        container: css`
            height: ${theme.shape.footerHeight};
            padding: 0 34px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 0.9em;

            ${theme.breakpoints.down('lg')} {
                padding: 0 ${theme.spacing(6)};
            }

            ${theme.breakpoints.down('md')} {
                flex-direction: column;
                padding: 24px ${theme.spacing(4)};
                gap: 24px;
                height: auto;
                justify-content: center;
            }

            @media (max-width: 940px) {
                margin-top: 15px;
                padding-bottom: 160px;
            }
            ${theme.breakpoints.down('md')} {
                margin-top: 0px;
                padding-top:10px
            }
        `,
        blockInfo: css`
            white-space: nowrap;
            ${theme.breakpoints.down('md')} {
                flex: 1;
            }
        `,
        blockInfoMobileLineBreak: css`
            display: none;

            ${theme.breakpoints.down('md')} {
                display: block;
            }
        `,
        blockInfoNumber: css`
            color: ${theme.palette.text.primary};
        `,
        links: css`
            color: ${theme.palette.text.primary};
            display: flex;
            margin-left: ${theme.spacing(2)};

            white-space: nowrap;

            ${theme.breakpoints.down('md')} {
                margin-left: 0;
            }
        `,
        link: css`
            background-color: transparent;
            transition: background-color 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            line-height: 1;

            color: white;

            white-space: nowrap;

            :hover {
                color: white;
            }

            :active {
                background-color: ${theme.palette.button.dark};
                color: white;
            }
        `,

        badge: css`
            width: 100%;
            a {
                color: white;
                text-decoration: underline;

                &:hover {
                    border-bottom: 1px solid var(--color-lavender);
                }
            }
        `,
        theme,
    };
};
