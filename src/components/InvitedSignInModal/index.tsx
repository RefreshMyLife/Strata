/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';

import { WalletList, WalletListProps } from '../AuthModal/WalletList';
import { Connector } from 'clients/web3/types';
import { useStyles } from './styles';
import { ReactComponent as StrataIcon } from 'src/assets/img/tokens/strata.svg';
import { ReactComponent as CloseIcon } from 'src/assets/img/icons/close.svg';
import earnStrataPointsBg from 'src/assets/img/background/earn_strata_points_bg.png';
import { useAccountAddress } from 'src/libs/wallet';
import { routes } from 'src/constants/routing';

export interface InvitedSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (connector: Connector) => Promise<void>;
  onSign?: () => Promise<void>;
  inviteCode?: string;
}

export const InvitedSignInModal: React.FC<InvitedSignInModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSign,
}) => {
  const styles = useStyles(earnStrataPointsBg);
  const { accountAddress } = useAccountAddress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'main' | 'connect'>('main');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonState, setButtonState] = useState<'connect' | 'sign' | 'buyAndEarn'>('connect');

  useEffect(() => {
    if (accountAddress && buttonState === 'connect') {
      setButtonState('sign');
    } else if (!accountAddress && buttonState !== 'connect') {
      setButtonState('connect');
    }
  }, [accountAddress, buttonState]);

  const handleLogin: WalletListProps['onLogin'] = async (connector) => {
    try {
      setIsLoading(true);
      await onLogin(connector);
      setCurrentStep('main');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = async () => {
    console.log('sign clicked');

    if (buttonState === 'sign') {
      // First click: change button text to "Buy and Earn"
      try {
        setIsLoading(true);

        if (onSign) {
          await onSign();
        }

        setButtonState('buyAndEarn');
        setIsLoading(false);

      } catch (error) {
        console.error('Error signing:', error);
        setIsLoading(false);
      }
    } else if (buttonState === 'buyAndEarn') {
      // Second click: navigate to Buy and Earn page
      navigate(routes.buyAndEarn.path);
      onClose();
    }
  };

  const handleConnectWallet = () => {
    // Close the invited modal and use the main auth modal instead
    onClose();
    // Use the onLogin prop to trigger the main auth modal
    if (onLogin) {
      // This will call the parent's openAuthModal
      onLogin({} as Connector); // Pass empty connector to trigger parent's auth modal
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep('main');
    setIsLoading(false);
    setButtonState(accountAddress ? 'sign' : 'connect');
  };

  const handleBackAction = () => {
    if (currentStep === 'connect') {
      setCurrentStep('main');
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Loading...';

    switch (buttonState) {
      case 'connect':
        return 'Connect wallet';
      case 'sign':
        return 'Sign';
      case 'buyAndEarn':
        return 'Buy and Earn';
      default:
        return 'Connect wallet';
    }
  };

  const handleButtonClick = () => {
    if (buttonState === 'connect') {
      handleConnectWallet();
    } else {
      handleSign();
    }
  };

  const renderMainContent = () => (
    <div css={styles.stepContainer}>
      <IconButton
        css={styles.closeButton}
        onClick={handleClose}
        sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
      >
        <CloseIcon />
      </IconButton>

      <StrataIcon css={styles.strataIcon} />

      <h2 css={styles.title}>
        You are invited through the referral program
      </h2>

      <p css={styles.description}>
        Confirm invitation to points program by signing this message. <strong style={{ color: 'rgba(255, 255, 255, 1)' }}>It's free.</strong>
      </p>

      <button
        css={styles.connectButton}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {getButtonText()}
      </button>
    </div>
  );

  const renderConnectStep = () => (
    <div css={styles.walletListContainer}>
      <WalletList onLogin={handleLogin} />
    </div>
  );


  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          background: `url(${earnStrataPointsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          boxShadow: '0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset',
          width: '440px',
          maxWidth: 'calc(100vw - 40px)',
          maxHeight: 'calc(100vh - 40px)',
          margin: 0,
          position: 'relative',
        }
      }}
      slotProps={{
        backdrop: {
          style: { backdropFilter: 'blur(5px)' }
        }
      }}
    >
      <DialogContent sx={{ padding: 0 }}>
        {currentStep === 'main' && renderMainContent()}
        {currentStep === 'connect' && (
          <div>
            <IconButton
              onClick={handleBackAction}
              sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
            >
              ←
            </IconButton>
            <h4 css={styles.title} style={{ textAlign: 'center', marginTop: '60px', marginBottom: '20px' }}>
              Connect Your Wallet
            </h4>
            {renderConnectStep()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};