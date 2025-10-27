import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    logo: css`
      height: 1.4em;
      opacity: .8;
    `,
    right: css`
      display: flex;
      flex-direction: row;
    `,
    group: css`
      display: flex;
      flex-direction: row;
      gap: 2em;
      color: rgba(229, 229, 229, .5);
    `,
    container: css`
      height: ${theme.shape.footerHeight};
      padding: 0 34px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9em;
      border-top: 1px solid #212121;

      ${theme.breakpoints.down('lg')} {
        padding: 0 ${theme.spacing(6)};
      }

      ${theme.breakpoints.down('md')} {
        padding: 0 ${theme.spacing(4)};
        justify-content: space-between;
      }
    `,
    blockInfo: css`
      white-space: nowrap;
      ${theme.breakpoints.down('md')} {
        flex: 1;
      }
    `,
    blockInfoMobileLineBreak: css`
      display: none;

      ${theme.breakpoints.down('md')} {
        display: block;
      }
    `,
    blockInfoNumber: css`
      color: ${theme.palette.text.primary};
    `,
    links: css`
      color: ${theme.palette.text.primary};
      display: flex;
      margin-left: ${theme.spacing(2)};

      white-space: nowrap;

      ${theme.breakpoints.down('md')} {
        margin-left: 0;
      }
    `,
    link: css`
      background-color: transparent;
      transition: background-color 0.3s;
      margin-left: ${theme.spacing(4)};
      display: flex;
      justify-content: center;
      align-items: center;

      color: white;

      white-space: nowrap;

      :hover {
        color: white;
      }

      :active {
        background-color: ${theme.palette.button.dark};
        color: white;
      }
    `,

    badge: css`
      width: 100%;
      a {
        color: white;
        text-decoration: underline;

        &:hover {
          border-bottom: 1px solid var(--color-lavender);
        }
      }
    `,
    theme,
  };
};
