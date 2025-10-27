import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
    `,
    headerIcon: css`
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
      color: ${theme.palette.interactive.success};
      margin-bottom: ${theme.spacing(4)};
      box-shadow: 0 0 15px 3px rgba(59, 239, 128, .2);
      border-radius: 50%;
    `,
    title: css`
      margin-bottom: ${theme.spacing(4)};
      text-align: center;
    `,
    scanLink: css`
      margin-bottom: ${theme.spacing(4)};
    `,
    messageContainer: css`
      margin: auto;
      display: flex;
      align-items: center;
      margin-bottom: ${theme.spacing(4)};

      ${theme.breakpoints.down('sm')} {
        display: block;
      }
    `,
    amountContainer: css`
      display: flex;
      align-items: center;
      margin-left: ${theme.spacing(2)};

      ${theme.breakpoints.down('sm')} {
        margin-left: 0;
      }
    `,
    amountTokenIcon: css`
      margin-right: ${theme.spacing(1)};
    `,
    hintContainer: css`

    `
  };
};
