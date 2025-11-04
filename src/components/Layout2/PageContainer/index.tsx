/** @jsxImportSource @emotion/react */
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router';

import { useStyles } from './styles';
import Footer2 from '../Footer2';
import BorderedContainer from '../../BorderedContainer';
import { Subdirectory } from 'src/constants/routing';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  const styles = useStyles();
  const location = useLocation();
  const isDashboard = location.pathname.includes(Subdirectory.DASHBOARD);

  return (
    <>
      <Box component="main" css={styles.main}>
        <BorderedContainer>
          {children}
        </BorderedContainer>
      </Box>
      <Box component="footer" css={[styles.footer, isDashboard && styles.dashboardFooter]}>
        <Footer2 />
      </Box>
    </>
  );
};
