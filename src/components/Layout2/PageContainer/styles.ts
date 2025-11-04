import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    main: css`
      flex-grow: 1;
      width: 100%;
      max-width: 1304px;
      margin: 0 auto;
      padding: ${theme.spacing(4, 6, 2)};
      box-sizing: border-box;

      ${theme.breakpoints.down('xl')} {
        max-width: 1100px;
        padding: ${theme.spacing(3, 4)};
      }

      ${theme.breakpoints.down('lg')} {
        max-width: 960px;
        padding: ${theme.spacing(2, 3)};
      }

      ${theme.breakpoints.down('md')} {
        max-width: 100%;
        padding: ${theme.spacing(2)};
      }

      ${theme.breakpoints.down('sm')} {
        padding: ${theme.spacing(1.5)};
      }
    `,

    footer: css`

      width: 100%;
      margin: 0 auto;
      box-sizing: border-box;
    `,

    dashboardFooter: css`
      ${theme.breakpoints.down('sm')} {
        display: none;
      }
    `,
  };
};
