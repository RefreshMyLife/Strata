import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

import { Variant } from './types';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const styles = ({ fullWidth, variant }: { fullWidth: boolean; variant: Variant }) => {
  const theme = useTheme();

  const getButtonVariantCss = ({
    variant: refVariant,
    active,
  }: {
    variant: Variant;
    active: boolean;
  }) => {
    if (refVariant === 'secondary') {
      return css`
        border-color: ${theme.palette.button.strokeLight};
        color: ${theme.palette.button.textLight};
        background-color: ${theme.palette.button.light};

        :disabled {
          border-color: ${theme.palette.button.light};
        }

        ${!active &&
        css`
          :hover:not(:disabled) {
            background-color: ${theme.palette.button.main};
            border-color: ${theme.palette.button.main};
            color: ${theme.palette.button.text};
          }
        `}

        ${active &&
        css`
          background-color: ${theme.palette.button.main};
          border-color: ${theme.palette.button.main};
          color: ${theme.palette.button.text};
        `}

        :active:not(:disabled) {
          background-color: ${theme.palette.button.medium};
          border-color: ${theme.palette.button.medium};
          color: rgb(229, 231, 235);
        }
      `;
    }

    if (refVariant === 'tertiary') {
      return css`
        padding-left: ${theme.spacing(5)};
        padding-right: ${theme.spacing(5)};
        color: ${theme.palette.button.textLight};
        background-color: ${theme.palette.secondary.light};
        border-color: ${theme.palette.secondary.light};


        font-family: 'Chakra Petch', sans-serif;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        color: #FFFFFF;
        //text-shadow: 0px 1px 3px rgba(0, 0, 0, 1);

        :disabled {
          background-color: ${theme.palette.button.light};
          border-color: ${theme.palette.button.light};
        }

        .text-icon {
          font-size: 1.6em;
          display: inline-block;
          padding: 0 6px;
          position: relative;
          top: -2px;
        }

        ${!active &&
          css`
            :hover:not(:disabled) {
              background-color: ${theme.palette.secondary.light};
              // border-color: ${theme.palette.interactive.primary};
            }
          `}

          ${active &&
          css`
            background-color: ${theme.palette.text.secondary};
            border-color: ${theme.palette.text.secondary};
          `}

          :active:not(:disabled) {
            background-color: ${theme.palette.secondary.dark};
            border-color: ${theme.palette.text.dark};
            color: white;
          }
        `;
    }

    if (refVariant === 'quaternary') {
      return css`

        span {
          font-size: ${theme.typography.small2.fontSize};
        }

        :hover:not(:disabled),
        :active:not(:disabled) {
          background-color: ${theme.palette.secondary.light};
          border-color: ${theme.palette.secondary.light};
        }

        padding: 11px 16px 10px 12px;
        background:transparent;
        box-shadow: 0px 8.94px 17.87px -1.49px rgba(4, 15, 26, 0.2), 0px 2.23px 5.96px -1.49px rgba(3, 19, 26, 0.4), inset 0px 0.47px 2.98px rgba(255, 255, 255, 0.3), inset 0px -1.98px 1.49px rgba(0, 0, 0, 0.4), inset 0px 5.04px 7.45px rgba(46, 48, 55, 0.2), inset 0px -8.94px 14.89px #15191E;
        border-radius: 4px;
        padding: 0 1em !important;
        letter-spacing: 1px;
        text-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border: 1px solid transparent;

        ${active &&
        css`
          background-color: transparent;
          box-shadow: none;

          :not(:hover, :active) {
            color: rgba(150, 160, 177, .7);
          }

          :hover {
            color: ${theme.palette.text.secondary};
          }
        `}
      `;
    }

    if (refVariant === 'quinary') {
      return css`
        padding: ${theme.spacing(2, 5)};
        //height: ${theme.spacing(8)};
        background-color:rgb(21, 27, 31);
        border-color: rgb(21, 27, 31);
        border-radius: 5px;
        border-color: none;
        color: rgba(255,255,255, 0.92);
        font-family: ${FONTS.heading};
        box-sizing: border-box;

        :disabled {
          background-color: ${theme.palette.secondary.main};
          border-color: ${theme.palette.button.light};
        }

        ${!active &&
        css`
          :hover:not(:disabled) {
            background-color: ${theme.palette.button.light};
            border-color: transparent;
          }
        `}

        ${active &&
        css`
          background-color: ${theme.palette.interactive.primary};
          border-color: ${theme.palette.interactive.primary};
          color: rgb(229, 231, 235);
        `}

        :active:not(:disabled) {
          background-color: ${theme.palette.interactive.primary};
          border-color: ${theme.palette.interactive.primary};

          background-color:rgb(21, 27, 31);
          border-color: rgb(21, 27, 31);
          color: rgb(229, 231, 235);
        }

        &.gray {
         color: #B4B4B2;
        }
        &.sm {
          padding: 2px 14px;
          height: auto;
        }
        .icon {
          margin-left: .5em;
          position: relative;
          top: 1px;
        }
      `;
    }

    if (refVariant === 'senary') {
      return css`
        border: none;
        height: auto;
        background: white;
        color: #0E0C15;
        width: auto;
        display: inline-block;
        font-family: 'Chakra Petch', sans-serif;
        font-size: 1em;
        transition: box-shadow 100ms linear;
        box-shadow: inset 0px -4px 4.1px rgba(0, 0, 0, 0), inset 0px 4px 12px rgba(0, 0, 0, 0);

        :disabled {
          background-color: ${theme.palette.secondary.main};
          border-color: ${theme.palette.button.light};
        }

        ${!active && css`
          :hover:not(:disabled) {
            box-shadow: inset 0px -4px 4.1px rgba(0, 0, 0, 0.25), inset 0px 4px 12px rgba(0, 0, 0, 0.61);
          }
        `}

        ${active && css`
          background-color: ${theme.palette.secondary.main};
          border-color: ${theme.palette.interactive.primary};
        `}

        :active:not(:disabled) {
          background-color: white;
          box-shadow: inset 0px -4px 4.1px rgba(0, 0, 0, 0), inset 0px 4px 12px rgba(0, 0, 0, 0);
        }
      `;
    }

    if (refVariant === 'text') {
      return css`
        background-color: #132236;
        color: #D4D4D8;
        width: auto;
        display: inline-block;
        font-family: 'Chakra Petch', sans-serif;
        font-size: 1em;
        border-radius: 5px;

        transition: background-color 200ms linear, box-shadow 100ms linear;

        background: #132236;
        color: #D4D4D8;
        width: auto;
        display: inline-block;
        font-family: 'Chakra Petch', sans-serif;
        font-size: 1em;
        font-weight: 300 !important;
        text-align: center;

        > span {
          font-weight: 300;
        }
        height: auto;
        padding-top: 5px;
        padding-bottom: 5px;

        &.gray {
          background-color: #141B24;
        }

        ${!active &&
        css`
          :hover:not(:disabled) {
            background-color: rgba(19, 34, 54, 0.8);
            box-shadow: inset 0px 0.47px 2.98px rgba(57, 145, 254, 0.3), inset 0px -1.98px 1.49px rgba(18, 21, 25, 0.4), inset 0px 5.04px 7.45px rgba(59, 118, 190, 0.2), inset 0px -8.94px 14.89px #111A25;

          }
        `}

        ${active &&
        css`

        `}

        ${fullWidth &&
        css`
          width: 100%;
          display: block;
        `};

        :disabled {
          opacity: 0.8;
        }

        :active:not(:disabled) {

        }

        &.transparent {
          font-family: ${FONTS.space};
          background-color: transparent;

          :hover {
            background-color: transparent;
            box-shadow: none;
            > span {
              text-decoration: underline;
            }
          }
        }
        &.green {
          color: #01B876;
        }
        &.blue {
          color: #329EE1;
        }

      `;
    }

    // Primary variant
    return css`
      background-color: ${theme.palette.button.main};
      border-color: ${theme.palette.button.stroke};
      border: none;
      color: ${theme.palette.button.text};
      // transition: all 200ms linear;

      background: #20B1FF;
      box-shadow: 0px 0px 250px 44px rgba(24, 70, 87, 0.25), 0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2), 0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4), inset 0px 0.47px 2.98px #383C42, inset 0px -1.98px 1.49px #005685, inset 0px 5.04px 7.45px #0085CC, inset 0px -8.94px 14.89px #007DC0;
      border-radius: 5px;
      color: white;
      font-family: 'Chakra Petch', sans-serif;


      :disabled {
        background-color: ${theme.palette.button.light};
        border-color: ${theme.palette.button.light};
        box-shadow: none;

        background: #444F56;
        box-shadow: inset 0px 0px 20px 44px rgba(0, 0, 0, 0.25), inset 0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4);
        border-radius: 5px;


      }

      ${!active &&
      css`
        :hover:not(:disabled) {
          background: linear-gradient(90deg, #807CF4 0%, #3DF0ED 100%);
          box-shadow: 0px 0px 250px 44px rgba(24, 70, 87, 0.25), 0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2), 0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4), inset 0px 0.47px 2.98px #383C42, inset 0px -1.98px 1.49px #005685, inset 0px 5.04px 7.45px #0085CC, inset 0px -8.94px 14.89px #007DC0;

        }
      `}

      ${active &&
      css`
        background-color: ${theme.palette.button.medium};
        border-color: ${theme.palette.button.medium};
      `}

      :active:not(:disabled) {
          background: linear-gradient(90deg, rgba(18, 153, 201, 0.5) 0%, rgba(18, 153, 201, 0.5) 100%);
          box-shadow: 0px 0px 250px 44px rgba(24, 70, 87, 0.25), 0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4), inset 0px 0.47px 2.98px #383C42, inset 0px -1.98px 10.7px #005685, inset 0px 5.04px 7.45px rgba(12, 71, 102, 0.6), inset 0px -8.94px 14.89px rgba(12, 79, 115, 0.7);
      }
    `;
  };

  return {
    getButton: ({ disabled, active }: { disabled: boolean; active: boolean }) => css`
      border-radius: 5px;
      padding: 10px 24px;
      height: ${theme.spacing(10)};
      border: 1px solid transparent;
      background-color: transparent;
      box-shadow: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.palette.text.primary};
      // transition:
      //   background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      //   border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      //   color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      :disabled {
        color: ${theme.palette.text.secondary};
      }

      ${!disabled &&
      css`
        cursor: pointer;
      `}

      ${fullWidth &&
      css`
        width: 100%;
      `};

      ${getButtonVariantCss({ variant, active })};
    `,
    loadingIcon: css`
      margin-right: ${theme.spacing(2)};
      margin-top: -3px;
      margin-bottom: -3px;
    `,
    label: css`
      display: inline-flex;
      align-items: center;
      font-weight: ${ variant === 'quinary' ? 400 : 600};
      color: inherit;
      //font-size: ${variant === 'primary' || variant === 'secondary' ? theme.typography.body1.fontSize : theme.typography.small1.fontSize};
      font-size: ${ theme.typography.body1.fontSize };
      font-family: inherit;
    `,
    link: css`
      font-weight: 600;

      &:hover {
        text-decoration: none;
      }
    `,
  };
};

export default styles;
