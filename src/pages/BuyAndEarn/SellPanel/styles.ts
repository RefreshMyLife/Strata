import { css } from '@emotion/react';

export const sellButtonStyles = css`
    height: 50px;
    margin: 0;
    background: rgba(32, 176, 253, 1);
    color: white;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    box-shadow:
        0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
        0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
        0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
        0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
        0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset,
        0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset;
    transition: all 0.2s ease;

    &:hover {
        background: linear-gradient(90deg, #807cf4 0%, #3df0ed 100%);
        box-shadow:
            0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
            0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
            0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset;
    }

    &:disabled {
        background: #6b7280;
        box-shadow: none;
        cursor: not-allowed;
    }

    &:disabled:hover {
        background: #6b7280;
        box-shadow: none;
    }
`;

export const enterAmountButtonStyles = css`
    height: 50px;
    margin: 0;
    background: rgba(68, 79, 86, 1);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow:
        0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4) inset,
        0px 0px 20px 44px rgba(0, 0, 0, 0.25) inset;
`;
