import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import { FONTS } from 'theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    iconSize: theme.shape.iconSize.large,
    btnClose: css`
      position: absolute;
      padding: 0;
      right: ${theme.spacing(5)};
      top: ${theme.spacing(5)};
      color: ${theme.palette.text.secondary};
      background: transparent;

      &:hover:not(:disabled) svg,
      &:active:not(:disabled) svg {
        color: ${theme.palette.text.primary};
      }
      &:hover {
        background: transparent !important;
        box-shadow: none !important;
        border-color: transparent;
      }
    `,
    /* extra padding for placing the close button */
    noticeContainer: css`
      max-width: ${theme.spacing(140)};
      padding-right: ${theme.spacing(9)};
      border-radius: none;

      ${theme.breakpoints.down('md')} {
        padding-right: ${theme.spacing(8)};
      }
    `,
  };
};

export const customToastGlobalStyles = css`
  .Toastify__toast-container {
    width: auto;
    max-width: calc(100vw - 40px);

    @media (max-width: 600px) {
      width: 100%;
      max-width: 100%;
      left: 0 !important;
      right: 0 !important;
      margin: 0;
      padding: 0 16px;
    }

    .Toastify__toast {
      font-family: ${FONTS.primary};
      background-color: transparent;
      box-shadow: none;
    }
  }
`;
