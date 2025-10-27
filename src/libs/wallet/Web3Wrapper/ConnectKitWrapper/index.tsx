import { Avatar, ConnectKitProvider } from 'connectkit';
import { AuthHandler } from './AuthHandler';
import { useChainId } from 'src/libs/wallet/hooks/useChainId';
import { BlockiesAvatar } from './BlockiesAvatar';
import { FONTS } from 'src/theme/MuiThemeProvider/muiTheme';
import { ChainGuard } from '../../ChainGuard';

export interface ConnectKitWrapperProps {
  children?: React.ReactNode;
}

export const ConnectKitWrapper: React.FC<ConnectKitWrapperProps> = ({ children }) => {
  const { chainId } = useChainId();

  return (
    <ConnectKitProvider
      options={{
        language: 'en-US',
        hideQuestionMarkCTA: true,
        hideRecentBadge: true,
        hideNoWalletCTA: true,
        hideTooltips: true,
        hideBalance: true,
        initialChainId: chainId,
        customAvatar: BlockiesAvatar,
        disclaimer: (
          <>
            By connecting your wallet you agree to the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/#/terms-of-service"
            >Terms of Service</a>&nbsp;and&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/#/privacy-policy"
            >Privacy Policy</a>
          </>
        )
      }}
      mode="dark"
      theme="midnight"

      customTheme={{
        "--ck-border-radius": '8px',
        '--ck-font-family': FONTS.space,
        '--ck-avatar-border-radius': '8px',

        // '--ck-overlay-background': 'rgba(0, 0, 0, 0.5)',
        // '--ck-primary-button-border-radius': '0.5rem',
        // '--ck-primary-button-hover-border-radius': '0.5rem',
        // '--ck-primary-button-active-border-radius': '0.5rem',
        // '--ck-primary-button-background': theme.colors.lightGrey,
        // '--ck-primary-button-hover-background': theme.colors.grey,
        // '--ck-primary-button-active-background': theme.colors.grey,
        // '--ck-secondary-button-border-radius': '0.5rem',
        // '--ck-secondary-button-hover-border-radius': '0.5rem',
        // '--ck-secondary-button-active-border-radius': '0.5rem',
        // '--ck-secondary-button-background': theme.colors.lightGrey,
        // '--ck-secondary-button-hover-background': theme.colors.grey,
        // '--ck-secondary-button-active-background': theme.colors.grey,
        // '--ck-body-action-color': theme.colors.grey,
        // '--ck-body-background-secondary': theme.colors.cards,
        // '--ck-tooltip-background': theme.colors.blue,
        // '--ck-tooltip-color': theme.colors.offWhite,
        // '--ck-body-color-muted': theme.colors.grey,
        // '--ck-body-color': theme.colors.offWhite,
        // '--ck-body-background-tertiary': theme.colors.lightGrey,
        // '--ck-body-background': theme.colors.cards,
        // '--ck-qr-dot-color': 'rgba(0, 0, 0, 1)',
        // '--ck-qr-background': theme.colors.offWhite,
      }}
    >
      <AuthHandler />
      <ChainGuard />

      {children}

    </ConnectKitProvider>
  );
};
