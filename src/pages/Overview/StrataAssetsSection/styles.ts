import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            margin-bottom: ${theme.spacing(5)};
            max-width: 100%;
        `,

        title: css`
            max-width: 1304px;
            height: 38px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: -0.48px;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 24px;
            margin-left: 2px;
            display: flex;
            align-items: center;

            ${theme.breakpoints.down('xl')} {
                width: 100%;
            }
        `,

        cardsGrid: css`
            max-width: 1304px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
           gap: 20px;

            ${theme.breakpoints.between('md', 'xl')} {
                grid-template-columns: 1fr 1fr; 
                grid-auto-rows: auto;

               
                & > :nth-of-type(1) {
                grid-column: 1 / 3;
                width: 100%;
                }

                
                & > :nth-of-type(2),
                & > :nth-of-type(3) {
                width: 100%; 
                min-width: 0;
                }
            }

            ${theme.breakpoints.down('md')} {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            ${theme.breakpoints.down('sm')} {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
               
            }
            `


    };
};
