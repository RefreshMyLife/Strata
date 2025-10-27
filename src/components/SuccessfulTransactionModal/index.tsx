/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import React from 'react';
import { Token } from 'types';
import { convertWeiToTokens, truncateAddress } from 'utilities';

import { useAuth } from 'context/AuthContext';

import { ScanLink } from '../ScanLink';
import { Icon } from '../Icon';
import { Modal, ModalProps } from '../Modal';
import { TokenIcon } from '../TokenIcon';
import { useStyles } from './styles';
import { SvgCheck2 } from '../Icon/icons/check';
import config from 'src/config';

export interface SuccessfulTransactionModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  content?: string | React.ReactElement;
  hintContent?: string | React.ReactElement;
  transactionHash: string;
  amount?: {
    token: Token;
    valueWei: BigNumber;
  };
  className?: string;
  button?: (fn) => React.ReactElement;
  buttonClicked,
}

export const SuccessfulTransactionModal: React.FC<SuccessfulTransactionModalProps> = ({
  className,
  title,
  content,
  amount,
  hintContent,
  transactionHash,
  isOpen,
  button,
  buttonClicked,
  handleClose,
}) => {
  const chainId = config.chainId;
  const styles = useStyles();

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className={className} css={styles.container}>
        {/* <Icon name="check" css={styles.headerIcon} /> */}
        <SvgCheck2 css={styles.headerIcon} />

        <h3 css={styles.title}>{title}</h3>
        <ScanLink  css={styles.scanLink} hash={transactionHash} urlType="tx" chainId={chainId} text={truncateAddress(transactionHash)}/>

        <div css={styles.messageContainer}>
          {!!content && (
            <Typography variant="small1" component="p">
              {content}
            </Typography>
          )}
          {amount && (
            <div css={styles.amountContainer}>
              <TokenIcon token={amount.token} css={styles.amountTokenIcon} />

              <Typography variant="small1" component="span">
                {convertWeiToTokens({
                  valueWei: amount.valueWei,
                  token: amount.token,
                  returnInReadableFormat: true,
                })}
              </Typography>
            </div>
          )}
        </div>
        {hintContent && <div css={styles.hintContainer}>

              {hintContent}

        </div>}
        {button && button(() => buttonClicked(handleClose))}
      </div>
    </Modal>
  );
};
