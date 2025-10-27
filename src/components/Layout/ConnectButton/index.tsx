/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'translation';
import { truncateAddress } from 'utilities';

import { useAuth } from 'context/AuthContext';
import SvgChevronLeft from 'src/components/Icon/icons/chevronLeft';

import { SvgIcon } from '@mui/material';
import { ReactComponent as IconWallet }  from 'assets/img/wallet.svg';
import { Button, ButtonProps, PrimaryButton, QuinaryButton, SecondaryButton, TertiaryButton } from '../../Button';
import { useStyles } from './styles';
import { useAuthModal } from 'src/libs/wallet';

export interface ConnectButtonProps extends ButtonProps {
  accountAddress?: string;
  accountNs?: string;
  text?: string;
}

export const ConnectButtonUi: React.FC<ConnectButtonProps> = ({
  accountAddress,
  accountNs,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  if (accountAddress) {
    return (
      <Button
          css={styles.button}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          {...otherProps}
          variant={accountAddress ? "quinary" : "quaternary" }
      >
          <SvgIcon>
              <IconWallet css={{ color: 'currentColor' }}/>
          </SvgIcon>
          <span css={{ margin: '0 .7em' }}>{ accountNs || truncateAddress(accountAddress) }</span>
          <SvgChevronLeft css={{ height: '1.2em', transform: 'rotate(-90deg)', color: 'currentColor' }}/>
      </Button>
    );
  }

  return (
    <PrimaryButton css={[styles.button, styles.notConnected ]} {...otherProps}>
      {!accountAddress ? (otherProps?.text ?? t('connectButton.title')) : truncateAddress(accountAddress)}
    </PrimaryButton>
  );
};

export const ConnectButton: React.FC<ButtonProps> = props => {
  const { openAuthModal } = useAuthModal();
  const { accountAddress, accountNs, chainId } = useAuth();

  return (
    <ConnectButtonUi
      accountAddress={accountAddress}
      accountNs={accountNs}
      onClick={openAuthModal}
      variant={accountAddress ? 'primary' : 'quinary'}
      {...props}
    />
  );
};

export default ConnectButton;
