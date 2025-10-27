/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PrimaryButton } from 'components';
import React from 'react';
import { useTranslation } from 'translation';

import { useAuth } from 'context/AuthContext';


import BannerP1 from 'assets/img/banner_p1.svg';
import BannerP2 from 'assets/img/banner_p2.svg';

import { useStyles } from './styles';

export interface ConnectWalletBannerUiProps {
  isWalletConnected: boolean;
  openAuthModal: () => void;
}

export const ConnectWalletBannerUi: React.FC<ConnectWalletBannerUiProps> = ({
  isWalletConnected,
  openAuthModal,
  ...containerProps
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  if (isWalletConnected) {
    return null;
  }

  return (
    <Paper css={styles.container} {...containerProps}>


      <div css={styles.illustrationContainer}>
        <img src={BannerP1} style={{position: 'absolute', left: '0px', height: '100%'}} css={ styles.illustration1 }/>

        {/* <img
          src={illustration}
          css={styles.illustration}
          alt={t('dashboard.connectWalletBanner.illustration.alt')}
        /> */}
        <img src={BannerP2} style={{position: 'absolute', right: '0px', height: '100%'}} css={ styles.illustration2 }/>
      </div>

      <div css={styles.content}>
        <div css={styles.contentText}>
          <Typography variant="h4" css={styles.title}>
            {t('dashboard.connectWalletBanner.title')}
          </Typography>
          <PrimaryButton css={styles.button} onClick={openAuthModal}>
            {t('dashboard.connectWalletBanner.buttonLabel')}
          </PrimaryButton>
        </div>
      </div>




    </Paper>
  );
};

const ConnectWalletBanner: React.FC = () => {
  const { accountAddress, openAuthModal } = useAuth();

  return (
    <ConnectWalletBannerUi isWalletConnected={!!accountAddress} openAuthModal={openAuthModal} />
  );
};

export default ConnectWalletBanner;
