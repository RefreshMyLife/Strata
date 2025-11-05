import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return {
    drawer: css`
      display: block;
      width: ${theme.shape.drawerWidthDesktop};


      > .MuiDrawer-paper {
        border: none;
        background: ${theme.palette.background.default};
      }

      ${theme.breakpoints.down('xl')} {
        width: ${theme.shape.drawerWidthTablet};
      }
      ${theme.breakpoints.down('lg')} {
        display: none;
      }
    `,
    drawerContent: css`
      width: ${theme.shape.drawerWidthDesktop};
      ${theme.breakpoints.down('xl')} {
        width: ${theme.shape.drawerWidthTablet};
      }
      display: block;
      z-index: 1000;
      position: sticky;
      top: 0;
      left: 0;
    `,
    toolbar: css`
      display: flex;
      justify-content: center;
      padding: ${theme.spacing(10, 8, 12)};
      min-height: 0;
      ${theme.breakpoints.down('lg')} {
        min-height: initial;
      }
      ${theme.breakpoints.down('sm')} {
        padding-left: initial;
        padding-right: initial;
      }
      .MuiButton-text {
        padding: 0;
        min-width: 0;
      }
      ${theme.breakpoints.down('xl')} {
        padding-left: 15px !important;
        padding-right: 0 !important;
      }
    `,
    listItem: css`
      transition: color 0.3s;
      padding: 0;

      :hover {
        background-color: transparent;
      }

      :hover > a {
        background-color: ${theme.palette.secondary.light};
      }

      a {
        padding: ${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(3)} ${theme.spacing(8)};
        margin: 1px 0px;
        display: inline-flex;
        justify-content: start;
        align-items: center;
        width: 100%;
        text-decoration: none;
        border-radius: 5px;


        ${theme.breakpoints.down('xl')} {
          width: auto;
          margin: auto;
          border-radius: ${theme.shape.borderRadius.medium}px;
          padding: ${theme.spacing(4)};
          justify-content: center;
        }

        ${theme.breakpoints.down('lg')} {
          border-radius: 0;
        }
      }

      .active-menu-item {
        background-color: ${theme.palette.secondary.light};
        cursor: default;

        .left-border {
          border: 2px solid ${theme.palette.interactive.primary};
          border-radius: 0 ${theme.shape.borderRadius.small}px ${theme.shape.borderRadius.small}px 0;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;

          ${theme.breakpoints.down('xl')} {
            display: none;
          }
        }
        svg {
          color: ${theme.palette.button.main};
        }
        p, span {
          color: ${theme.palette.text.primary};
        }
      }
    `,
    listItemIcon: css`
      min-width: ${theme.spacing(8)};
      ${theme.breakpoints.down('xl')} {
        min-width: 0;
        justify-content: center;
      }
      color: inherit;
      svg {
        height: ${theme.spacing(5)};
        width: ${theme.spacing(5)};
      }
    `,
    listItemText: css`
      display: block;
      color: var(--color-text-main);
      position: relative;

      ${theme.breakpoints.down('xl')} {
        display: none;
      }
      ${theme.breakpoints.down('lg')} {
        display: block;
        color: var(--color-text-main);
      }
    `,
    listItemNewBadge: css`
      border: 1px solid ${theme.palette.interactive.success};
      background-color: ${theme.palette.interactive.success10};
      border-radius: ${theme.spacing(1)};
      height: ${theme.spacing(5)};
      display: flex;
      align-items: center;
      padding: ${theme.spacing(0, 1)};
      margin-left: ${theme.spacing(3)};

      ${theme.breakpoints.down('xl')} {
        display: none;
      }

      ${theme.breakpoints.down('lg')} {
        display: flex;
      }
    `,
    listItemNewBadgeText: css`
      font-weight: 400;
      color: ${theme.palette.interactive.success};
      margin-top: 1px;
    `,
    logo: css`
      display: block;
      width: 90%;
      //max-height: 40px;
      //height: 24px;
      padding-left: 15px;
      ${theme.breakpoints.down('xl')} {
        display: none;
      }
      ${theme.breakpoints.down('sm')} {
        display: none;
      }
    `,
    logoClosed: css`
      display: none;
      width: 100%;
      ${theme.breakpoints.down('xl')} {
        display: block;
      }
    `,
    mobileMenuBox: css`
      display: none;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing(4)};
      @media (max-width: 970px) {
        display: flex;
      }
    `,
    mobileLogo: css`
      flex-shrink: 0;
      height: 30px;
      width: auto;
    `,
    burger: css`
      height: ${theme.spacing(6)};
      width: ${theme.spacing(6)};
    `,
    rightMenu: css`
      display: flex;
      align-items: center;
     
    `,
    mobileMenu: css`
     
      .MuiMenu-list {
        display: flex;
        flex-direction: column;
        padding: 0 !important;
       
      }

      > .MuiPaper-root {
        background-color: ${theme.palette.background.default};
        height: 100vh;
        max-height: 100vh;
        width: 100vw;
        max-width: 100vw;
        border-radius: 0;
        border: 0;
        box-shadow: none;
        padding: ${theme.spacing(0, 0, 16)};
        top: 0 !important;
       
      }
     
    `,
    mobileListItem: css`
      
      a {
        color: ${theme.palette.text.primary};
        display: flex;
        flex-direction: row;
        flex: 1;
        padding-top: ${theme.spacing(4)};
        padding-bottom: ${theme.spacing(4)};
        justify-content: space-between;
        padding-left: ${theme.spacing(6)};
        padding-right: ${theme.spacing(6)};
        
        position: relative;
        
      }
      //   ::after {
      //   content: "";
      //   position: absolute;
      //   bottom: 0;
      //   left: 50%;
      //   transform: translateX(-50%);
      //   width: 98%; 
      //   height: 1px;
      //   background: rgba(255, 255, 255, 0.08);
      // }
      // :last-child::after {
      //   content: none;
      // }
      :hover {
        margin-left: 0;
        margin-right: 0;
        border-radius: 0;
        text-decoration: none;
      }
      .active-mobile-menu-item {
        background-color: ${theme.palette.secondary.light};
        span.MuiTypography-root {
          color: ${theme.palette.interactive.primary} !important;
        }
        svg {
          color: ${theme.palette.interactive.primary};
        }
      }
    `,
    mobileListItemText: css`
      //color: ${theme.palette.text.primary};
    `,
    mobileArrow: css`
      height: ${theme.spacing(6)};
      width: ${theme.spacing(6)};
    `,
    mobileLabel: css`
      flex-direction: row;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      svg {
        margin-right: ${theme.spacing(4)};
      }
    `,
    flexRow: css`
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `,
    doublePadding: css`
      padding: ${theme.spacing(2)} ${theme.spacing(4)};
    `,
    actionButton: css`
      flex-shrink: 0;
      width: ${theme.spacing(10)};
      cursor: pointer;
      box-shadow: none;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;
      padding: 0;
    `,
    mobileConnectButton: css`
      margin-left: ${theme.spacing(8)};
      margin-right: ${theme.spacing(8)};
     
      font-size: ${theme.typography.small1.fontSize};
      border-width: 2px;
      margin: 0;
      width: auto;

      @media(max-width:767px){
         width:122px !important;
      }
    `,
    claimRewardButton: css`
      margin: ${theme.spacing(4, 4, 0, 4)};
    `,
    mobileSelectChainButton: css`

    margin: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    min-width: 48px;
    `,
    sidebarFooter: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-conntent: space-between;
      width: 100%;
      padding: ${theme.spacing(6)} ${theme.spacing(4)};
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    `,
    socialIcons: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${theme.spacing(6)};
    `,
    socialLink: css`
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s;

      :hover {
        opacity: 0.7;
      }
    `,
    socialIcon: css`
      width: 24px;
      height: 24px;
      opacity:0.5;
    `,
    copyright: css`
      margin-top: 20px;
      rgba(144, 160, 172, 0.8)
      font-size: 14px;
      font-weight:500;
      text-align: center;
      line-height: 140%;
      font-family: 'Chakra Petch', sans-serif;
    `,
  };
};
