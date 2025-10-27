// PreDepositItemUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import LogoStakedUSDe from 'assets/img/tokens/susde.png';
import { ReactComponent as LogoUSDe } from 'assets/img/tokens/usde.svg';
import { ReactComponent as LogopUSDe } from 'assets/img/tokens/pusde.svg';

import img_pUSDe from 'assets/img/icons/strata.svg';
import img_strata_p from 'assets/img/tokens/strata_p.svg';
import img_ethena_p from 'assets/img/tokens/ethena_p.svg';
import img_ethereal_p from 'assets/img/tokens/ethereal_p.svg';


import Link from '@mui/material/Link/Link';

import { useStyles } from './styles';
import { convertWeiToTokens, formatTokensToReadableValue, generateBlockchainScanUrl } from 'src/utilities';
import useGetUniqueContract from 'src/hooks/useGetUniqueContract';
import config from 'src/config';
import ActionModal from '../modals/ActionModal';
import { Modal, PrimaryButton, TokenIcon } from 'src/components';
import { Box } from '@mui/material';




export interface PreDepositStatusUiProps {
    stakedToken: Token;
}


const PanelSection = ({title}) => {
    const styles = useStyles();
    return (
        <>

            <div css={styles.header} style={{ marginTop: 10 }}>
                <div css={styles.title}>
                    <div
                        style={{
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 10,
                            paddingBottom: 10,
                            background: '#0C1215',
                            borderRadius: 50,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 10,
                            display: 'inline-flex',
                            fontWeight: '600',
                        }}
                    >
                        <div style={{}}>{title}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const PreDepositStatusUi: React.FC<PreDepositStatusUiProps> = ({
    stakedToken,
}) => {

    const [ moreInfoShown, showMoreInfo ] = useState(false);
    const styles = useStyles();
    const { t } = useTranslation();

    const pUSDeVault = useGetUniqueContract({
        name: 'pUSDeVault',
    });

    const linkToContract = generateBlockchainScanUrl({
        hash: pUSDeVault?.address,
        urlType: 'address',
        chainId: config.chainId,
      });
    const linkToDetails = 'https://docs.strata.money/tokenomics/initial-distribution/liquidity-generation-event';


    return (
        <>
            <Paper css={styles.container}>
                <div css={styles.center}>
                    <div css={styles.headerBadge}>Boosted Points</div>
                </div>

                <div css={styles.pUSDeLogo} ><img src={img_pUSDe} /></div>
                <h3>Strata Points Farm</h3>
                <p css={styles.description}>
                    Deposit USDe and eUSDe to mint pUSDe. <br/>
                    Earn boosted Strata, Ethena and Ethereal Points.
                </p>

                {/* <p css={styles.boostedPoints}>
                    <img src={img_spark_sm} />
                    &nbsp;
                    Boosted Points
                </p> */}

                <p css={styles.boostedAmount}>
                    <b>30x</b>
                </p>
                <p>
                    <TokenIcon token={{asset: img_strata_p}} />
                    &nbsp;+&nbsp;
                    <TokenIcon token={{asset: img_ethena_p}} />
                    &nbsp;+&nbsp;
                    <TokenIcon token={{asset: img_ethereal_p}} />
                    &nbsp;& more
                </p>
                <div css={styles.fillHeight}></div>
                <div css={styles.footer} onClick={() => showMoreInfo(true)}> More Details ▸ </div>

            </Paper>

            <MoreInfoModal isOpen={moreInfoShown} handleClose={() => showMoreInfo(false) }/>

        </>
    );
};

export type PreDepositStatusProps = Omit<
    PreDepositStatusUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

const PreDepositStatus: React.FC<PreDepositStatusProps> = ({ stakedToken, ...preDepositItemUiProps }) => {

    return (
        <PreDepositStatusUi
            stakedToken={stakedToken}
            {...preDepositItemUiProps}
        />
    );
};



const MoreInfoModal: React.FC<any> = ({
    isOpen = false,
    handleClose,
}) => {
    const styles = useStyles();
  return (
    <Modal isOpen={isOpen} title={"Strata Points Farm"} handleClose={handleClose}>
        <Box css={styles.moreInfoContainer}>
            <h3>How it works</h3>
            <p>
                <h5>1. Deposit USDe/eUSDe</h5>
                <span>
                    Mint pUSDe with USDe or eUSDe to earn 30x Strata + 30x Ethena + Ethereal Points.
                </span>
            </p>
            <p>
                <h5>2. Earn Points Daily</h5>
                <span>
                    Earn Strata points daily on holding pUSDe + Ethena and Ethereal points. Hold longer, earn more.
                </span>
            </p>
            <p>
                <h5>3. Maximize Your Rewards</h5>
                <span>
                    Earn even more by using pUSDe across DeFi protocols in the Strata ecosystem and participating in Strata’s referral program.
                </span>
            </p>
            <p>
                <h5>4. Withdraw Anytime. No Lock-up.</h5>
                <span>
                    Withdraw instantly to USDe or eUSDe without any lock-up and keep all your earned rewards.
                </span>
            </p>
            <PrimaryButton onClick={handleClose} fullWidth>DEPOSIT</PrimaryButton>
        </Box>
    </Modal>
  );
};


export default PreDepositStatus;
