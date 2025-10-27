import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            padding: 10px 0 10px 10px;
            max-width: 1200px;
            margin: 0 auto;
            color: ${theme.palette.text.primary};
        `,
    };
};
