import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    main: css`
      flex-grow: 1;
      padding: ${theme.spacing(8, 10, theme.shape.footerHeight)};
      width: 100%;
      max-width: ${theme.spacing(340)};
      margin: 0 auto;
      padding-bottom: 0px;

      ${theme.breakpoints.down('lg')} {
        padding-left: ${theme.spacing(6)};
        padding-right: ${theme.spacing(6)};
        padding-top: 0px;
      }

      ${theme.breakpoints.down('md')} {
        padding: ${theme.spacing(2)} ${theme.spacing(4)} ${theme.shape.footerHeight};
      }
    `,
    footer: css`
      bottom: 0;
      right: 0;
      width: 100%;
      // max-width: ${theme.spacing(340)};
      margin: 0 auto;

      ${theme.breakpoints.down('xl')} {
        width: calc(100% - ${theme.shape.drawerWidthTablet});
      }

      ${theme.breakpoints.down('lg')} {
        width: 100%;
      }
    `,
  };
};
