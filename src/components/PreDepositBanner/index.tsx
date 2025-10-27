/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { LinkButton, PrimaryButton } from 'components';
import React from 'react';
import { useTranslation } from 'translation';

import { useAuth } from 'context/AuthContext';

import illustration from './illustration.png';
import { useStyles } from './styles';
import config from 'src/config';
import { ChainId } from 'src/packages/contracts';
import { routes } from 'src/constants/routing';
//import { ChainId } from '../../types';

export interface PreDepositBannerUiProps {

}

export const PreDepositBannerUi: React.FC<PreDepositBannerUiProps> = ({
  ...containerProps
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  if (config.chainId !== ChainId.BSC_MAINNET) {
    return null;
  }

  return (
    <Paper css={styles.container} {...containerProps}>
      <div css={styles.content}>
        <Typography variant="h4" css={styles.title}>
          {t('dashboard.preDepositBanner.title')}
        </Typography>

        <Typography css={styles.description}>
          {t('dashboard.preDepositBanner.description')}
        </Typography>

        <LinkButton css={styles.button} to={routes.preDeposit.path}>
          {t('dashboard.preDepositBanner.buttonLabel')}
        </LinkButton>
      </div>

      <div css={styles.illustrationContainer}>
        {/* <img
          src={illustration}
          css={styles.illustration}
          alt={t('dashboard.PreDepositBanner.illustration.alt')}
        /> */}
        <div style={{position: 'absolute', bottom: '1em', right: '2em'}}>

            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.62 10.99" width="150">
              <path fill='#1d1d1b' d="M0,8.64V.64H3.21c1.61,0,2.51,1.1,2.51,2.41s-.91,2.41-2.51,2.41H1v3.18H0ZM4.69,3.05c0-.9-.65-1.52-1.6-1.52H1v3.05H3.09c.95,0,1.6-.62,1.6-1.52Z"/>
              <path fill='#1d1d1b' d="M6.52,5.74c0-1.68,1.1-3.03,2.87-3.03s2.87,1.35,2.87,3.03-1.1,3.05-2.87,3.05-2.87-1.37-2.87-3.05Zm4.79,0c0-1.18-.68-2.23-1.92-2.23s-1.92,1.06-1.92,2.23,.68,2.24,1.92,2.24,1.92-1.06,1.92-2.24Z"/>
              <path fill='#1d1d1b' d="M18.73,8.64l-1.51-4.65-1.51,4.65h-.9l-1.85-5.79h.94l1.42,4.62,1.52-4.62h.78l1.51,4.62,1.42-4.62h.95l-1.85,5.79h-.91Z"/>
              <path fill='#1d1d1b' d="M22.19,5.74c0-1.68,1.2-3.03,2.85-3.03,1.75,0,2.78,1.37,2.78,3.11v.23h-4.68c.07,1.09,.83,2,2.08,2,.67,0,1.33-.26,1.8-.74l.43,.59c-.59,.58-1.37,.9-2.3,.9-1.73,0-2.96-1.24-2.96-3.05Zm2.84-2.29c-1.24,0-1.85,1.04-1.9,1.92h3.8c-.01-.85-.59-1.92-1.91-1.92Z"/>
              <path fill='#1d1d1b' d="M29.28,8.64V2.85h.9v.92c.47-.6,1.14-1.06,1.93-1.06v.92c-.11-.01-.22-.02-.35-.02-.56,0-1.32,.46-1.58,.92v4.1h-.9Z"/>
              <path fill='#1d1d1b' d="M32.9,5.74c0-1.68,1.2-3.03,2.85-3.03,1.75,0,2.78,1.37,2.78,3.11v.23h-4.68c.07,1.09,.83,2,2.08,2,.67,0,1.33-.26,1.8-.74l.43,.59c-.59,.58-1.37,.9-2.3,.9-1.73,0-2.96-1.24-2.96-3.05Zm2.84-2.29c-1.24,0-1.85,1.04-1.9,1.92h3.8c-.01-.85-.59-1.92-1.91-1.92Z"/>
              <path fill='#1d1d1b' d="M44.19,8.64v-.86c-.43,.59-1.14,1.01-1.96,1.01-1.51,0-2.58-1.15-2.58-3.03s1.07-3.05,2.58-3.05c.78,0,1.49,.38,1.96,1.02V.64h.9v8h-.9Zm0-1.58v-2.61c-.31-.5-1.02-.94-1.73-.94-1.18,0-1.87,.96-1.87,2.24s.7,2.23,1.87,2.23c.71,0,1.42-.42,1.73-.92Z"/>
              <path fill='#1d1d1b' d="M50,8.64V.64h.9V3.72c.47-.64,1.18-1.02,1.96-1.02,1.52,0,2.58,1.19,2.58,3.05s-1.07,3.03-2.58,3.03c-.82,0-1.52-.42-1.96-1.01v.86h-.9Zm2.64-.66c1.16,0,1.86-.95,1.86-2.23s-.7-2.24-1.86-2.24c-.72,0-1.43,.43-1.74,.94v2.63c.31,.5,1.02,.91,1.74,.91Z"/>
              <path fill='#1d1d1b' d="M56.72,10.09c.13,.06,.35,.1,.49,.1,.4,0,.66-.13,.86-.61l.38-.88-2.42-5.85h.98l1.92,4.75,1.93-4.75h.97l-2.9,6.97c-.35,.84-.94,1.16-1.7,1.18-.19,0-.49-.04-.65-.08l.13-.82Z"/>
              <path fill='#1d1d1b' d="M69.6,8.7c-1.53,0-2.71-.37-3.55-1.1-.84-.73-1.26-1.82-1.26-3.26s.42-2.51,1.26-3.25c.84-.73,2.05-1.1,3.64-1.1h2.16c1.58,0,2.8,.37,3.64,1.1,.84,.73,1.26,1.81,1.26,3.25s-.42,2.53-1.26,3.26c-.84,.73-2.03,1.1-3.58,1.1h-2.3Zm.22-7.14c-.89,0-1.58,.16-2.08,.48-.5,.32-.81,.83-.94,1.52h7.92c-.13-.7-.44-1.2-.94-1.52-.5-.32-1.19-.48-2.08-.48h-1.9Zm.04,5.58h1.86c.9,0,1.59-.16,2.08-.48,.49-.32,.8-.83,.93-1.54h-7.92c.13,.7,.44,1.22,.94,1.54s1.2,.48,2.11,.48Z"/>
              <path fill='#1d1d1b' d="M77.94,8.64V.06h7.19c.89,0,1.58,.22,2.07,.67,.49,.45,.74,1.13,.74,2.04s-.25,1.59-.74,2.04c-.49,.45-1.18,.67-2.07,.67h-5.27v3.16h-1.92Zm6.96-7.02h-5.04V3.91h5.04c.35,.01,.62-.08,.81-.25,.19-.18,.28-.47,.28-.89s-.09-.72-.28-.89c-.19-.17-.46-.26-.81-.26Z"/>
              <path fill='#1d1d1b' d="M89.14,8.64V.08l7.22-.02c.95,0,1.66,.2,2.12,.59,.46,.4,.69,.99,.69,1.78s-.26,1.37-.79,1.74c.35,.19,.61,.45,.78,.76,.17,.32,.25,.72,.25,1.22,0,.81-.23,1.42-.69,1.84s-1.17,.63-2.12,.63h-7.46Zm7-7.03h-5.08v1.92h5.08c.73,0,1.09-.33,1.09-.98s-.36-.94-1.09-.94Zm.24,3.46h-5.32v2.04h5.32c.73,0,1.09-.34,1.09-1.03s-.36-1.01-1.09-1.01Z"/>
              <path fill='#1d1d1b' d="M100.73,8.64V.06h1.94l6.07,6.17V.06h1.92V8.64h-1.94l-6.07-6.18v6.18h-1.92Z"/>
              <path fill='#1d1d1b' d="M112.34,8.64V.08l7.22-.02c.95,0,1.66,.2,2.12,.59s.69,.99,.69,1.78-.26,1.37-.79,1.74c.35,.19,.61,.45,.78,.76,.17,.32,.25,.72,.25,1.22,0,.81-.23,1.42-.69,1.84s-1.17,.63-2.12,.63h-7.46Zm7-7.03h-5.08v1.92h5.08c.73,0,1.09-.33,1.09-.98s-.36-.94-1.09-.94Zm.24,3.46h-5.32v2.04h5.32c.73,0,1.09-.34,1.09-1.03s-.36-1.01-1.09-1.01Z"/>
            </svg> */}
        </div>
      </div>
    </Paper>
  );
};

const PreDepositBanner: React.FC = () => {
  const { accountAddress, openAuthModal } = useAuth();

  return (
    <PreDepositBannerUi isWalletConnected={!!accountAddress} openAuthModal={openAuthModal} />
  );
};

export default PreDepositBanner;
