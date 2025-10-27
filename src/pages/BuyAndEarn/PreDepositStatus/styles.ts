import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      width: 100%;
      background: transparent;
      border: none;
      padding-top: 0;
      padding-bottom: 0;
      text-align: center;
      display: flex;
      flex-direction: column;

      h3 {

        font-family: 'Chakra Petch', sans-serif;
        font-weight: 600;
        font-size: 2em;
        letter-spacing: 0.4px;
        color: #FFFFFF;
      }
    `,
    pUSDeLogo: css`
      margin: 2em 0 1.4em 0;

    `,
    description: css`
      font-family: 'Space Grotesk', sans-serif;

      color: #8EA2B0;
    `,
    boostedPoints: css`
      font-weight: 400;
      font-size: 1.1em;
      color: #FFFFFF;
    `,
    boostedAmount: css`
      font-weight: 400;
      font-size: 1.1em;
      color: #FFFFFF;
      margin-bottom: 0;

      > b {
        font-family: 'Chakra Petch', sans-serif;
        font-size: 4em;
      }
    `,
    fillHeight: css`
      height: 100%;
    `,
    center: css`
      display: flex;
      align-items: center;
    `,
    headerBadge: css`
      padding: 5px 15px;
      text-align: center;
      display: inline-block;

      background: rgba(48, 149, 213, 0.2);
      border-radius: 5px;

      margin: 0 auto;
      color: #329CDE;
      letter-spacing: 0.5px;
      font-size: 1em;
      font-family: ${FONTS.heading};
    `,

    footer: css`
      color: #414A5A;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    `,

    header: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${theme.spacing(6)};
    `,
    title: css`
      display: flex;
      align-items: center;
    `,
    blueLink: css`
      color: rgb(44, 60, 254);
      margin: 20px 20px 20px 0px;
      font-weight: 600;
      text-decoration: none;
    `,


    row: css`
        display: flex;
        flex-direction: row;
    `,
    lCenterRow: css`
        align-items: center;
    `,
    p50: css`
        justify-content: space-between;
        > div {
            width: 30%;
        }
    `,
    lCenterInnerBlock: css`
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    arrows: css`
        @keyframes arrowAnimation {
            0% {
                opacity: 0.2;
            }
            100% {
                opacity: 1;
            }
        }

      > path {
         animation: arrowAnimation 2s infinite;
         animation-direction: alternate;
      }
      > path:nth-child(1) {
        opacity: 1;
        animation-delay: 0s;
      }
      > path:nth-child(2) {
        opacity: 0.7;
        animation-delay: .4s;
      }
      > path:nth-child(3) {
        opacity: 0.6;
        animation-delay: .8s;
      }
      > path:nth-child(4) {
        opacity: 0.5;
        animation-delay: 1.2s;
      }
      > path:nth-child(5) {
        opacity: 0.4;
        animation-delay: 1.6s;
      }
    `,
    moreInfoContainer: css`
      h3 { padding-bottom: .7em; font-weight: normal; }
      h5 { color: white; font-size: 1em; font-weight: normal; }
      p { padding: .4em 0px; }
      span { font-size: 1em; }
    `
  };
};
