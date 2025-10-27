/** @jsxImportSource @emotion/react */
import { Fade, Paper } from '@mui/material';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { useStyles } from './PrivacyPolicyCss';

export const Test: React.FC<RouteComponentProps> = ({ history, location }) => {
    const styles = useStyles();
    return (
        <Paper css={styles.docs}>
            <h1>Test Page</h1>
        </Paper>
    );
};
