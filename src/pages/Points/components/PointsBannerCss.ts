import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      margin-bottom: ${theme.spacing(4)};
      display: flex;
      padding: ${theme.spacing(8)};
      overflow: hidden;

      position: relative;
      background-color: black; //var(--color-black);
      text-align: center;
      justify-content: center;

      h2 {
        line-height: 1.3;
      }

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
        //margin-top: -48px;
        text-align: left;
      }
    `,
    content: css`
      display: flex;
      position: relative;
      text-align: center;
      justify-content: center;

      ${theme.breakpoints.down('sm')} {
        flex: initial;
        text-align: left;
        justify-content: start;

      }
    `,
    contentText: css`
      display: block;
      //background: rgba(234, 236, 255, .6);
      border-radius: 20px;
    `,
    title: css`
      font-size: 1.3em;
      font-weight: 900;
      margin-bottom: ${theme.spacing(3)};

      ${theme.breakpoints.down('lg')} {

      }
    `,
    description: css`
      margin: ${theme.spacing(3)};
      font-size: 1em;
      font-weight: 400;
      color: ${theme.palette.text.secondary};

      ${theme.breakpoints.down('sm')} {
        margin: ${theme.spacing(3)} 0;
        br {
          display: none;
        }
      }
    `,
    link: css`
      margin: 0;
      font-size: 1em;
      font-weight: 600;
      color: ${theme.palette.text.tertiary};
    `,
    button: css`
      margin: 0 auto;
      width: auto !important;
      padding: 0 ${theme.spacing(10)};
      font-size: 1rem;
      ${theme.breakpoints.down('sm')} {
        margin: 0;
      }
      margin-top: 10px;
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

      // img {
      //   opacity: .2;
      //   filter: blur(2px);
      // }
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
      position: absolute;
      right: -70px;
      height: 100%;
      ${theme.breakpoints.down('lg')} {
        opacity: 0.1;
      }
      ${theme.breakpoints.down('md')} {
        display: none;
      }
      ${theme.breakpoints.down('xl')} {
        right: -150px !important;
      }
    `,
    illustration1: css`
      position: absolute;
      left: -35px;
      height: 100%;

      ${theme.breakpoints.down('xl')} {
        left: -130px !important;
      }
      ${theme.breakpoints.down('lg')} {
        opacity: 0.5;
        left: 0 !important;
        width: 100%;
        height: 100%;
        object-fit:cover;
        transform: rotate(180deg);
      }

  `
  };
};
