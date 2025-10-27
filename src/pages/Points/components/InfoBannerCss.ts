import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      margin-bottom: ${theme.spacing(4)};
      display: flex;
      padding: ${theme.spacing(6)} ${theme.spacing(6)};
      overflow: hidden;
      border: none;
      position: relative;


      justify-content: start;

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
      }
    `,
    panelDescription: css`
      background: none;
      border: 1px solid ${theme.palette.background.paper};
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
        flex-grow: 1;

        ${theme.breakpoints.down('md')} {
          flex-direction: column;
        }
    `,
    block: css`
      max-width: 300px;
      text-align: left;
      padding-right: ${theme.spacing(6)};
      margin-right: ${theme.spacing(6)};
      margin-left: ${theme.spacing(5)};
      ${theme.breakpoints.down('xl')} {
        padding-right: ${theme.spacing(3)};
        margin-right: ${theme.spacing(3)};
        margin-left: ${theme.spacing(2)};

        margin-bottom: ${theme.spacing(6)};
      }
    `,
    withBorder: css`
        border-right: 1px solid ${theme.palette.secondary.light};
        ${theme.breakpoints.down('xl')} {
          max-width: 200px;
        }
        ${theme.breakpoints.down('sm')} {
          width: 100%;
          max-width: 100%;
          border-right: none;
          margin-bottom: ${theme.spacing(6)};


          .blockIcon {
            display: none;
          }
        }

    `,
    blockTitle: css`
      font-weight: bold;
      font-size: 1.2em;
      margin-bottom: ${theme.spacing(2)};
    `,
    blockTitleSm: css`
    font-size: 1em;
  `,
    blockDescription: css`
        color: ${theme.palette.text.secondary};
        font-size: 1em;
        //max-width: 200px;
    `,

    blockIcon: css`
      margin-bottom: ${theme.spacing(4)};
    `,
    blockBullet: css`
      background: var(--color-yellow);
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 800;
      text-align: center;
      line-height: 18px;
      position: relative;
      color: var(--color-black);
      left: 10px;

      :after {
        content: ' ';
        position: absolute;
        left: -5px;
        right: -5px;
        bottom: -5px;
        top: -5px;
        border-radius: 50%;
        border: 1px solid var(--color-yellow);
      }
      :before {
        content: ' ';
        position: absolute;
        left: -10px;
        right: -10px;
        bottom: -10px;
        top: -10px;
        border-radius: 50%;
        border: 1px solid var(--color-yellow);
      }

    `

  };
};
