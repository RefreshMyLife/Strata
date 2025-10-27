
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
         @media(max-width: 600px){
          width: 100% !important;
        }
      }
      .MuiTooltip-arrow {
        color: #444;
      }
    }
  `;
};

export const useDialogStyles = () => {
  const theme = useTheme();
  
  return {
    paper: {
      margin: 0,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      borderRadius: '16px 16px 0 0',
      backgroundColor: theme.palette.background.paper || '#1a1a1a',
      maxWidth: '100% !important',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
      position: 'relative',
      padding: theme.spacing(3),
    },
    closeButton: {
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.text.disabled || '#666',
    },
    mobileTitle: {
      color: theme.palette.text.primary || '#fff',
      fontSize: '18px',
      fontWeight: 600,
      paddingRight: theme.spacing(4),
      marginBottom: theme.spacing(6),
    },
    content: {
      color: theme.palette.text.primary || '#fff',
      fontSize: theme.typography.body2?.fontSize || '14px',
      padding: '0',
      lineHeight: 1.6,
    },
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: '#2a2a2a',
      color: '#fff',
      textTransform: 'none',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: '#3a3a3a',
      },
    },
  };
};