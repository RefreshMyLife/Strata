import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    formContainer: css`
      position: relative;
    `,
    panelSection: css`
      padding: 0;
      padding-bottom: 0px;
    `,
    container: css`
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0px;
      background: transparent;
      border: none;
      position: relative;
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
    tokenIcon: css`
      width: ${theme.shape.iconSize.xLarge}px;
      height: ${theme.shape.iconSize.xLarge}px;
      margin-right: ${theme.spacing(1)};
    `,
    tokenIconLarge: css`
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      margin-right: ${theme.spacing(2)};
    `,
    tokenIconWithdraw: css`
      margin-left: ${theme.spacing(1)};
    `,
    label: css`
      display: block;
      margin-bottom: ${theme.spacing(2)};

      ${theme.breakpoints.down('sm')} {
        margin-bottom: 0;
      }
    `,
    stakingLabel: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    text: css`
      display: inline;
    `,
    textRewardValue: css`
      font-weight: 600;
    `,
    textStakeValue: css`
      display: inline-flex;
      align-items: center;
    `,
    textAligned: css`
      display: inline-flex;
      align-items: center;
    `,
    textSmallMobile: css`
      ${theme.breakpoints.down('sm')} {
        font-size: ${theme.typography.small2.fontSize};
        font-size: ${theme.typography.small2.lineHeight};
      }
    `,
    dataRow: css`
      display: flex;
      padding-left: 0;
      margin-top: ${theme.spacing(6)};

      ${theme.breakpoints.down('sm')} {
        margin-top: ${theme.spacing(4)};
        flex-direction: column;
      }
    `,
    valueWrapper: css`
      display: block;

      & + & {
        border-left: 1px solid transparent;
        margin-left: ${theme.spacing(6)};
        padding-left: ${theme.spacing(6)};

        ${theme.breakpoints.down('sm')} {
          margin-left: 0;
          padding-left: 0;
          border: none;
          margin-top: ${theme.spacing(2)};
        }
      }

      ${theme.breakpoints.down('sm')} {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
    buttonsWrapper: css`
      display: flex;
      justify-content: space-between;
      margin-top: auto;

      ${theme.breakpoints.down('sm')} {
        flex-direction: column;
        margin-top: ${theme.spacing(6)};
      }
    `,
    button: css`
      margin-top: ${theme.spacing(8)};
      width: 100%;

      ${theme.breakpoints.down('sm')} {
        width: 100%;

        :not(:first-of-type) {
          margin-top: ${theme.spacing(3)};
        }
      }
    `,
    optionsButton: css`
      position: absolute;
      top: -63px;
      right: 5px;
    `
  };
};
