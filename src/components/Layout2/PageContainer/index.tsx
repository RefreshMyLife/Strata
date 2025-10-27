/** @jsxImportSource @emotion/react */
import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';

import { useStyles } from './styles';
import Footer2 from '../Footer2';
import BorderedContainer from '../../BorderedContainer';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  const styles = useStyles();
  return (
    <>
      <Box component="main" css={styles.main}>
        <BorderedContainer>
          {children}
        </BorderedContainer>
      </Box>
      <Box component="footer" css={styles.footer}>
        <Footer2 />
      </Box>
    </>
  );
};
