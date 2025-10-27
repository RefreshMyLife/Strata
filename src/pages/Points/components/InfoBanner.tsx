/** @jsxImportSource @emotion/react */
import { Icon, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'src/translation';

import { useStyles } from './InfoBannerCss';
import * as icons from '../../../components/Icon/icons';
import { Notice } from 'src/components';

export const InfoBanner: React.FC<any> = ({ ...containerProps }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const IconSvg = icons.info;
    return (<>
        <Paper css={styles.container} {...containerProps}>
            <div css={[styles.block]}>
                {/* <div css={styles.blockIcon} style={{opacity: '0'}} className='blockIcon'>
                        <div css={styles.blockBullet}>&nbsp;</div>
                    </div> */}
                <div css={styles.blockTitle}>How to earn <br/> Strata Loyalty Points?</div>
                <div css={styles.blockDescription}>
                {/* <br/>
                <IconSvg width={24}/>
                Points will be used to determine each user's on-chain contribution to the Strata ecosystem. */}
                </div>
            </div>


            <div css={styles.blockGroup}>
                <div css={styles.block}>
                    <div css={styles.blockIcon}>
                        <div css={styles.blockBullet}>1</div>
                    </div>
                    <div css={[styles.blockTitle, styles.blockTitleSm]}>Supplying</div>
                    <div css={styles.blockDescription}>
                        Every $1 worth of assets deposited will earn you 1&nbsp;Point per day
                    </div>
                </div>
                <div css={styles.block}>
                    <div css={styles.blockIcon}>
                        <div css={styles.blockBullet}>2</div>
                    </div>
                    <div css={[styles.blockTitle, styles.blockTitleSm]}>Borrowing</div>
                    <div css={styles.blockDescription}>
                        Every $1 worth of assets borrowed will earn you 4&nbsp;Points per day
                    </div>
                </div>
                <div css={styles.block}>
                    <div css={styles.blockIcon}>
                        <div css={styles.blockBullet}>3</div>
                    </div>
                    <div css={[styles.blockTitle, styles.blockTitleSm]}>Staking</div>
                    <div css={styles.blockDescription}>
                        Staking <a href='https://app.segment.finance' target='_blank'>$SEF</a> will boost your Point earnings by up to 2× and staking <a href='https://sonne.finance/' target='_blank'>$SONNE</a> by up to 1.5×
                    </div>
                </div>
            </div>
        </Paper>
        <Paper css={[styles.blockDescription, styles.container, styles.panelDescription]}>
            <div>
                {/* <span css={{fontSize: '1.3em', verticalAlign: 'middle'}}>🛈</span>&nbsp; */}
                <IconSvg css={{
                    color: 'currentColor',
                    verticalAlign: 'top',
                    marginRight: '5px',
                    height: '1.1em',
                    position:'relative',
                    top: '2px'
                }}/>
                Strata Loyalty Points will be used to determine each user's on-chain contribution to the Strata ecosystem. Points Program leaderboard will be the main benchmark for incentive distribution.
            </div>
        </Paper>
        {/* <Notice variant='info' description="Strata Loyalty Points will be used to determine each user's on-chain contribution to the Strata ecosystem. Points Program leaderboard will be the main benchmark for incentive distribution." style={{ margin: '10px 0px' }}></Notice> */}
        </>
    );
};
