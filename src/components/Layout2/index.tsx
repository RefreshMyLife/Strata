/** @jsxImportSource @emotion/react */
import Box from '@mui/material/Box';
import React from 'react';

import Header2 from './Header2';
import MobileNavigation from './MobileNavigation';
import { PageContainer } from './PageContainer';
import Sidebar from './Sidebar';
import { useStyles } from './styles';

export const Layout2: React.FC = ({ children }) => {
    const styles = useStyles();

    return (
        <div css={styles.layout}>
            <Sidebar />

            <Box
                display="flex"
                flexDirection="column"
                flex="1"
                sx={{ minWidth: 0, overflow: 'auto' }}
            >
                <Header2 />

                <PageContainer>{children}</PageContainer>
            </Box>

            <MobileNavigation />
        </div>
    );
};
