import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();
    return {
        container: css`
            padding: 10px 0 0 10px;
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            gap: 40px;
            display: flex;
            flex-direction: column;

            ${theme.breakpoints.down('xl')} {
                max-width: 1200px;
            }

            ${theme.breakpoints.down('md')} {
                padding: 10px 10px;
            }
        `,
    };
};
