import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const styles = () => {
    const theme = useTheme();

    return {
        container: css`
            position: relative;
            width: calc(100% + 80px);
            max-width: none;
            min-height: 680px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 0;
            margin: -20px 0 0 0;
            transform: translateX(-40px);

            @media (min-width: 768px) {
                width: calc(100vw - 40px);
                left: 50%;
                transform: translateX(-50%);
                margin-left: 0;
                margin-right: 0;
            }

            @media (min-width: 1024px) {
                width: calc(100vw - 60px);
            }

            @media (min-width: 1440px) {
                width: calc(100vw - 80px);
            }

            @media (min-width: 1920px) {
                min-height: 850px;
            }
        `,

        content: css`
            padding: 40px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;

            @media (min-width: 768px) {
                padding-left: 33px;
                padding-right: 33px;
            }

            @media (min-width: 1920px) {
                padding-left: 250px;
                padding-right: 270px;
            }
        `,

        cornerTopLeft: css`
            position: absolute;
            top: -6px;
            left: -6px;
            z-index: 10;
            background: var(--color-bg-main);
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11px;
            height: 11px;
        `,

        cornerTopRight: css`
            position: absolute;
            top: -6px;
            right: -6px;
            z-index: 10;
            background: var(--color-bg-main);
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11px;
            height: 11px;
            transform: rotate(90deg);
        `,

        cornerBottomLeft: css`
            position: absolute;
            bottom: -6px;
            left: -6px;
            z-index: 10;
            background: var(--color-bg-main);
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11px;
            height: 11px;
            transform: rotate(270deg);
        `,

        cornerBottomRight: css`
            position: absolute;
            bottom: -6px;
            right: -6px;
            z-index: 10;
            background: var(--color-bg-main);
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 11px;
            height: 11px;
            transform: rotate(180deg);
        `,
    };
};

export default styles;
