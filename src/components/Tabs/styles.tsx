import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const styles = () => {
  const theme = useTheme();

  return {
    tabsContainer: css`
      padding: 0px 0px;
      background: transparent;
      border: none;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `,
    buttonsContainer: css`
      display: flex;
      align-items: center;
      margin-bottom: ${theme.spacing(8)};
      width: 100%;

      > button {
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
      }

      ${theme.breakpoints.down('sm')} {
        width: 100%;
      }
    `,
  };
};

export default styles;
