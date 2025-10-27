import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
    const theme = useTheme();
    return {
        content: css`
            max-width: 1000px;
            margin: 0 auto;
            padding: ${theme.spacing(4)};
            font-size: 16px;
            font-family: ${FONTS.space};
            line-height: 1.6;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;

            h1 {
                color: ${theme.palette.text.primary};
                margin-bottom: 0.5rem;
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 600;
                font-size: 32px;
            }

            p {
                color: ${theme.palette.text.secondary};
                line-height: 1.6;
                margin-bottom: 1rem;
            }

            hr {
                margin: 2rem 0;
                height: 0;
                border: none;
                border-top: 1px solid ${theme.palette.divider};
            }

            table {
                margin: 2rem 0;
                border: 1px solid ${theme.palette.divider};
                width: 100%;
                border-radius: 8px;
                overflow: hidden;

                thead {
                    background: ${theme.palette.action.hover};
                }
            }

            td,
            th {
                border: 1px solid ${theme.palette.divider};
                padding: 1rem;
                color: ${theme.palette.text.primary};
            }

            h3 {
                margin: 2rem 0 1rem 0;
                color: ${theme.palette.text.primary};
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 600;
                font-size: 24px;
            }

            h4 {
                margin: 1.5rem 0 1rem 0;
                color: ${theme.palette.text.primary};
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 600;
                font-size: 20px;
            }

            ul {
                margin: 1rem 0;
                padding-left: 2rem;

                li {
                    margin: 0.5rem 0;
                    color: ${theme.palette.text.secondary};
                }
            }

            a {
                color: ${theme.palette.primary.main};
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }

            strong {
                color: ${theme.palette.text.primary};
                font-weight: 600;
            }

            em {
                color: ${theme.palette.text.disabled};
                font-style: italic;
            }
        `,
        backButton: css`
            width: 71px;
            height: 40px;
            padding: 10px 12px;
            gap: 4px;
            border-radius: 5px;
            background: rgba(26, 34, 41, 1);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            margin-bottom: 20px;
            will-change: background, transform;
            transform: translateZ(0);

            &:hover {
                background: rgba(36, 44, 51, 1);
                transform: translateZ(0) scale(1.02);
            }

            &:active {
                transform: translateZ(0) scale(0.98);
                transition: all 0.1s ease;
            }
        `,
        backIcon: css`
            width: 5px;
            height: 6px;
            margin-right: 4px;
        `,
        backText: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);
        `,
        closeButton: css`
            position: absolute;
            top: 38px;
            right: 18px;
        `,
        docs: css`
            max-width: 1000px;
            margin: 0 auto;
            font-size: 16px;
            font-family: ${FONTS.space};
            background: ${theme.palette.background.paper};
            padding: 2em 2.5em;
            margin-bottom: 2em;
            position: relative;

            p {
                color: ${theme.palette.text.secondary};
            }
            hr {
                margin: 2em 0;
                height: 0;
                border: none;
                border-top: 1px solid ${theme.palette.divider};
            }

            table {
                margin: 2em 0;
                border: 1px solid ${theme.palette.divider};
                thead {
                    background: ${theme.palette.action.hover};
                }
            }
            td,
            th {
                border: 1px solid ${theme.palette.divider};
                padding: 0.8em;
                color: ${theme.palette.text.primary};
            }

            h3 {
                margin: 1em 0;
                color: ${theme.palette.text.primary};
            }
        `,
    };
};
