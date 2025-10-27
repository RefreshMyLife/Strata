// PreDepositItemUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button, TokenIcon } from 'components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertWeiToTokens, formatTokensToReadableValue, } from 'utilities';

import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';

import { StakeModal } from '../modals';
import { useStyles } from './styles';
import TEST_IDS from './testIds';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { TokenSelectPanel } from '../components/TokenSelectPanel';
import { AmountForm } from 'src/containers/AmountForm';
import { TransactionFormUi } from '../TransactionForm';
import { PreDepositFormUi } from './PreDepositForm';

type ActiveModal = 'stake' | 'withdraw';

export interface PreDepositItemUiProps {
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
}

enum PreDepositStatus {
    Pending = 'pending',
    Active = 'active',
    Ended = 'ended',
}

export const PreDepositPanelUi: React.FC<PreDepositItemUiProps> = ({
    preDeposit,
    onStake,
    activeModal,
    closeActiveModal,
    className,
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

    const handleSubmit = async () => {

    };

    return (
        <>
            <Paper css={styles.container} className={className}>

                <PreDepositFormUi
                    predeposit={preDeposit}
                    token={preDeposit.USDe}
                    tokens = {supportedTokens}
                    availableTokensLabel='Your balance'
                    availableTokensWei={preDeposit.accountStaked}
                    submitButtonLabel='Withdraw pUSDe'
                    submitButtonDisabledLabel='Select pUSDe to withdraw'
                    isTokenApproved={ true }
                    isSubmitting={isDepositInProgress}
                    onSubmit={ onDeposit }
                />

            </Paper>

            {activeModal === 'stake' && (
                <StakeModal preDeposit={preDeposit} handleClose={closeActiveModal} />
            )}
        </>
    );
};

export type PreDepositItemProps = Omit<
    PreDepositItemUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

const PreDepositItem: React.FC<PreDepositItemProps> = ({ preDeposit, ...preDepositItemUiProps }) => {


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
        <PreDepositPanelUi
            onStake={onStake}
            onWithdraw={onWithdraw}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            preDeposit={preDeposit}
            {...preDepositItemUiProps}
        />
    );
};



export default PreDepositItem;
