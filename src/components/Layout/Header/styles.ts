import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();

  return {
    appBar: css`
      background-image: none;
      background-color: transparent;
      box-shadow: none;
      padding: 0;
      border: none;
      backdrop-filter: blur(1.5px)

      padding-left: 1.25rem;
      padding-right: 1.25rem;
      margin: 10px;
      box-sizing: border-box;
      width: auto;

      display: flex;
      flex-direction: row;

      ${theme.breakpoints.down('lg')} {
        display: none;
      }
    `,
    toolbarLogo: css`
        padding-left: ${theme.spacing(6)} !important;
        cursor: pointer;
    `,
    toolbar: css`
      justify-content: space-between;
      display: flex;
      flex: 1;

      ${theme.breakpoints.down('lg')} {
        padding-left: ${theme.spacing(6)} !important;
        padding-right: ${theme.spacing(6)} !important;
        display: none;
      }

      ${theme.breakpoints.down('md')} {
        padding: ${theme.spacing(6, 4, 0)} !important;
      }
    `,
    claimStrataButton: css`
      margin-right: 8px;
    `,
    ctaContainer: css`
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 10px;

      ${theme.breakpoints.down('lg')} {
        display: none;
      }
    `,
    logo: css`
      height: 32px;
    `,
    logoMobile: css`
      height: 90%;
      display: none;
    `,
    menu: css`
      display: flex;
      flex-direction: row;
      padding: 0;
      padding-left: 50px !important;
      align-items: center;
    `,
    menuItem: css`
      margin-right: 20px;
      padding: 0;
      border-radius: 5px;
      overflow: hidden;

      cursor: default;
      :hover {
        background: transparent;
      }

      > a {
        color: white;

        // height: 3em;
        // line-height: 3em;
        padding: 8px 20px;

        padding-left: 1em;
        padding-right: 1em;

        text-transform: uppercase;
        font-family: "IBM Plex Mono", sans-serif;
        font-family: ${FONTS.heading};
        font-weight: 400;

        :hover {
          text-decoration: none;
          background:rgba(109, 134, 164, .30);
        }

        &.active-menu-item {
          background:rgba(109, 134, 164, .13);
          pointer-events: none;
        }
      }
    `,
    menuItemSelected: css`

      a {
        color: white
      }
    `,
    menuItemLink: css`
      color: rgba(255, 255, 255, .6);
      text-decoration: none;
    `

  };
};
