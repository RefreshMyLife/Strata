import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    tableAction: css`
      width: 120px;
    `,
  };
};
