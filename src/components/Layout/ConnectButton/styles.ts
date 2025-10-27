import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    button: css`
      height: auto;
    `,
    notConnected: css`
      //width: 472px;
      height: 50px;
      gap: 8px;
      opacity: 1;
      border-radius: 5px;
      padding: 14px 24px;
      background: rgba(32, 176, 253, 1);
      box-shadow:
        0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
        0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
        0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
        0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
        0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset,
        0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset;

      font-family: 'Chakra Petch', sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      letter-spacing: 0%;
      text-align: center;
      color: rgba(255, 255, 255, 1);

      &:hover {
        background: linear-gradient(90deg, #807CF4 0%, #3DF0ED 100%);
        box-shadow:
          0px -8.94px 14.89px 0px rgba(0, 125, 192, 1) inset,
          0px 5.04px 7.45px 0px rgba(0, 133, 204, 1) inset,
          0px -1.98px 1.49px 0px rgba(0, 86, 133, 1) inset;
      }
    `
  };
};
