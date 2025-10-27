import { css } from '@emotion/react';

export const useStyles = () => ({
    container: css`
        width: 100%;
        height: 180px;
        padding: 16px;
        backdrop-filter: blur(10px);

        .recharts-tooltip-wrapper {
            z-index: 1000;
        }

        .recharts-active-dot {
            filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
        }
    `,
});
