import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();
  return css`
    .MuiTooltip-popper {
      .MuiTooltip-tooltip {
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: ${theme.spacing(3)};
        background-color: ${theme.palette.secondary.light};
        font-size: ${theme.typography.small2.fontSize};
        font-weight: ${theme.typography.small2.fontWeight};
        padding: ${theme.spacing(3)};
        color: ${theme.palette.text.primary};
        z-index: 99999;
        position: relative;
        background: #444;
      }
      .MuiTooltip-arrow {
        color: #444;
      }
    }
  `;
};
