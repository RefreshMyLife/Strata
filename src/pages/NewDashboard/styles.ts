import { css } from '@emotion/react';

export const useStyles = () => {
    return {
        container: css`
            padding: 10px 0 0 10px;
             @media(max-width:600px){
                 padding: 10px;
             }
        `,

        sectionStyles: css`
            width: 100%;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 20px;
        `,

        headerStyles: css`
            display: flex;
            align-items: center;
            gap: 20px;
            cursor: pointer;
            padding: 0;
            background: transparent;
            border: none;
            width: 100%;

            h2 {
                font-family: 'Chakra Petch', sans-serif;
                font-weight: 600;
                font-size: 32px;
                line-height: 120%;
                letter-spacing: -1%;
                color: rgba(255, 255, 255, 1);
                margin: 0;
            }

            svg {
                transition: transform 0.2s ease;

                &.expanded {
                    transform: rotate(180deg);
                }
            }
        `,

        expandedContent: css`
            padding-top: 20px;
        `,
    };
};
