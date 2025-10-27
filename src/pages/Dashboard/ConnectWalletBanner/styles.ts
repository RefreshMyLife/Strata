import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      margin-bottom: ${theme.spacing(8)};
      display: flex;
      padding: 0;
      overflow: hidden;
      border: 1px ${theme.palette.secondary.light} solid;
      position: relative;
      background-color: var(--color-lavender);
      text-align: center;
      justify-content: center;

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
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
      margin-bottom: ${theme.spacing(3)};

      ${theme.breakpoints.down('lg')} {
        display: none;
      }
    `,
    description: css`
      margin-bottom: ${theme.spacing(8)};
    `,
    button: css`
      margin: 0 auto;
      ${theme.breakpoints.down('sm')} {
        margin: 0 auto;
        width: 100%;
      }
    `,
    illustrationContainer: css`
      position: absolute;

      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      flex: 5;

      ${theme.breakpoints.down('lg')} {
        flex: 4;
      }

      ${theme.breakpoints.down('sm')} {
        height: -1px;
        flex: initial;
        order: -1;
        overflow: hidden;
        background-color: ${theme.palette.secondary.light};
      }
    `,
    illustration: css`
      position: absolute;
      height: ${theme.spacing(125)};
      top: ${theme.spacing(-17)};
      right: ${theme.spacing(-12)};

      ${theme.breakpoints.down('xl')} {
        right: ${theme.spacing(-24)};
      }

      ${theme.breakpoints.down('lg')} {
        right: ${theme.spacing(-68)};
      }

      ${theme.breakpoints.down('sm')} {
        height: auto;
        width: ${theme.spacing(102)};
        top: ${theme.spacing(-8)};
        left: auto;
        right: 50%;
        margin-right: ${theme.spacing(-57)};
      }
    `,
    illustration2: css`
      ${theme.breakpoints.down('md')} {
        display: none;
      }
    `,
    illustration1: css`
    ${theme.breakpoints.down('md')} {
      opacity: 0.5;
    }
  `
  };
};
