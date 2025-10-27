import { css } from '@emotion/react';

export const useRefereesStyles = () => ({
    dialogContent: css`
        padding: 20px !important;
        position: relative;
        overflow: visible;

        @media(max-width:600px){
           padding: 20px 0 20px 0 !important;
           overflow: hidden;
           height: 100%;
           display: flex;
           flex-direction: column;
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

        @media(max-width:600px){
           height: 100%;
           overflow: hidden;
        }
    `,

    header: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        width: 100%;

        @media(max-width:600px){
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
    `,
    tableContainer: css`
        width: 100%;

        @media(max-width:600px){
           overflow-y: auto;
           flex: 1;
           min-height: 0;
           width: 100%;
        }
    `,
    tableWrapper: css`
        @media(max-width:600px){
           display: flex;
           flex-direction: column;
           flex: 1;
           min-height: 0;
           overflow: hidden;
        }
    `,

    statsContainer: css`
        display: flex;
        justify-content: space-between;
        gap: 40px;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);

        @media(max-width:600px){
           flex-shrink: 0;
        }
    `,

    statItem: css`
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
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
    `,

    tableContainer: css`
        width: 100%;
        overflow: hidden;
    `,

    tableHeader: css`
        display: grid;
        grid-template-columns: 1fr 120px;
        padding: 6px 20px;
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
    `,

    tableBody: css`
        display: flex;
        flex-direction: column;
    `,

    tableRow: css`
        display: grid;
        grid-template-columns: 1fr 120px;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        align-items: start;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.02);
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
    `,

    pagination: css`
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;

        @media(max-width:600px){
           flex-shrink: 0;
        }
    `,

    pageButton: css`
        background: rgba(26, 34, 41, 1);
        border: none;
        border-radius: 5px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
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
            opacity: 0.3;
            cursor: not-allowed;
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
        justify-content: center;
        width: 40px;
        height: 40px;
    `,

    nextButton: css`
        margin-left: 8px;
        color: rgba(144, 160, 172, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
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
