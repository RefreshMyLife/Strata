import { css } from '@emotion/react';

export const useStyles = () => ({
    container: css`
        width: 472px;
        height: 50px;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 4px;
        padding: 4px 12px;
        background: rgba(32, 176, 254, 0.05);
        margin-bottom: 10px;
    `,
    text: css`
        width: 420px;
        height: 20px;
        font-family: 'Chakra Petch', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 125%;
        letter-spacing: 0px;
        color: rgba(255, 255, 255, 1);
    `,
});
