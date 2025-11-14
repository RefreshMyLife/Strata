import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        dialog: css`
            position: absolute;
            top: 10px;
            right: 10px;
            left: 10px;
            background: green;
        `,
        amounts: css`
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            margin-top: 10px;
        `,
        container: css`
            background: rgba(41, 41, 42, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.04);
            box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            padding: ${theme.spacing(2)} ${theme.spacing(3)};

            font-family: 'Chakra Petch', sans-serif;
        `,
        input: css`
            font-size: 2.5em;
            color: white;
             ${theme.breakpoints.down('sm')} {
                min-height:50px !important;
            }
        `,
    };
};
