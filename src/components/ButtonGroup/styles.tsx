import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const styles = () => {
  const theme = useTheme();

  return {
    getContainer: ({ fullWidth }: { fullWidth: boolean }) => css`
      display: flex;
      align-items: center;

      ${fullWidth &&
      css`
        width: 100%;
      `}

      ${theme.breakpoints.down('sm')} {
        width: 100%;
      }
    `,
    getButton: ({
      active,
      last,
      fullWidth,
      tags = false
    }: {
      active: boolean;
      last: boolean;
      fullWidth: boolean;
      tags?: boolean;
    }) => css`
      span {
        font-size: ${theme.typography.small2.fontSize};
      }

      :hover:not(:disabled),
      :active:not(:disabled) {
        background-color: ${theme.palette.secondary.light};
        border-color: ${theme.palette.secondary.light};
      }

      background: transparent;
      border-radius: 5px;
      padding: 14px 24px;
      height: 50px;
      gap: 8px;

      span {
        font-family: 'Chakra Petch', sans-serif;
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        text-align: center;
      }

      ${tags &&
      css`
        background: rgba(26, 34, 41, 1) !important;
        border: none !important;
        padding: 5px 10px !important;
        height: auto;
        border-radius: 5px;
        
        /* Override the tertiary button's textLight color directly */
        && {
          color: white !important;
        }
        
        /* Force white on all child elements */
        * {
          color: white !important;
        }

        span {
          font-family: 'Chakra Petch', sans-serif !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          line-height: 140% !important;
          text-align: center;
          vertical-align: middle;
          color: white !important;
        }
      `}


      ${fullWidth &&
      css`
        flex: 1;
      `}

      ${!last &&
      css`
        margin-right: ${theme.spacing(2)};
      `};

      ${active &&
      css`
        pointer-events: none;
        position: relative;
        background: rgba(26, 34, 41, 1) !important;
        border: 1px solid transparent;
        border-radius: 5px;
        padding: 14px 24px;
        box-shadow: 
          0px -8.94px 14.89px 0px rgba(21, 25, 30, 1) inset,
          0px 4.04px 7.9px 0px rgba(46, 48, 55, 0.6) inset,
          0px -1.98px 1.49px 0px rgba(16, 18, 22, 1) inset,
          0px 0.47px 2.98px 0px rgba(56, 60, 66, 1) inset,
          0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
          0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2);
        
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(96.07deg, rgba(61, 240, 237, 0.54) 37.57%, rgba(0, 153, 255, 0.4) 61.43%);
          border-radius: 5px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
        }
        
        span {
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
          color: white;
          position: relative;
          z-index: 1;
        }
      `}

      ${!active &&
      css`
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset;
        border-radius: 5px;
        padding: 14px 24px;

        :not(:hover, :active) {
          color: rgba(144, 160, 172, 0.5);
        }

        :hover {
          color: ${theme.palette.text.secondary};
        }
        
        span {
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 140%;
          text-align: center;
        }

        ${tags &&
        css`
          :not(:hover, :active) {
            color: rgba(255, 255, 255, 1) !important;
          }

          :hover {
            color: rgba(255, 255, 255, 1) !important;
          }
          
          span {
            color: rgba(255, 255, 255, 1) !important;
          }
        `}
      `};

      ${theme.breakpoints.down('sm')} {
        flex: 1;
      }
    `,
  };
};

export default styles;
