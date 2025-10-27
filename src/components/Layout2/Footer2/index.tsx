/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'translation';
import { generateBlockchainScanUrl } from 'utilities';

import { ReactComponent as LogoDesktop } from 'assets/img/StrataLogoWithTextV2.svg';
import img_discord from 'assets/img/icons/discord.svg';
import img_gitbook from 'assets/img/icons/gitbook.svg';
import img_github from 'assets/img/icons/github.svg';
import img_notion from 'assets/img/icons/notion.svg';
import img_telegram from 'assets/img/icons/telegram.svg';
import img_twitter from 'assets/img/icons/twitter.svg';
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
    STRATA_GITBOOK_URL,
    STRATA_GITHUB_URL,
    STRATA_MIRROR_URL,
    STRATA_TELEGRAM_URL,
    STRATA_TWITTER_URL,
} from './constants';
import { useStyles } from './styles';

export interface Footer2UiProps {
    currentBlockNumber: number | undefined;
}
export const Footer2Ui: React.FC<Footer2UiProps> = ({ currentBlockNumber }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    const { chainId } = useAuth();
    const explorerUrl = chainId && EXPLORER_URLS[chainId];

    return (
        <div css={styles.container}>
            {/* <LogoDesktop css={styles.logo} /> */}

            <div css={styles.group}>
                <div css={styles.head}>© 2025 Strata</div>
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
                <small style={{ alignSelf: 'center', color: '#555', letterSpacing: '1px' }}>
                    <span>{versionJson.version}</span>
                </small>

                <a css={styles.link} href={STRATA_DOCS_URL} target="_blank" rel="noreferrer">
                    <img src={img_gitbook} alt="GitBook" style={{ width: 24, height: 24 }} />
                </a>

                <a css={styles.link} href={STRATA_TWITTER_URL} target="_blank" rel="noreferrer">
                    <img src={img_twitter} alt="Twitter" style={{ width: 24, height: 24 }} />
                </a>

                <a css={styles.link} href={STRATA_DISCORD_URL} target="_blank" rel="noreferrer">
                    <img src={img_discord} alt="Discord" style={{ width: 24, height: 24 }} />
                </a>

                <a css={styles.link} href={STRATA_TELEGRAM_URL} target="_blank" rel="noreferrer">
                    <img src={img_telegram} alt="Telegram" style={{ width: 24, height: 24 }} />
                </a>

                <a css={styles.link} href={STRATA_GITHUB_URL} target="_blank" rel="noreferrer">
                    <img src={img_github} alt="GitHub" style={{ width: 24, height: 24 }} />
                </a>

                <a css={styles.link} href={STRATA_MIRROR_URL} target="_blank" rel="noreferrer">
                    <img src={img_notion} alt="Notion" style={{ width: 24, height: 24 }} />
                </a>
            </div>
        </div>
    );
};

const Footer2: React.FC = () => {
    const { data: getBlockNumberData } = { data: null };

    return <Footer2Ui currentBlockNumber={getBlockNumberData?.blockNumber} />;
};

export default Footer2;
