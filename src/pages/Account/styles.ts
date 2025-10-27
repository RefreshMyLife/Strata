import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    placeholder: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 8vh;
      gap: .7em;
    `,
    page: css`

    `,
    labelBalance: css`
      font-size: 2.5em;
    `,
    identicon: css`
      border-radius: 8px;
    `,
    blockie: css`
      border: 1px solid #333;
    `,
    section: css`
      :not(:last-child) {
        margin-bottom: ${theme.spacing(14)};
      }

      ${theme.breakpoints.down('lg')} {
        :not(:last-child) {
          margin-bottom: ${theme.spacing(10)};
        }
      }
    `,
    sectionTitle: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${theme.spacing(6)};

      ${theme.breakpoints.down('lg')} {
        margin-bottom: ${theme.spacing(4)};
      }

      ${theme.breakpoints.down('md')} {
        flex-direction: column-reverse;
        align-items: flex-start;
        margin-bottom: ${theme.spacing(4)};
      }
    `,
    sectionTitleText: css`
      ${theme.breakpoints.down('md')} {
        font-size: ${theme.typography.h4.fontSize};
        font-weight: ${theme.typography.h4.fontWeight};
      }
    `,
    sectionTitleToggle: css`
      ${theme.breakpoints.down('md')} {
        margin-bottom: ${theme.spacing(6)};
      }
    `,
    tabs: css`
        button {
          background-color: transparent !important;
          border: 0;
          box-shadow: none;
          border-radius: 0;
          padding-top: 1.6em !important;
          padding-bottom: 1.6em !important;
          height: auto;
          margin-right: 2em;


          &.active {
            border-bottom: 3px solid #329EE1;
          }

        }
    `,
    getNetApyColor: ({ netApyPercentage }: { netApyPercentage: number }) =>
      netApyPercentage >= 0 ? theme.palette.interactive.success : theme.palette.interactive.error,
  };
};
