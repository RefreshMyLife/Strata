// PreDepositItemUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button, TokenIcon, TransactionStep } from 'components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertWeiToTokens, formatTokensToReadableValue } from 'utilities';

import { TokenSelectPanel } from '../components/TokenSelectPanel';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import { AmountForm } from 'src/containers/AmountForm';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { TransactionFormUi } from '../TransactionForm';
import { StakeModal } from '../modals';
import { BuyFormUi } from './BuyForm';
import { useStyles } from './styles';
import TEST_IDS from './testIds';

type ActiveModal = 'stake' | 'withdraw';

export interface BuyPanelUiProps {
    preDeposit: TPreDepositData;

    // timestamps with MS
    periodBegin?: number;
    periodEnd?: number;
    bonusEnd?: number;

    onStake: () => void;
    onWithdraw: () => void;
    closeActiveModal: () => void;
    canWithdraw?: boolean;
    poolIndex?: number;
    activeModal?: ActiveModal;
    className?: string;
    transactionModalProps?: {
        showTransactionModal: boolean;
        setShowTransactionModal: (show: boolean) => void;
        transactionSteps: TransactionStep[];
        setTransactionSteps: (steps: TransactionStep[]) => void;
    };
    tokenSelectModalProps?: {
        showTokenSelectModal: boolean;
        setShowTokenSelectModal: (show: boolean) => void;
        tokenSelectData: any;
        setTokenSelectData: (data: any) => void;
    };
}

enum PreDepositStatus {
    Pending = 'pending',
    Active = 'active',
    Ended = 'ended',
}

export const BuyPanelUi: React.FC<BuyPanelUiProps> = ({
    preDeposit,
    onStake,
    activeModal,
    closeActiveModal,
    className,
    transactionModalProps,
    tokenSelectModalProps,
}) => {
    // const totalStaked = preDeposit.totalStaked;
    // const userStaked = preDeposit.accountStaked;
    const stakedToken = preDeposit.stakedToken;
    const supportedTokens = preDeposit.supportedTokens;

    const styles = useStyles();
    const { t } = useTranslation();

    const [isDepositInProgress, setDepositInProgress] = useState(false);
    const onDeposit = async (token: Token, amountWei: BigNumber) => {
        console.log(`onDeposit`, token, amountWei.toString());
        // setDepositInProgress(true);
        // try {
        //     let tx = await pUSDeVaultContract.withdraw(amountWei.toString(), accountAddress, accountAddress);
        //     return await tx.wait();
        // } finally {
        //     invalidateQueries();
        //     setDepositInProgress(false);
        // }
    };

    let status = PreDepositStatus.Active;

    // const readableUserStakedTokens = useConvertWeiToReadableTokenString({
    //     token: stakedToken,
    //     valueWei: userStaked,
    //     addSymbol: false,
    // });

    const totalLocked = 2_500_000;
    //const totalStackedNum = totalStaked.div(10 ** stakedToken.decimals).toNumber();
    //const price = totalStackedNum === 0 ? 0 : totalStackedNum / totalLocked;
    //let priceStr = String(price);
    // if (/\.\w{5,}/.test(priceStr)) {
    //     priceStr = price.toFixed(5).replace(/0$/, '');
    // }

    // priceStr = '0.03212';

    // const dataListItems = useMemo(
    //     () => [
    //         {
    //             key: 'single',
    //             title: <span></span>,
    //             value: (
    //                 <span>
    //                     <span></span>
    //                 </span>
    //             ),
    //         },
    //         {
    //             key: 'total',
    //             title: <span>Total deposited</span>,
    //             value: (
    //                 <>
    //                     <TokenIcon css={styles.tokenIcon} token={preDeposit.sUSDe} />
    //                     {formatTokensToReadableValue({ value: preDeposit.totalStaked, token: preDeposit.sUSDe, addSymbol: false, wei: true })}
    //                 </>
    //             ),
    //         },
    //     ].filter(Boolean),
    //     [stakedToken, totalStaked?.toFixed()],
    // );

    const isActive = status === PreDepositStatus.Active;
    const buttonText = {
        [PreDepositStatus.Pending]: t('preDepositItem.stakeButtonNotStarted'),
        [PreDepositStatus.Active]: t('preDepositItem.stakeButton'),
        [PreDepositStatus.Ended]: t('preDepositItem.stakeButtonEnded'),
    }[status];

    const handleSubmit = async () => {};

    return (
        <>
            <Paper css={styles.container} className={className}>
                <BuyFormUi
                    predeposit={preDeposit}
                    token={preDeposit.USDe}
                    tokens={supportedTokens}
                    availableTokensLabel="Your balance"
                    availableTokensWei={preDeposit.accountStaked}
                    submitButtonLabel="Withdraw pUSDe"
                    submitButtonDisabledLabel="Select pUSDe to withdraw"
                    isTokenApproved={true}
                    isSubmitting={isDepositInProgress}
                    onSubmit={onDeposit}
                    transactionModalProps={transactionModalProps}
                    tokenSelectModalProps={tokenSelectModalProps}
                />
            </Paper>

            {activeModal === 'stake' && (
                <StakeModal preDeposit={preDeposit} handleClose={closeActiveModal} />
            )}
        </>
    );
};

export type BuyPanelProps = Omit<
    BuyPanelUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

const BuyPanel: React.FC<
    BuyPanelProps & { transactionModalProps?: any; tokenSelectModalProps?: any }
> = ({ preDeposit, transactionModalProps, tokenSelectModalProps, ...buyPanelUiProps }) => {
    const [activeModal, setActiveModal] = useState<ActiveModal | undefined>();
    const onStake = () => {
        // Block action is user has LUNA or UST enabled as collateral
        setActiveModal('stake');
    };

    const onWithdraw = async () => {
        // Block action is user has LUNA or UST enabled as collateral
        setActiveModal('withdraw');
    };

    const closeActiveModal = () => setActiveModal(undefined);

    return (
        <BuyPanelUi
            onStake={onStake}
            onWithdraw={onWithdraw}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            preDeposit={preDeposit}
            transactionModalProps={transactionModalProps}
            tokenSelectModalProps={tokenSelectModalProps}
            {...buyPanelUiProps}
        />
    );
};

export default BuyPanel;
