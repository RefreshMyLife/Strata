import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useModalStyles = ({
  hasTitleComponent,
  noHorizontalPadding,
}: {
  hasTitleComponent: boolean;
  noHorizontalPadding?: boolean;
}) => {
  const theme = useTheme();

  return {
    box: css`
      position: absolute;
      top: 50%;
      left: calc(50% + ${theme.shape.drawerWidthDesktop});
      transform: translate(calc(-50% - (${theme.shape.drawerWidthDesktop}) / 2), -50%);
      border: 1px ${theme.palette.secondary.light} solid;
      ${theme.breakpoints.down('lg')} {
        left: calc(50% + ${theme.shape.drawerWidthTablet});
        transform: translate(calc(-50% - (${theme.shape.drawerWidthTablet}) / 2), -50%);
      }
      ${theme.breakpoints.down('md')} {
        left: 50%;
        transform: translate(-50%, -50%);
      }
      width: calc(100% - ${theme.spacing(8)});
      max-width: ${theme.spacing(136)};
      border-radius: ${theme.spacing(6)};
      background-color: ${theme.palette.background.paper};
      overflow: auto;
      max-height: calc(100% - ${theme.spacing(8)});

      background-color: rgba(15, 19, 22, 0.9);

      position: relative;

      display: flex;
      flex-direction: column;

      // border: 2px solid; /* fallback */
      // border-image: linear-gradient(to bottom,rgba(51, 177, 255, 0.85), rgba(255, 255, 255, 0.15));
      // border-image-slice: 1;

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
    `,
    titleWrapper: css`
      padding-left: ${theme.spacing(6)};
      padding-right: ${theme.spacing(6)};
      padding-top: ${theme.spacing(6)};
      padding-bottom: ${hasTitleComponent ? theme.spacing(6) : 0};
      border-bottom: ${hasTitleComponent ? `1px solid ${theme.palette.secondary.light}` : 0};
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: transparent;
      margin-bottom: ${hasTitleComponent ? theme.spacing(6) : 0};
      display: flex;
      align-items: start;
      justify-content: start;
      ${theme.breakpoints.down('md')} {
        margin-bottom: ${hasTitleComponent ? theme.spacing(4) : 0};
      }
    `,
    backAction: css`
      position: absolute;
      left: ${theme.spacing(6)};
      padding: 0;
      min-width: auto;
      background-color: transparent;

      :hover {
        background-color: transparent;
      }
    `,
    backArrow: css`
      transform: rotate(180deg);
      height: ${theme.shape.iconSize.xLarge}px;
      width: ${theme.shape.iconSize.xLarge}px;
      color: ${theme.palette.text.primary};
    `,
    titleComponent: css`
      align-self: center;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: ${theme.shape.iconSize.xLarge}px;
      // padding-left: ${theme.shape.iconSize.xLarge}px;
      // padding-right: ${theme.shape.iconSize.xLarge}px;
      font-family: ${FONTS.heading};
      font-size: 1.8em;
      font-weight: ${theme.typography.h4.fontWeight};

      padding-left: 0px;
      padding-right: 0px;
    `,
    closeIcon: css`
      right: ${theme.spacing(6)};
      top: 50%;
      margin-top: ${-theme.shape.iconSize.xLarge / 2}px;
      position: absolute;
      height: ${theme.shape.iconSize.xLarge}px;
      width: ${theme.shape.iconSize.xLarge}px;
      margin-left: auto;
      min-width: 0;
      padding: 0;
      background-color: transparent;

      :hover {
        background-color: transparent;
      }

      &.without-title {
        top: ${theme.spacing(8)};
      }
    `,
    closeIconSize: theme.shape.iconSize.xLarge,
    contentWrapper: css`
      padding-bottom: ${hasTitleComponent ? theme.spacing(10) : theme.spacing(6)};
      padding-left: ${noHorizontalPadding ? 0 : theme.spacing(10)};
      padding-right: ${noHorizontalPadding ? 0 : theme.spacing(10)};

      overflow: auto;

      ${theme.breakpoints.down('md')} {
        padding-bottom: ${theme.spacing(4)};
        padding-left: ${noHorizontalPadding ? 0 : theme.spacing(4)};
        padding-right: ${noHorizontalPadding ? 0 : theme.spacing(4)};
      }
    `,
  };
};
