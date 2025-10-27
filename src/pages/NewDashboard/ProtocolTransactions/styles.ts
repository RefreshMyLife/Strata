import { css } from '@emotion/react';

export const useStyles = () => {
    return {
        container: css`
            display: flex;
            flex-direction: column;
            gap: 24px;
        `,

        tableContainer: css`
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 12px;
            overflow: hidden;
        `,

        tableHeader: css`
            display: grid;
            grid-template-columns: 150px 220px 220px 250px 180px;
            gap: 32px;
            padding: 16px 20px;

            .type-column,
            .asset-column,
            .txhash-column,
            .amount-column,
            .apy-column {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 0.8);
            }

            .type-column {
                justify-self: start;
            }

            .asset-column {
                justify-self: start;
            }

            .txhash-column {
                justify-self: center;
            }

            .amount-column,
            .apy-column {
                justify-self: end;
            }
        `,

        tableRow: css`
            display: grid;
            grid-template-columns: 150px 220px 220px 250px 180px;
            gap: 32px;
            padding: 16px 20px;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);

            &:last-child {
                border-bottom: none;
            }

            .type-column {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                color: rgba(255, 255, 255, 1);
                justify-self: start;
            }

            .asset-column {
                display: flex;
                align-items: center;
                gap: 12px;
                justify-self: start;

                span {
                    font-family: 'Chakra Petch', sans-serif;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 125%;
                    letter-spacing: 0px;
                    text-align: left;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .txhash-column {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                color: rgba(255, 255, 255, 1);
                justify-self: center;
            }

            .amount-column,
            .apy-column {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                color: rgba(255, 255, 255, 1);
                justify-self: end;
            }
        `,

        tokenIcon: css`
            width: 24px;
            height: 24px;
        `,

        paginationContainer: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 24px 20px;
        `,

        transactionCount: css`
            text-align: center;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);

            span {
                font-size: 14px;
                color: rgba(144, 160, 172, 0.8);
            }
        `,

        tableFooter: css`
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        `,

        progressLine: css`
            width: 160px;
            height: 2px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 1px;
            overflow: hidden;
        `,

        progressFill: css`
            height: 100%;
            background: rgba(144, 160, 172, 0.8);
            border-radius: 1px;
            transition: width 0.3s ease;
        `,

        loadMoreButton: css`
            width: 107px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 10px 12px;
            background: rgba(26, 34, 41, 1);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(144, 160, 172, 0.8);
            transition: all 0.2s ease;

            &:hover {
                background: rgba(34, 42, 49, 1);
                color: rgba(255, 255, 255, 1);
            }
        `,

        chevronDown: css`
            width: 6px;
            height: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        `,
    };
};
