import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      margin-top: ${theme.spacing(8)};
      margin-bottom: ${theme.spacing(8)};
      display: flex;
      overflow: hidden;
      border: none;
      position: relative;

      justify-content: space-between;
      gap: ${theme.spacing(4)};

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
      }

      hr {
        border: none;
        border-top: 1px solid ${theme.palette.divider};
      }
    `,
    content: css`
      display: flex;
      padding: ${theme.spacing(8)} ${theme.spacing(6)};
      position: relative;
      text-align: center;
      justify-content: center;

      ${theme.breakpoints.down('sm')} {
        flex: initial;
        padding: ${theme.spacing(6, 4)};
        text-align: center;
      }
    `,
    contentText: css`
      display: block;
      text-align: center;
    `,
    title: css`
      font-size: 1.8em;
      font-weight: 900;
      margin-bottom: ${theme.spacing(3)};

      ${theme.breakpoints.down('lg')} {
        display: none;
      }
    `,
    description: css`
      margin: ${theme.spacing(3)};
      font-size: 1em;
      font-weight: 400;
      color: ${theme.palette.text.tertiary};
    `,
    link: css`
      margin: 0;
      font-size: 1em;
      font-weight: 600;
      color: ${theme.palette.text.tertiary};
    `,
    button: css`
      margin: 0 auto;
      ${theme.breakpoints.down('sm')} {
        margin: 0 auto;
        width: 100%;
      }
    `,

    blockGroup: css`
        display: flex;
        flex-direction: row;
        //justify-content: space-around;
        flex-grow: 1;
    `,
    block: css`
      text-align: left;
      flex-grow: 1;
    `,
    withBorder: css`
        border-right: 1px solid ${theme.palette.secondary.light};
    `,
    blockTitle: css`
      font-weight: bold;
      font-size: 1.2em;
      margin-bottom: ${theme.spacing(4)};
    `,
    blockDescription: css`
        color: ${theme.palette.text.tertiary};
        font-size: 1em;
        max-width: 200px;
    `,
    blockRow: css`
      display: flex;
      flex-direction: row;
      font-size: 1em;
      margin: ${theme.spacing(2)} 0;

      &.bold {
        font-weight: bold;
      }
    `,
    rowTitle: css`
      flex-grow: 1;
    `,
  };
};
