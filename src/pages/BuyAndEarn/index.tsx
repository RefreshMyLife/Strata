/** @jsxImportSource @emotion/react */
import { Box } from '@mui/material';
import {
    AnchorButton,
    Icon,
    SelectDialogV2,
    Spinner,
    Tabs,
    TextButton,
    TokenIcon,
    TransactionStatusModal,
    TransactionStep,
} from 'components';
import React, { useState } from 'react';
import { useAuthModal } from 'src/libs/wallet';
import { ChainId, changeChainId } from 'src/packages/contracts';

import img_settings_white from 'assets/img/icons/settings-white.svg';
import img_settings from 'assets/img/icons/settings.svg';
import { useGetPreDeposits } from 'clients/api';
import { SettingsDrawer } from 'components/SettingsDrawer';
import { useAuth } from 'context/AuthContext';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import { useLayout } from 'src/theme/useLayout';

import BuyPanel from './BuyPanel';
import SellForm from './SellPanel/SellForm';
import { useStyles } from './styles';

export interface PreDepositUiProps {
    preDeposit: TPreDepositData;
    isInitialLoading: boolean;
}

const BuyTab = ({ preDeposit, transactionModalProps, tokenSelectModalProps }) => {
    return (
        <>
            <BuyPanel
                preDeposit={preDeposit}
                transactionModalProps={transactionModalProps}
                tokenSelectModalProps={tokenSelectModalProps}
                key="buy"
            />
        </>
    );
};

const SellTab = ({ preDeposit, tokenSelectModalProps }) => {
    return (
        <>
            <SellForm
                preDeposit={preDeposit}
                tokenSelectModalProps={tokenSelectModalProps}
                key="sell"
            />
        </>
    );
};

const BuyAndEarnUi: React.FC = () => {
    const [shareDialogShown, showReferralShareDialog] = useState(false);
    const { accountAddress } = useAuth();
    const { openAuthModal } = useAuthModal();
    const { data: preDeposit, isLoading: isGetPreDepositsLoading } = useGetPreDeposits({
        accountAddress,
    });
    const styles = useStyles();
    const l = useLayout();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSettingsHovered, setIsSettingsHovered] = useState(false);

    // Transaction Status Modal states
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>([
        { title: 'Token Approval', status: 'pending' },
        { title: 'Transaction Execution', status: 'pending' },
    ]);

    // Token Selection Modal states
    const [showTokenSelectModal, setShowTokenSelectModal] = useState(false);
    const [tokenSelectData, setTokenSelectData] = useState<{
        tokens: any[];
        selectedToken: any;
        onTokenSelected: (token: any) => void;
    } | null>(null);

    if (isGetPreDepositsLoading || preDeposit == null) {
        return <Spinner />;
    }

    const onReferralShareButtonClicked = () => {
        if (!accountAddress) {
            openAuthModal();
            return;
        }
        showReferralShareDialog(true);
    };

    // Transaction modal props
    const transactionModalProps = {
        showTransactionModal,
        setShowTransactionModal,
        transactionSteps,
        setTransactionSteps,
    };

    // Token select modal props
    const tokenSelectModalProps = {
        showTokenSelectModal,
        setShowTokenSelectModal,
        tokenSelectData,
        setTokenSelectData,
    };

    const tabsContent = [
        {
            key: 'buy',
            title: (
                <>
                    <span className="text-icon">+</span>Buy
                </>
            ),
            content: (
                <BuyTab
                    preDeposit={preDeposit}
                    transactionModalProps={transactionModalProps}
                    tokenSelectModalProps={tokenSelectModalProps}
                />
            ),
        },
        {
            key: 'sell',
            title: (
                <>
                    <span className="text-icon">-</span>Sell
                </>
            ),
            content: (
                <SellTab preDeposit={preDeposit} tokenSelectModalProps={tokenSelectModalProps} />
            ),
        },
    ];

    const onDepositClicked = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        (document.body.querySelector(`input[name="amountFrom"]`) as any)?.focus();
    };

    return (
        <>
            <div css={[styles.container, { position: 'relative' }]}>
                <div css={styles.header}>
                    <div css={styles.headerTitle}>Buy srUSDe and jrUSDe </div>
                    {/* <div
                        css={styles.settingsIcon}
                        onClick={() => setIsSettingsOpen(true)}
                        onMouseEnter={() => setIsSettingsHovered(true)}
                        onMouseLeave={() => setIsSettingsHovered(false)}
                    >
                        <img
                            src={isSettingsHovered ? img_settings_white : img_settings}
                            alt="Settings"
                        />
                    </div> */}
                </div>
                <div css={styles.headerBorder} />
                {/* <PreDepositStatus stakedToken={preDeposit.stakedToken} /> */}
                <Tabs tabsContent={tabsContent} fullWidth={true} />
                <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
                <TransactionStatusModal
                    isOpen={showTransactionModal}
                    handleClose={() => setShowTransactionModal(false)}
                    steps={transactionSteps}
                />
                {tokenSelectData && (
                    <SelectDialogV2
                        isOpen={showTokenSelectModal}
                        handleClose={() => setShowTokenSelectModal(false)}
                        token={tokenSelectData.selectedToken}
                        tokens={tokenSelectData.tokens}
                        onTokenSelected={tokenSelectData.onTokenSelected}
                    />
                )}
            </div>
        </>
    );
};

export default BuyAndEarnUi;
