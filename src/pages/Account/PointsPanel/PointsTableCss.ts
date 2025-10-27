import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    modal: css`
      max-width: 650px;
      ::before {
        border: none;
        background: none;
      }

      > div:last-child {
        padding: 0 ${theme.spacing(6)};
      }
    `,
    header: css`
      font-size: 1rem;
    `,
    headerBadge: css`
      font-size: 0.75em;
    `,
    container: css`
      margin-top: ${theme.spacing(0)};
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

    block: css`
      text-align: left;
      flex-grow: 1;
      padding: 0;
      border: none;
      margin: 0;
    `,

    blockTitle: css`
      font-weight: bold;
      font-size: 1.57rem;
      margin-bottom: ${theme.spacing(0)};
      white-space: nowrap;
    `,
    table: css`

      background: rgba(15, 19, 22, 0.6);
      box-shadow: 0px 8.94px 17.87px -1.49px rgba(4, 15, 26, 0.2), 0px 2.23px 5.96px -1.49px rgba(3, 19, 26, 0.4), inset 0px 0.47px 2.98px rgba(255, 255, 255, 0.15), inset 0px -1.98px 1.49px rgba(0, 0, 0, 0.4), inset 0px 5.04px 7.45px rgba(46, 48, 55, 0.2), inset 0px -8.94px 14.89px #15191E;
      border-radius: ${theme.spacing(6)};
      position: relative;

      ::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: ${theme.spacing(6)};
          padding: 2px; /* control the border thickness */
          background: linear-gradient(to bottom, rgba(51, 177, 255, 0.85), rgba(255, 255, 255, 0.15));
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
      }

      padding: ${theme.spacing(3)};
      margin-top: ${theme.spacing(6)};

      th {
        font-weight: bold !important;

      }
      tr {
        height: auto;

        // &:nth-child(1) > td {
        //   color: red;
        // }

        td {

        }
      }
    `,
    rowWrapperMobile: css`
      grid-template-columns: 1fr 1fr 1fr;

      > div {
        padding: 0;
      }
      > div:first-child {
        padding-left: 0 !important;
      }
      > div:last-child {
        padding-right: 0 !important;
      }
    `,
    rowTitleMobile: css`
      padding: 0 !important;
    `,
    txnHashTextMobile: css`
      font-family: ${FONTS.heading};
      font-size: inherit !important;
      font-weight: inherit !important;
    `,
    txnHashText: css`
      font-family: ${FONTS.heading};
      color: #8EA0AE !important;
    `
  };
};
