/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'translation';
import { generateBlockchainScanUrl } from 'utilities';

import { ReactComponent as LogoDesktop } from 'assets/img/StrataLogoWithTextV2.svg';
import { useGetBlockNumber } from 'clients/api';
import { Icon } from 'components/Icon';
import { TOKENS } from 'constants/tokens';
import { useAuth } from 'context/AuthContext';
import { EXPLORER_URLS } from 'src/constants/eth';
import { routes } from 'src/constants/routing';

import versionJson from '../../../../version.json';
import {
    STRATA_DISCORD_URL,
    STRATA_DOCS_URL,
    STRATA_GITHUB_URL,
    STRATA_MEDIUM_URL,
    STRATA_TWITTER_URL,
} from './constants';
import { useStyles } from './styles';

export interface FooterUiProps {
    currentBlockNumber: number | undefined;
}
export const FooterUi: React.FC<FooterUiProps> = ({ currentBlockNumber }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { chainId } = useAuth();
    const explorerUrl = chainId && EXPLORER_URLS[chainId];

    return (
        <div css={styles.container}>
            <LogoDesktop css={styles.logo} />

            <div css={styles.group}>
                <div>© STRATA. ALL RIGHTS RESERVED</div>
                <div>
                    <Link css={styles.link} to={routes.terms.path}>
                        Terms of Service
                    </Link>
                </div>
                <div>
                    <Link css={styles.link} to={routes.privacy.path}>
                        Privacy Policy
                    </Link>
                </div>
                {/* <div>
          <Link css={styles.link} to={routes.disclaimer.path}>
            Legal Disclaimer
          </Link>
        </div> */}
            </div>

            <div css={styles.right}>
                <small style={{ alignSelf: 'center', color: '#999', letterSpacing: '1px' }}>
                    <span>{versionJson.version}</span>
                </small>

                <a css={styles.link} href={STRATA_DOCS_URL} target="_blank" rel="noreferrer">
                    Docs
                </a>

                <a css={styles.link} href={STRATA_TWITTER_URL} target="_blank" rel="noreferrer">
                    X
                </a>

                <a css={styles.link} href={STRATA_DISCORD_URL} target="_blank" rel="noreferrer">
                    Discord
                </a>

                <a css={styles.link} href={STRATA_MEDIUM_URL} target="_blank" rel="noreferrer">
                    Blog
                </a>
            </div>
        </div>
    );
};

const Footer: React.FC = () => {
    const { data: getBlockNumberData } = { data: null };

    return <FooterUi currentBlockNumber={getBlockNumberData?.blockNumber} />;
};

export default Footer;
