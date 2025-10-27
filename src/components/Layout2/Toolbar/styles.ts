import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return css`
   

    ${theme.breakpoints.down('md')} {
      min-height: none;
    }
  `;
};
