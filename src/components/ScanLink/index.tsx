/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import { ChainId } from 'packages/contracts';
import React from 'react';
import { useTranslation } from 'translation';
import { UrlType, generateBlockchainScanUrl } from 'utilities';

import { Breakpoint, EllipseAddress } from '../EllipseAddress';
import { Icon } from '../Icon';
import { useStyles } from './styles';
import config from 'src/config';

export interface ScanLinkProps {
  hash: string;
  chainId?: ChainId;
  ellipseBreakpoint?: Breakpoint;
  urlType?: UrlType;
  className?: string;
  text?: string;
}

export const ScanLink: React.FC<ScanLinkProps> = ({
  hash,
  chainId,
  className,
  urlType,
  text,
  ellipseBreakpoint,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  let content;

  chainId ??= config.chainId;

  if (text) {
    content = ellipseBreakpoint ? (
      <EllipseAddress ellipseBreakpoint={ellipseBreakpoint} address={text} />
    ) : (
      text
    );
  } else {
    content = t('scanLink.content');
  }

  return (
    <div css={styles.container} className={className}>
      <Typography
        component="a"
        href={chainId && generateBlockchainScanUrl({ hash, urlType, chainId })}
        target="_blank"
        rel="noreferrer"
        variant="small1"
        css={styles.text}
      >
        {content}

        <Icon name="open" css={styles.icon} />
      </Typography>
    </div>
  );
};
