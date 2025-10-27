import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();
  return {
    modal: css`
      padding-bottom: 0 !important;

      .title_wrapper {
        padding-left: 40px;
      }
    `,
    buttons: css`
      margin-top: 2em;
      display: flex;
      flex-direction: column;
      gap: .5em;
    `,
    refModal: css`
      font-family: ${FONTS.heading};
      max-width: 400px;
    `,
    refTitle: css`
      font-weight: 400;
      // 28px;
      font-size: 1.6em;
      line-height: 1.1;
      margin: .8em 0;
    `,
    refInfo: css`
      font-size: 1em;
      color: #B4B4B2;
    `,
    noMobile: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(15, 18, 23);
      font-family: ${FONTS.heading};

      .header {
          padding: 20px;
          border-bottom: 1px solid rgba(124, 198, 255, .1);
      }
      .body {
          min-height: calc(90vh - 150px);
      }
      .keyvisual {
        max-width: 85vw;
      }
      .logo {
        height: 32px;
      }
      .body {
        text-align: center;
        padding-top: 10vh;
      }
      .title {
        font-size: 22px;
      }
      .text {
        color: #979797;
        font-size: 16px;
        font-family: ${FONTS.space};
        padding: 0vh 10vw;
      }
      .link {
        font-family: ${FONTS.space};
        font-size: 18px;
        font-weight: 400;

      }
    `
  };
};
