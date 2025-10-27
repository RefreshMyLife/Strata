import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: ${theme.spacing(8)};
      column-gap: ${theme.spacing(8)};

      border: 1px solid var(--color-stroke-blue);
      border-radius: 20px;
      background: var(--color-bg-modal);
      box-shadow: 0px 0px 250px 44px rgba(24, 70, 87, 0.25), 0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2), 0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4), inset 0px 0.47px 2.98px #383C42, inset 0px -1.98px 1.49px #101216, inset 0px 5.04px 7.45px #2E3037, inset 0px -8.94px 14.89px #15191E;

      max-width: 952px;
      margin: 0 auto;

      padding: 2em;

      ${theme.breakpoints.down('xl')} {
        grid-template-columns: 1fr;
      }
    `,
    faqContainer: css`
        display: grid;
        grid-template-columns: 2fr 3fr;
        row-gap: ${theme.spacing(8)};
        column-gap: ${theme.spacing(8)};

        padding: 2em;

        ${theme.breakpoints.down('xl')} {
          grid-template-columns: 1fr;
        }
    `,
    faqContainerInfo: css`
      font-family: ${FONTS.heading};


      .title1 {
          font-size: 3.4em;
          font-weight: 400;
          color: rgba(255,255,255,1);
      }
      .title2 {
        font-size: 3.4em;
        color: rgba(255,255,255,.6);
        line-height: 1;
        padding-bottom: .8em;
      }
      button {
        margin-top: 1em;
        color: black;
        display: block;
        font-size: .7em;
        height: auto;

        > span { font-weight: 100; font-size: 1rem; display: block; }
      }
    `,
    infoContainer: css`
      font-family: ${FONTS.heading};
      text-align: center;
      padding-top: ${theme.spacing(16)};
      padding-bottom: ${theme.spacing(8)};
      border: none;
    `,
    headerStars: css`
      vertical-align: top;
    `,
    headerStrats: css`
      font-size: 2.8em;
      background: linear-gradient(90deg, #2FAFFF 1.76%, #18BDD6 49.46%, #18BDD6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    `,
    headerText: css`
      font-size: 2.8em;
    `,
    headerBlue: css`
      color: #329EE1;
    `,
    infoText: css`
      font-size: 1.2em;
      font-weight: 100;
      font-family: 'Space Grotesk', sans-serif;
      color: #C6D0DD;
      margin-top: 1em;
      margin-bottom: 3em;
    `,
    maximizeContainer: css`
      font-family: ${FONTS.heading};
      text-align: center;
      padding: ${theme.spacing(26)} 0px;
      padding-top: ${theme.spacing(34)};
    `,
    button: css`
      background: white;
      color: black;
      width: auto;
      display: inline-block;
      font-family: 'Chakra Petch', sans-serif;
      font-size: 1em;
    `,
    buttonDark: css`

    `,

    accordion: css`
        border-radius: 20px;
        background: rgba(12, 19, 26, 0.5);
        border: 1px solid #1E2A3A;
        margin-bottom: 1em;
        padding: 8px 12px;
        font-size: Space Grotesk, sans-serif;

        &:last-of-type {
          .accordion-button {
            // Only set a border-width/border-radius on the last item if
            // the accordion is collapsed
            &.collapsed {
              border-bottom-width: 1px;
            }
          }

          .accordion-collapse {
            border-bottom-width: 1px;
          }
        }

       .accordion-button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 10px 10px;
          background-color: transparent;
          border: 0;
          border-radius: 0;
          overflow-anchor: none;
          outline: none;
          position: relative;
          transition: all .4s ease;
          cursor: pointer;

          &.collapsed {
            border-bottom-width: 0;
            &::after {
              background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTkgMTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5IDE5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I2ZmZjtzdHJva2U6I2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cjwvc3R5bGU+CjxsaW5lIGNsYXNzPSJzdDAiIHgxPSI5LjUiIHkxPSIwIiB4Mj0iOS41IiB5Mj0iMTkiLz4KPGxpbmUgY2xhc3M9InN0MCIgeDE9IjAiIHkxPSI5LjUiIHgyPSIxOSIgeTI9IjkuNSIvPgo8L3N2Zz4K");
            }
          }

          &:not(.collapsed) {
            &::after {
              background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOSAxOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTkgMTk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM1OTU5NUI7c3Ryb2tlOiM1ODU5NUI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KPC9zdHlsZT4NCjxsaW5lIGNsYXNzPSJzdDAiIHgxPSIwIiB5MT0iOS41IiB4Mj0iMTkiIHkyPSI5LjUiLz4NCjwvc3ZnPg0K");
              transform: rotate(180deg);
            }
          }

          &::after {
            content: "";
            width: 19px;
            height: 19px;
            background-repeat: no-repeat;
            position: absolute;
            right: 10px;
            transition: all 0.4s ease;
          }
        }
      }
      .accordion-body {
        transition: all 0.4s ease;
        max-height: 200px !important;
        overflow: hidden;
        padding: 0 12px;

        &.collapsed {
          max-height: 0 !important;
        }
      }
    `,

    shareHead: css`
      margin-bottom: 2em;
    `,
    shareTitleHint: css`
      color: #586770;
    `,
    shareTitle: css`
      color: #E7E7E7;
      font-size: 1.8em;
      font-family: ${FONTS.heading};
      line-height: 1.1;
    `,
    shareInput: css`
      background:rgba(36, 44, 49, .7);
      border-radius: 10px;
      padding: 12px 20px;
      letter-spacing: .5px;
      font-family: 'Chakra Petch', sans-serif;

      svg {
        height: 1.6em;
        width: auto;
        vertical-align: middle;
        cursor: pointer;
      }
    `,
    copyIcon: css`

    `,
    optionsButton: css`
      height: 100%;
      position: relative;

      padding: 10px;
      background: #0F1820;
    `,
    tableAction: css`
      width: 120px;
    `,

    shareInfo: css`
      margin-top: 1.5em;
      font-family: ${FONTS.heading};
      border: 1px solid rgba(31, 43, 54, .4);
      border-radius: 12px;
      padding: 12px 20px;
    `,
    shareInfoTitle: css`
      color: white;
      margin-bottom: 0.5em;
    `,
    shareInfoDescription: css`
      color: #C6D0DD;
      font-size: 1.1em;
      font-family: ${FONTS.labels};
    `,
  };
};
