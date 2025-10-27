import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import { SPACING } from 'theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            width: 100%;
            height: 150px;
        `,
        chartMargin: {
            top: SPACING,
            right: 0,
            left: 0,
            bottom: SPACING * 2,
        },
        axis: {
            fontFamily: 'Chakra Petch',
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '16px',
            letterSpacing: '0%',
            fill: 'rgba(144, 160, 172, 0.5)',
        },
        yAxisStyle: css`
            width: 40px;
            height: 150px;
            justify-content: space-between;
            opacity: 1;
            border-right: 1px solid rgba(144, 160, 172, 0.2);
        `,
        tickMargin: SPACING * 2,
    };
};
