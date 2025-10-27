import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    menu: css`
      .MuiPaper-root {
        border-radius: 10px;
        padding: 0;
        border: 1px solid ${theme.palette.divider};
      }
    `,
    menuLogo: css`
      width: 20px;
      margin: 0px 10px 0px 5px;
    `,
    button: css`
      margin: 0px 8px;
      background: white;
      border-color: white;
      color: black;
    `
  };
};
