import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        panelSection: css`
            padding: 0px;
            padding-bottom: 10px;
        `,
        tokenTextField: css``,
    };
};
