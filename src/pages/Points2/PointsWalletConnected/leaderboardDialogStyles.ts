import { css } from '@emotion/react';

export const useStyles = () => ({
    dialogContent: css`
        padding: 20px !important;
        position: relative;
        overflow: visible;

        @media (max-width: 600px) {
            padding: 16px !important;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        @media (max-width: 490px) {
            padding: 0px !important;
        }   
    `,

    closeButton: css`
        width: 15px;
        height: 15px;
        z-index: 10;

        &:hover {
            background: none;
        }
    `,

    content: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        text-align: center;

        @media (max-width: 600px) {
            flex: 1;
            gap: 16px;
            min-height: 0;
            overflow: hidden;
        }
    `,

    header: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        width: 100%;

        @media (max-width: 600px) {
            flex-shrink: 0;
        }
    `,

    title: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 32px;
        leading-trim: NONE;
        line-height: 120%;
        letter-spacing: -1%;
        color: rgba(255, 255, 255, 1);

        @media (max-width: 600px) {
            font-size: 24px;
        }
    `,

    statsContainer: css`
        display: flex;
        justify-content: space-between;
        gap: 40px;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);

        @media (max-width: 600px) {
            flex-direction: row;
            gap: 12px;
            align-items: flex-start;
            flex-shrink: 0;
            padding-bottom: 12px;
        }
    `,

    statItem: css`
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;

        @media (max-width: 600px) {
            margin-bottom: 0;
        }
    `,

    statLabel: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 16px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        height: 20px;
        color: rgba(144, 160, 172, 0.8);

        @media (max-width: 600px) {
            font-size: 12px;
            height: auto;
        }
    `,

    statValue: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 16px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        height: 20px;
        color: rgba(255, 255, 255, 1);

        @media (max-width: 600px) {
            font-size: 12px;
            height: auto;
        }
    `,

    tableContainer: css`
        width: 100%;
        overflow: hidden;

        @media (max-width: 600px) {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
        }
    `,

    tableHeader: css`
        display: grid;
        grid-template-columns: 70px 1fr 120px 140px;
        padding: 16px 20px;

        @media (max-width: 600px) {
            grid-template-columns: 40px 2fr 2.3fr 1.4fr;
            padding: 8px 4px;
        }
    `,

    headerCell: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        color: rgba(144, 160, 172, 0.8);
        text-align: start;

        &:last-of-type {
            text-align: right;
        }

        @media (max-width: 600px) {
            font-size: 14px;
        }

        @media (max-width: 490px) {
            font-size: 12px;
        }
    `,

    tableBody: css`
        display: flex;
        flex-direction: column;
    `,

    tableRow: css`
        display: grid;
        grid-template-columns: 70px 1fr 120px 140px;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        align-items: start;
        gap:5px;
        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.02);
        }

        @media (max-width: 600px) {
            grid-template-columns: 40px 2fr 2.3fr 1.4fr;
            padding: 8px 4px;
        }
    `,

    userRow: css`
        border: 1px solid rgba(32, 176, 253, 1);
        border-left: none;
        border-right: none;

        &:hover {
            background: rgba(32, 175, 253, 0.12) !important;
        }
    `,

    cellRank: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        color: rgba(255, 255, 255, 1);
        text-align: start;

     

        @media (max-width: 490px) {
            font-size: 12px;
        }
    `,

    cell: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        gap: 8px;

        &:last-child {
            justify-content: flex-end;
        }

        @media (max-width: 600px) {
            font-size: 14px;
            gap: 4px;
        }

        @media (max-width: 490px) {
            font-size: 12px;
        }
    `,

    userCell: css`
        color: rgba(255, 255, 255, 1) !important;
        font-weight: 500 !important;
    `,

    userRank: css`
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        color: rgba(32, 176, 253, 1) !important;
        text-align: start;

        @media (max-width: 600px) {
            font-size: 14px;
        }

        @media (max-width: 490px) {
            font-size: 12px;
        }
    `,

    pagination: css`
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;

        @media (max-width: 600px) {
            flex-shrink: 0;
            margin-top: 0px;
        }
    `,

    pageButton: css`
        background: rgba(26, 34, 41, 1);
        border: none;
        border-radius: 5px;
        padding: 8px 12px;
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.2);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        @media (max-width: 960px) {
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `,

    activePageButton: css`
        background: rgba(15, 43, 58, 1);
        color: rgba(32, 176, 253, 1) !important;
        border-color: #20affd !important;

        &:hover {
            background: rgba(15, 43, 58, 1) !important;
        }
    `,

    prevButton: css`
        margin-right: 8px;
        color: rgba(144, 160, 172, 0.8);
        display: flex;
        align-items: center;
        gap: 6px;

        @media (max-width: 960px) {
            width: 40px;
            height: 40px;
            padding: 0;
            justify-content: center;
            gap: 0;

            .button-text {
                display: none;
            }
        }
    `,

    nextButton: css`
        margin-left: 8px;
        color: rgba(144, 160, 172, 0.8);
        display: flex;
        align-items: center;
        gap: 6px;

        @media (max-width: 960px) {
            width: 40px;
            height: 40px;
            padding: 0;
            justify-content: center;
            gap: 0;

            .button-text {
                display: none;
            }
        }
    `,

    ellipsis: css`
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.5);
        padding: 8px 4px;
    `,
});
