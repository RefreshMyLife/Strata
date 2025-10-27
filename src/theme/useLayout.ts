import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useLayout = () => {
  const theme = useTheme();

  return {
    row: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    `,
    wrap: css`
      flex-wrap: wrap;
    `,
    flexCenter: css`
      justify-content: center;
    `,
    selfCenter: css`
      align-items: center;
    `,
    gap: css`
      gap: 1em;
    `,
    rowCell: css`
      padding: 0px 1em;
    `,
    rowCellFull: css`
      width: 100%;
    `,
    column: css`
      display: flex;
      flex-direction: column;
    `,
    spaceBetween: css`
      justify-content: space-between;
    `,
    spaceAround: css`
      justify-content: space-around;
    `,
    gapBetween: css`
      gap: 2em;;
    `,
    table: css`
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;

      border-radius: 10px;

      border-collapse: separate;
      border-spacing: 0;

      table, th, td {
        border: 1px solid rgba(16, 26, 39, .7);
      }


      &.gray th, &.gray td {
        border-color: #1C2024;
      }
      &.gray th {
        color: #8896A7;
      }

      &.fullWidth {
        max-width: 100%;
      }
      &.noHeader {
        > tbody > tr > td:first-child {

          border-top-left-radius: 10px;
        }
        > tbody > tr > td:last-child {
          border-top-right-radius: 10px;
        }
      }

      thead {
        text-align: left;
        //border-radius: 10px;
      }
      th {
        color: #6683A7;
        font-weight: 100;
        font-size: 1em;
        padding: 10px 10px;
        background-color: #101A27;
        border-left-width: 0px;
        border-right-width: 0px;

        &:first-child {
          border-left-width: 1px;
          border-top-left-radius: 10px;
        }
        &:last-child {
          border-right-width: 1px;
          border-top-right-radius: 10px;
        }
      }
      &.gray th {
        background-color: #121518;
      }

      tbody td {
        text-align: left;
        background: #0D1319;

        &:first-child {
          border-right: none;
        }
        &:last-child {
          border-left: none;
        }
        &:not(:first-child):not(:last-child) {
          border-left: none;
          border-right: none;
        }

        padding: 10px 10px;
        white-space: nowrap;
      }
      &.gray tbody td {
        background-color: #101316;
      }

      tfoot td {
        height: 10px;
      }

      tbody > tr:last-child > td:first-child {
        border-bottom-left-radius: 10px;
      }
      tbody > tr:last-child > td:last-child {
        border-bottom-right-radius: 10px;
      }
    `,
    tableCellFullWith: css`
      width: 100%;
    `,
    tableCellPadding: css`
      padding-right: 4em !important;
      &:not(:last-child) {
        padding-right: 7em !important;
      }
    `,
    rowIcon: css`
      padding-right: 10px;
    `,
    rowTitle: css`
      font-size: 1em;
      font-weight: 200;
      margin-left: .5em;
    `,
    rowBadge: css`
      background: #132236;
      color: #D4D4D8;
      font-family: ${FONTS.heading};
      padding: 0px 10px;
      border-radius: 3px;
      font-weight: 200;
      margin-left: .5em;
      &.gray {
        background: #2B3441;
      }
    `,
    hr: css`
      border: none;
      height: 1px;
      background-color: #101A27;
      margin: ${theme.spacing(4)} 0;
    `,
    hint: css`
      color: var(--color-text-hint);
      font-size: .8em;
      font-weight: 100;
      &.lg {
        color: #8C9BAB;
        font-size: 1em;
        font-family: ${FONTS.space};
        font-weight: 400;
      }
    `,
    white: css`
      color: #ffffff;
    `,
    line: css`
      height: 0;
      border-top: 1px solid rgba(161, 189, 217, .08);
    `,
    paper: css`
      background: transparent;
      border: none;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;

      > h2 {
        margin-top: 1em;
        margin-bottom: 1em;
      }
    `,
    panels: css`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 2em;
    `,
    panel: css`
      background: #121518;
      border: 1px solid #1C2024;
      border-radius: 12px;
      padding: ${theme.spacing(4)};
      padding-bottom: ${theme.spacing(3)};
      max-width: 400px;
      width: 100%;
    `,
    panelIcon: css`
      background: rgb(1, 47, 65); //#0F2C1D;
      padding: 7px;
      margin-right: 1em;
      border-radius: 10px;
      > img {
        height: 36px !important;
        width: auto !important;
      }

      > .svg_container {
        height: 36px;
        width: 36px;
        position: relative;

        > img {
          height: 26px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    `,
    fontHeading: css`
      font-family: ${FONTS.heading} !important;
    `,
    panelTitle: css`
      font-family: ${FONTS.heading};
      font-size: 1.2em;
      font-weight: 600;
    `,
    inlineHeight: css`
      vertical-align: middle;
      > img {
        height: 1.2em;
        width: auto;
        vertical-align: middle;
      }
      > span {
        vertical-align: middle;
      }
    `,
    inlineImage: css`
      height: 1.2em;
      width: auto;
      vertical-align: middle;
    `,
    pill: css`
      background: rgba(57, 82, 117, 0.1);
      border-radius: 10px;
      padding: 6px 12px;

      .number {
        color: #8EA0AE;
        font-weight: bold;
        display: inline-block;
        margin: 0 0.4em;
      }
      .label {
        color: rgba(255, 255, 255, 0.7);
      }
    `,
    textRight: css`
      text-align: right;
    `,
    panelCellValue: css`
      font-family: ${FONTS.heading};
      font-size: 2.3em;
      line-height: 1;
    `,
    spaceAbove: css`
      margin-top: 2.5rem;
    `,

    pointsRow: css`
      img {
        margin-left: 2px;
        margin-right: 5px;
      }
    `
  };
};
