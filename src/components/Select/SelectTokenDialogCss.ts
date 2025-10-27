import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useSelectTokenDialogCss = () => {
    const theme = useTheme();

    return {
        dialog: css`
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;

            background: rgba(11, 16, 23, 0.9);
            box-shadow:
                0px 5px 32.4px 9px rgba(0, 0, 0, 0.7),
                inset 0px -0.5px 1px rgba(255, 255, 255, 0.06),
                inset 0px 0.4px 1px rgba(255, 255, 255, 0.11);
            backdrop-filter: blur(12px);
            border-radius: 17px;
            z-index: 1000;

            ${theme.breakpoints.down('sm')} {
                position: fixed;
                top: auto;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60vh;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                display: flex;
                flex-direction: column;
            }
        `,
        searchContainer: css`
            padding: 0 ${theme.spacing(4)} ${theme.spacing(2)};
            margin-bottom: 0;
            position: relative;
        `,
        searchInput: css`
            .MuiInputBase-root {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: ${theme.palette.text.primary};
                font-size: 14px;

                &::before,
                &::after {
                    display: none;
                }

                .MuiInputBase-input {
                    padding: ${theme.spacing(3, 1.5)};
                    color: ${theme.palette.text.primary};

                    &::placeholder {
                        color: rgba(255, 255, 255, 0.5);
                        opacity: 1;
                    }
                }

                &:hover {
                    border-color: rgba(255, 255, 255, 0.2);
                }

                &.Mui-focused {
                    border-color: rgba(140, 187, 253, 0.5);
                    background: rgba(255, 255, 255, 0.08);
                }
            }
        `,
        searchIcon: css`
            color: rgba(255, 255, 255, 0.5);
        `,
        dialogBody: css`
            padding: ${theme.spacing(2)} 0;
            overflow-y: auto;
            flex: 1;
            max-height: 300px;

            ${theme.breakpoints.down('sm')} {
                max-height: none;
                flex: 1;
                overflow-y: auto;
            }
        `,
        dialogTokenIcon: css`
            margin-right: 1em;
        `,
        icon: css`
            height: 2.8em;
            width: auto;
        `,
        tokenItem: css`
            padding: 5px 1.5em;
            cursor: pointer;

            .token_explorer {
                display: none;
            }

            :hover {
                background: rgba(26, 34, 41, 1);

                .token_explorer {
                    display: block;
                }
                .token_name {
                    display: none;
                }
            }
        `,
        hint: css`
            color: var(--color-text-hint);

            .hint_link {
                color: var(--color-text-hint);
            }
        `,
        chipsContainer: css`
            padding: 0 ${theme.spacing(4)} ${theme.spacing(3)};
            margin: ${theme.spacing(3)} 0 ${theme.spacing(2)} 0;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: ${theme.spacing(4)};
                right: ${theme.spacing(4)};
                height: 1px;
                background: rgba(255, 255, 255, 0.08);
            }
        `,
        chip: css`
            width: 88px;
            height: 40px;
            padding: 6px 8px;
            background: rgba(26, 34, 41, 1);
            border-radius: 5px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            margin-bottom: 8px;

            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(255, 255, 255, 1);

            transition: all 0.2s ease;

            &:hover {
                background: rgba(36, 44, 51, 1);
                transform: translateY(-1px);
            }

            &:active {
                transform: translateY(0);
            }
        `,
        chipIcon: css`
            width: 20px;
            height: 20px;
            margin-right: 4px;
        `,
    };
};
