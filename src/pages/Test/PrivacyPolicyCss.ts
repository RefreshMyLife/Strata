import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';

export const useStyles = () => {
  const theme = useTheme();
  return {
    closeButton: css`
        position: absolute;
        top: 38px;
        right: 18px;
    `,
    docs: css`
        max-width: 1000px;
        margin: 0 auto;
        font-size: 16px;
        font-family: ${FONTS.space};
        background: rgba(29, 29, 29, .7);
        padding: 2em 2.5em;
        margin-bottom: 2em;
        position: relative;

        p {
            color: rgb(230, 230, 230);
        }
        hr {
            margin: 2em 0;
            height: 0;
            color: rgb(56, 58, 59);
            border-top-width: 1px;
            border-color: rgb(56, 58, 59);
        }

        table {
            margin: 2em 0;
            border: 1px solid rgb(43, 44, 44);
            thead {
                background: rgb(43, 44, 44);
            }
        }
        td, th {
            border: 1px solid rgb(43, 44, 44);
            padding: 0.8em;
        }

        h3 {
            margin: 1em 0;
        }
    `,
  };
};
