import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  const thumbSize = theme.spacing(5.5);

  return {
    container: css`
      display: inline-flex;
      align-items: center;
    `,
    label: css`
      margin-right: ${theme.spacing(2)};
    `,
    infoIcon: css`
      margin-right: ${theme.spacing(2)};
    `,
    getSwitch: ({ isLight }: { isLight: boolean }) => css`
      flex-shrink: 0;
      width: calc(${thumbSize} * 2);
      height: ${thumbSize};
      padding: 0;
      opacity: .5;

      & .MuiSwitch-switchBase {
        padding: 0;
        margin: 0;
        transition-duration: 300ms;
        color: ${theme.palette.background.default};
        opacity: .8;

        &.Mui-checked {
          color: ${theme.palette.background.default};
          transform: translateX(${thumbSize});
          opacity: 1;

          .MuiSwitch-thumb {
            //background-color: ${theme.palette.interactive.primary};
          }

          & + .MuiSwitch-track {
            //background-color: #8F98F1;
          }
        }

        &.Mui-disabled + .MuiSwitch-track {
          opacity: 0.5;
        }
      }

      .MuiSwitch-thumb {
        background-color: var(--color-black);
        box-shadow: none;
        box-sizing: border-box;
        width: ${parseInt(thumbSize) - 4}px;
        height: ${parseInt(thumbSize) - 4}px;
        top: 2px;
        left: 2px;
        position: relative;
      }

      .MuiSwitch-track {
        border-radius: ${thumbSize};
      }

      &:has(.Mui-checked) {
        opacity: 1;
      }

      .MuiSwitch-track,
      .Mui-checked + .MuiSwitch-track {
        background-color: var(--color-primary);
        opacity: 1;
      }
    `,
  };
};
