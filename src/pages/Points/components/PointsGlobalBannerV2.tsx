/** @jsxImportSource @emotion/react */
import React from 'react';

import BannerP1 from 'assets/img/banner_v2_1.png';
import BannerP2 from 'assets/img/banner_v2_2.png';

import { useTranslation } from 'src/translation';
import { Paper, Typography } from '@mui/material';
import { useStyles } from './PointsBannerCssV2';
import { Button, LinkButton } from 'src/components';
import { routes } from 'src/constants/routing';
import { useNavigate} from 'react-router';

export const PointsGlobalBannerUiV2: React.FC<any> = ({
    ...containerProps
  }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const navigate = useNavigate();

    const onJoinClicked = () => {
      window.open('https://points.absinthe.network/neon', '_blank');
  };


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
            <Typography variant="h2" css={styles.title}>
            Neon Points Program is now live!
            </Typography>
            <Typography variant="h6" css={styles.description}>
              Collect Points by using Strata &nbsp;
                <a href="https://neonevm.org/blog/introducing-the-neon-evm-points-program" target="_blank">
                    Learn&nbsp;more
                </a>
            </Typography>
            <Button css={styles.button} onClick={onJoinClicked}>
                Join Now
            </Button>
            </div>
        </div>

      </Paper>
    );
  };
