import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    layout: css`
      display: flex;
      flex: 1;
      flex-direction: row;
      height: 100vh;
      height: 100dvh; /* Dynamic viewport height for mobile browsers */
      overflow: hidden;
      position: relative;
      ${theme.breakpoints.down('lg')} {
        flex-direction: column;
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
      }
    `,
  };
};
