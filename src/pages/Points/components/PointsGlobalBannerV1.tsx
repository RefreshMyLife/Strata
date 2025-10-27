/** @jsxImportSource @emotion/react */
import React from 'react';

import BannerP1 from 'assets/img/banner_p1.svg';
import BannerP2 from 'assets/img/banner_p2.svg';

import { useTranslation } from 'src/translation';
import { Paper, Typography } from '@mui/material';
import { useStyles } from './PointsBannerCss';
import { Button, LinkButton } from 'src/components';
import { routes } from 'src/constants/routing';
import { useNavigate} from 'react-router';

export const PointsGlobalBannerUiV1: React.FC<any> = ({
    ...containerProps
  }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const navigate = useNavigate();

    const onJoinClicked = () => {
      navigate(routes.points.path);
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
            Strata Loyalty Program
            </Typography>
            <Typography variant="h6" css={styles.description}>
                Collect Points by using Strata. &nbsp;
                <a href="https://docs.strata.money/introduction/strata-loyalty-program" target="_blank">
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
