import { css } from '@emotion/react';

export const useStyles = () => {
    return {
        container: css`
            display: flex;
            flex-direction: column;
            gap: 24px;
        `,

        assetCard: css`
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 12px;
            position: relative;
        `,

        cardHeader: css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            height: 88px;

            @media (max-width: 760px) {
                height: auto;
                gap: 16px;{
                align-items: flex-start;
               
            }
        `,

        metricsContainer: css`
            display: contents;
            
            
            @media (max-width: 800px) {
               display: none;
        `,

        spacer: css`
            display: flex;
            align-items: center;

            @media (max-width: 760px) {
                flex: 1;
                justify-content: flex-end;
            }
        `,

        selectedCard: css`
           
        `,

        tokenInfo: css`
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 140px;

            @media (max-width: 760px) {
                min-width: unset;
                flex: 1;
            }
        `,

        tokenIcon: css`
            width: 40px;
            height: 40px;
        `,

        tokenDetails: css`
            display: flex;
            flex-direction: column;
            gap: 2px;

            .symbol {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                text-align: left;
                color: rgba(255, 255, 255, 1);
                margin: 0;
                width: 56px;
                height: 20px;
            }

            .name {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 0.8);
                margin: 0;
            }
        `,

        metric: css`
            display: flex;
            flex-direction: column;
            min-width: 120px;
            gap: 4px;

            @media (max-width: 800px) {
                  min-width: unset;
            }

            .label {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 0.8);
                margin: 0;
            }

            .value {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                text-align: left;
                color: rgba(255, 255, 255, 1);
                margin: 0;
            }

            .percentage {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 125%;
                letter-spacing: 0px;
                text-align: left;
                color: rgba(255, 255, 255, 1);
            }
        `,

        expandedContent: css`
            padding: 10px 20px 20px 20px;
        `,

        chartsRow: css`
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-top: 20px;
            width: 100%;
            overflow: hidden;

            @media (max-width: 1140px) {
                grid-template-columns: repeat(2, 1fr);

                /* Если последний элемент нечётный (находится на нечётной позиции), растягиваем его на всю ширину */
                & > div:last-child:nth-child(odd) {
                    grid-column: 1 / -1;
                }
            }

            @media (max-width: 600px) {
                grid-template-columns: 1fr;

                /* На маленьких экранах все элементы в один столбец, убираем растягивание */
                & > div:last-child:nth-child(odd) {
                    grid-column: auto;
                }
            }
        `,

        chart: css`
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
            overflow: hidden;

            .chart-header {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .chart-title {
                    font-family: 'Chakra Petch', sans-serif;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 140%;
                    letter-spacing: 0%;
                    color: rgba(144, 160, 172, 0.8);
                    margin: 0;
                }
            }

            .chart-value {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 22px;
                line-height: 120%;
                letter-spacing: -1%;
                color: rgba(255, 255, 255, 1);
                margin-bottom: 40px;
            }

            .chart-placeholder {
                height: 120px;
                background: linear-gradient(
                    135deg,
                    rgba(0, 212, 170, 0.2) 0%,
                    rgba(0, 212, 170, 0.05) 100%
                );
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #00d4aa;
                font-size: 12px;
                margin-top: 8px;
            }
        `,

        buyButton: css`
            width: 80px;
            height: 40px;
            padding: 10px 12px;
            gap: 4px;
            border-radius: 5px;
            background: rgba(32, 176, 253, 1);
            box-shadow:
                0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
                0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
                0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset,
                0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset,
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2);
            border: none;
            color: white;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background: rgba(28, 156, 225, 1);
            }
        `,

        chevronTrigger: css`
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            margin-left: 4px;

            svg {
                width: 9px;
                height: 6px;
                transition: transform 0.2s ease;

                &.expanded {
                    transform: rotate(180deg);
                }
            }
        `,

        dropdownButton: css`
            min-width: 80px;
            height: 28px;
            padding: 4px 8px;
            gap: 4px;
            border-radius: 5px;
            background: rgba(26, 34, 41, 1);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            overflow: hidden;

            span {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 140%;
                letter-spacing: 0%;
                color: rgba(144, 160, 172, 0.8);
                text-overflow: ellipsis;
                overflow: hidden;
                flex: 1;
                text-align: left;
            }

            &:hover {
                background: rgba(32, 42, 49, 1);
            }
        `,

        dropdownMenu: {
            mt: 1,
            background: 'rgba(12, 18, 21, 1)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '5px',
            boxShadow: '0px 10px 40px 0px rgba(0, 0, 0, 0.25)',
            padding: '5px 1px',
            gap: '2px',
            fontFamily: 'Chakra Petch',
            minWidth: '80px',
            '& .MuiMenuItem-root': {
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '140%',
                color: 'rgba(144, 160, 172, 0.8)',
                height: '28px',
                padding: '4px 8px',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    background: 'rgba(26, 34, 41, 1)',
                },
            },
        },

        chevronIcon: css`
            width: 6px;
            height: 4px;
            margin-left: 4px;
        `,
    };
};
