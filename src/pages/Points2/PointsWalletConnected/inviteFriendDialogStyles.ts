import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        dialogContent: css`
            padding: 12px !important;
            position: relative;

            ${theme.breakpoints.down('sm')} {
                padding: 24px !important;
                overflow-y: auto;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
        `,

        closeButton: css`
            position: absolute;
            top: 0px;
            right: 0px;
            width: 32px;
            height: 32px;
            background: rgba(16, 23, 27, 1);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s;
            color: rgba(144, 160, 172, 0.8);
            svg {
                fill: currentColor;
            }
        `,

        content: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;

            ${theme.breakpoints.down('sm')} {
                width: 100%;
            }
        `,

        iconContainer: css`
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
        `,

        title: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 24px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            margin: 0;
        `,

        description: css`
            font-family: Space Grotesk;
            font-weight: 400;
            font-style: Regular;
            font-size: 16px;
            leading-trim: NONE;
            line-height: 150%;
            letter-spacing: 0px;
            text-align: center;
        `,

        highlight: css`
            color: rgba(255, 255, 255, 1);
            font-weight: 500;
        `,

        linkContainer: css`
            display: flex;
            width: 100%;
            background: rgba(26, 34, 41, 1);
            border-radius: 5px;
            overflow: hidden;
        `,

        linkInput: css`
            flex: 1;
            background: transparent;
            border: none;
            padding: 12px 16px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            color: rgba(255, 255, 255, 1)
            outline: none;
        `,

        copyButton: css`
            background: rgba(26, 34, 41, 1);
            border: none;
            padding: 12px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
            color: white;

            svg {
                fill: currentColor;
            }
        `,

        toast: css`
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            animation: slideUp 0.3s ease-out;

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }

            ${theme.breakpoints.down('sm')} {
                bottom: auto;
                top: 20px;
                animation: slideDown 0.3s ease-out;

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            }
        `,

        toastContent: css`
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(12, 18, 21, 1);
            box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.25);
            border-radius: 12px;
            padding: 12px 16px;
            color: rgba(255, 255, 255, 1);
            font-family: 'Chakra Petch', sans-serif;
            font-style: Medium;
            font-weight: 500;
            font-size: 14px;
            line-height: 1;
            backdrop-filter: blur(8px);
            color: rgba(255, 255, 255, 1);
        `,
    };
};
