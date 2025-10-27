/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Button } from 'src/components';
import { useTranslation } from 'src/translation';

import BannerP1 from 'assets/img/banner_p1.svg';
import BannerP2 from 'assets/img/banner_p2.svg';
import { useNavigate} from 'react-router';

import { useAuth } from 'src/context/AuthContext';
import { routes } from 'src/constants/routing';

import { useStyles } from './PointsBannerCss';

export const PointsBannerUi: React.FC<any> = ({ ...containerProps }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const { accountAddress, openAuthModal } = useAuth();
    const navigate = useNavigate();

    return (
        <Paper css={styles.container} {...containerProps}>
            <div css={styles.illustrationContainer}>
                <img
                    src={BannerP1}
                    css={styles.illustration1}
                />

                {/* <img
            src={illustration}
            css={styles.illustration}
            alt={t('dashboard.connectWalletBanner.illustration.alt')}
          /> */}
                <img
                    src={BannerP2}
                    css={styles.illustration2}
                />
            </div>

            <div css={styles.content}>
                <div css={styles.contentText}>
                    <Typography variant="h2" css={styles.title}>
                    Strata Loyalty Program
                    </Typography>
                    <Typography variant="h6" css={styles.description}>
                        Earn Points on Strata Money,
                        climb the <br/> leaderboard and get ready
                        for Rewards!
                        &nbsp;
                        {/* <br/> */}
                        {/* <a href="https://docs.strata.money" target="_blank">
                            Learn&nbsp;more.
                        </a> */}
                    </Typography>
                    {/* <Button css={styles.button} onClick={onJoinClicked}>
                        Learn&nbsp;more
                    </Button> */}
                    <a href="https://docs.strata.money/introduction/strata-loyalty-program" target="_blank">
                        Learn&nbsp;more
                    </a>
                </div>
            </div>
        </Paper>
    );
};
