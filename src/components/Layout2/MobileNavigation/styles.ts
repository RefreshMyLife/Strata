import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    paper: css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 1);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0px !important;
      display: none;
      max-height:74px;
      padding: 0px;
      @media (max-width: 970px) {
        display: block;
      }
    `,
    bottomNavigation: css`
      background: transparent;
      height: 72px;

      .MuiBottomNavigationAction-root {
        color: rgba(144, 160, 172, 0.8);
        min-width: 60px;
        padding: 6px 20px 8px;
        transition: color 0.3s ease;

        @media (max-width: 768px) {
          padding: 6px 16px 8px;
        }

        @media (max-width: 480px) {
          padding: 6px 0px 8px;
           & > :nth-child(2) {
            width:85px;
          }
                  
        }



        .MuiBottomNavigationAction-label {
          font-size: 14px !important;

          &.Mui-selected {
            font-size: 14px !important;
            @media (max-width: 510px) {
              font-size: 14px !important;
            }  
          }
           @media (max-width: 510px) {
            font-size: 14px !important;
          }  
        }

        &.Mui-selected {
          color: rgba(255, 255, 255, 1);

          svg path{
            fill: rgba(255, 255, 255, 1);
            opacity: 1;
          }
        }

        &:hover:not(.Mui-selected) {
          color: rgba(255, 255, 255, 1);

          svg {
            fill: rgba(255, 255, 255, 1);
            opacity: 1;
          }
        }
      }
    `,
    navigationAction: css`
      font-family: "Chakra Petch", sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.04em;
      text-transform: uppercase;

      svg{
       margin-bottom:5px;
        path{

          margin-bottom: 4px;
          fill: rgba(144, 160, 172, 0.8);
          opacity: 0.8;
          transition: fill 0.3s ease, opacity 0.3s ease;
        }
      }  
    `
  };
};

export const useMobileNavigationSpacing = () => {
  return css`
    @media (max-width: 940px) {
      padding-bottom: 160px; /* 72px навигация + 16px дополнительный отступ */
    }
  `;
};