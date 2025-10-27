import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();
  return {
    container: css`
      border: none;
      background: transparent;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    `,
    whiteText: css`
      color: ${theme.palette.text.primary};
    `,
    groupHeading: css`
      font-size: ${FONTS.labels};
      font-size: 1.1em;
      color: rgba(255,255,255,.92);
      padding: 1em 0;
    `,
    cardContentGrid: css`

      ${theme.breakpoints.down('xl')} {
        background-color: initial;
      }
      .table__table-cards__card-content {
        ${theme.breakpoints.down('xl')} {
          > div > div {
            overflow: initial;
          }
          grid-template-columns:
            calc(20% - ${theme.spacing(11)}) auto auto calc(20% - ${theme.spacing(11)})
            calc(20% - ${theme.spacing(11)}) auto;
          grid-template-rows: 1fr;
          justify-content: space-between;
        }
        ${theme.breakpoints.down('md')} {
          grid-template-columns: calc(33% - ${theme.spacing(4)}) calc(33% - ${theme.spacing(4)}) auto;
          grid-template-rows: 1fr 1fr;
          row-gap: ${theme.spacing(5)};
        }
        ${theme.breakpoints.down('sm')} {
          row-gap: ${theme.spacing(4)};
        }
      }
    `,
    txnHashText: css`
      text-decoration: underline;
      align-items: center;
      color: ${theme.palette.text.primary};
      padding: 0 !important;

      :hover {
        color: ${theme.palette.button.medium};
      }

      :active {
        color: ${theme.palette.button.dark};
      }
    `,
    typeCol: css`
      display: flex;
      flex-direction: row;
      align-items: center;
    `,
    cardTitle: css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      ${theme.breakpoints.down('xl')} {
        display: flex;
      }
    `,
    icon: css`
      flex-shrink: 0;
      margin-top: -2px;
      margin-right: ${theme.spacing(2)};
      width: ${theme.shape.iconSize.large}px;
      height: ${theme.shape.iconSize.large}px;
    `,

    txItem: css`
      font-family: ${FONTS.heading};

      .tx_event {
        font-size: 1rem;
        margin: 5px 0;
        color: #8C9BAB;
      }
      margin-bottom: 1em;
      border-radius: 8px;
      cursor: pointer;

      :hover {
        background: rgba(255, 255, 255, 0.04);
      }

      .footer {
        display: none;
      }

      &.opened {
        border: 1px solid rgba(255, 255, 255, 0.06);
        .footer {
          display: block;
        }

        .head {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .cell {
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }
      }
    `,
    txItemType: css`
      padding: 0.5em 0 0 1.5em;
    `,
    txItemHead: css`
      padding: 0.1em 1.5em 1em 1.5em;
    `,
    txItemCell: css`
      padding: 1em;
      padding-right: 3em;
      display: inline-flex;
      align-items: center;

      > .cell_label {
        color: #8C9BAB;
        display: inline-block;
        padding-right: 1em;
      }

    `,
    badgeSuccess: css`
      background: rgba(92, 223, 189, 0.16);
      border-radius: 6px;
      padding: 2px 8px;
      color: #5CDFBD;
      display: inline-flex;
      align-items: center;
      position: relative;

    `,
    badgeSuccessIcon: css`
        display: inline-block;
        margin-right: 5px;
    `
  };
};
