import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        flex: css`
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 7px;
        `,
        left: css``,
        right: css`
            justify-items: end;
            margin-bottom: 10px;
        `,
        disabled: css`
            pointer-events: none;
            opacity: 0.5;
        `,
        getLabel: ({ hasError, isTransparent }: { hasError: boolean; isTransparent: boolean }) => css`
            display: block;
            margin-bottom: ${theme.spacing(1)};
            color: ${hasError ? theme.palette.error.main : 'rgba(144, 160, 172, 0.5)'};
            padding: ${isTransparent ? '0 3px' : undefined};
            font-family: 'Chakra Petch', monospace;
            font-weight: 500;
            font-style: normal;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            width: 33px;
            opacity: 1;
        `,
        getInputContainer: ({
            hasError,
            disabled,
            variant,
            isSmall,
            isTransparent,
        }: {
            hasError: boolean;
            disabled: boolean | undefined;
            variant: 'primary' | 'secondary';
            isSmall: boolean;
            isTransparent: boolean;
        }) => {
            let borderColor = theme.palette.secondary.light;
            let backgroundColor =
                variant === 'primary'
                    ? theme.palette.background.default
                    : theme.palette.background.paper;

            if (hasError) {
                borderColor = theme.palette.interactive.error;
            }

            if (disabled) {
                borderColor = theme.palette.secondary.light;
                backgroundColor =
                    variant === 'primary'
                        ? theme.palette.background.paper
                        : theme.palette.secondary.light;
            }

            return css`
                display: flex;
                align-items: center;
                padding: ${isSmall ? theme.spacing(1, 2, 1, 4) : theme.spacing(2, 2, 2, 4)};
                border-radius: ${theme.spacing(isSmall ? 2 : 3)};
                border: 1px solid ${borderColor};
                transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                background-color: ${backgroundColor};
                position: relative;

                ${isSmall &&
                css`
                    height: ${theme.spacing(10)};
                `}

                ${!disabled &&
                css`
                    &:hover {
                        border-color: ${theme.palette.text.secondary};
                    }
                `}

        &:focus-within {
                    border-color: ${hasError
                        ? theme.palette.interactive.error
                        : theme.palette.interactive.primary};
                }

                ${isTransparent &&
                css`
                    background-color: transparent;
                    border: 0;
                    padding: 0;
                `};
            `;
        },
        getLeftIcon: ({ isSmall }: { isSmall: boolean }) => css`
            margin-right: ${theme.spacing(2)};
            margin-top: 0;
            width: ${theme.spacing(isSmall ? 5 : 6)};
            height: ${theme.spacing(isSmall ? 5 : 6)};
        `,
        getInput: ({
            hasRightAdornment,
            isSmall,
        }: {
            hasRightAdornment: boolean;
            isSmall: boolean;
        }) => css`
            background-color: transparent;
            flex: 1;
            font-weight: 600;
            line-height: ${theme.spacing(6)};
            /* padding-top: 2px; Vertically align input content */
            border: 0;
            width: 100%;
            height: ${theme.spacing(isSmall ? 6 : 10)};
            color: white !important;
            transition: opacity 100ms ease-in;

            ::placeholder {
                /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: ${theme.palette.text.secondary};
                opacity: 1; /* Firefox */
            }

            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: ${theme.palette.text.secondary};
            }

            ::-ms-input-placeholder {
                /* Microsoft Edge */
                color: ${theme.palette.text.secondary};
            }

            ${isSmall &&
            css`
                font-size: ${theme.typography.small2.fontSize};
            `}

            ${hasRightAdornment &&
            css`
                margin-right: ${theme.spacing(1)};
            `};

            &:focus {
                outline: 0;
            }

            &:disabled {
                color: white !important;
            }

            &.is-loading {
                opacity: 0;
            }
        `,
        rightButton: css`
            margin-right: ${theme.spacing(2)};
        `,
        description: css`
            display: block;
            color: ${theme.palette.text.secondary};
            margin-top: ${theme.spacing(1)};
        `,
        buttonsContainer: css`
            button {
                font-weight: 100 !important;
            }
        `,
        svgLoading: css`
            position: absolute;
            top: -3px;
            left: -8px;
            //transform: translateY(-50%);
            height: ${theme.spacing(12)};
        `
    };
};
