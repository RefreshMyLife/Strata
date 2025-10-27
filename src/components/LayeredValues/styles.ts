import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      display: flex;
      flex-direction: column;
      padding: 10px 0px;
    `,
    topValue: css`
      color: ${theme.palette.text.primary};
      font-weight: normal;
    `,
    // topValueBanner: css`
    //   font-size: .8em;
    //   display: inline-block;
    //   background: var(--color-yellow);
    //   color: var(--color-black);
    //   border-radius: 4px;
    //   padding: 0px 2px;
    //   margin-left: .4em;
    // `
    topValueBanner: css`
      font-size: .8em;
      display: inline-block;
      color: var(--color-black);
      background: var(--color-yellow);
      border-radius: 4px;
      padding: 2px 8px;
      font-weight: 900;
      margin-left: .4em;
      white-space: nowrap;
      break-after: always;

      margin-bottom: .3em;
      min-width: 6em;
      text-align: center;
    `
  };
};
