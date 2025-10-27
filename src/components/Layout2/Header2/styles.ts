import { css } from '@emotion/react';
import { useTheme } from '@mui/material';


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

      padding-bottom: 10px;
      margin: 10px;
      box-sizing: border-box;
      width: auto;

      display: flex;
      flex-direction: row;
      align-items: center;

      ${theme.breakpoints.down('md')} {
        margin: 5px;
        padding-bottom: 5px;
      }

      @media (max-width: 970px) {
        display: none;
      }
    `,
    toolbarLogo: css`
        padding-left: ${theme.spacing(6)} !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        
         padding-bottom: 5px;
        padding-top: 0px;
        ${theme.breakpoints.down('md')} {
          padding-left: ${theme.spacing(2)} !important;
        }
    `,
    toolbar: css`
      justify-content: space-between;
      display: flex;
      align-items: center;
      flex: 1;
      margin-right:10px;

      ${theme.breakpoints.down('md')} {
        margin-right: 5px;
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

      ${theme.breakpoints.down('md')} {
        gap: 5px;
      }
    `,
    logo: css`
      height: 32px;

      ${theme.breakpoints.down('md')} {
        display: none;
      }
    `,
    logoMobile: css`
      height: 90%;
      display: none;

      ${theme.breakpoints.down('md')} {
        display: block;
        height: 24px;
      }
    `,
    menu: css`
      display: flex;
      flex-direction: row;
      padding: 0;
      padding-right: 10px
      padding-left: 50px !important;
      align-items: center;
      gap: clamp(20px, 2vw, 32px);

      ${theme.breakpoints.down('md')} {
        padding-left: 10px !important;
        padding-right: 5px;
        gap: clamp(8px, 1.5vw, 16px);
        flex: 1;
      }
    `,
    menuItem: css`
      padding: 0;
      border-radius: 5px;
      overflow: hidden;

      cursor: default;
      :hover {
        background: transparent;
      }

      > a {
        color: rgba(144, 160, 172, 0.8);

        // height: 3em;
        // line-height: 3em;


        text-transform: uppercase;
        font-family: "Chakra Petch", sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 140%;
        letter-spacing: 0.04em;
        color: rgba(144, 160, 172, 0.8);

        :hover {
          text-decoration: none;
          color: rgba(255, 255, 255, 1);
        }

        &.active-menu-item {
          color: rgba(255, 255, 255, 1);
          pointer-events: none;
        }

        ${theme.breakpoints.down('md')} {
          font-size: 11px;
          letter-spacing: 0.02em;
          padding: 4px 8px;
        }
      }
    `,
    menuItemSelected: css`
      a {
        color: rgba(255, 255, 255, 1) !important;
      }
    `,
    menuItemLink: css`
      color: rgba(255, 255, 255, .6);
      text-decoration: none;
    `,
    menuItemBadge: css`
        background: rgba(15, 43, 58, 1);
        border-radius: 5px;
        color: rgba(32, 176, 253, 1);
        padding: 2px 6px;
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: .7em;
        leading-trim: NONE;
        letter-spacing: 0%;
        vertical-align: top;
        margin-left: 5px;

        ${theme.breakpoints.down('md')} {
          padding: 1px 4px;
          font-size: .65em;
          margin-left: 3px;
        }
    `
  };
};
