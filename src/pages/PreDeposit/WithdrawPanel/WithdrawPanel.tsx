// WithdrawPanelUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button, ConnectWallet, FormikSubmitButton, LabeledInlineContent, Notice, TokenIcon } from 'components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertWeiToTokens, formatTokensToReadableValue } from 'utilities';

import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';

import { useStyles } from '../PreDepositPanel/styles';
import TransactionForm, { TransactionFormUi } from '../TransactionForm';
import { StakeModal } from '../modals';
import { useAuth } from 'src/context/AuthContext';
import useGetUniqueContract from 'src/hooks/useGetUniqueContract';
import useHandleTransactionMutation from 'src/hooks/useHandleTransactionMutation';
import { Formik } from 'formik';
import formatToReadableDate from 'src/components/charts/ApyChart/formatToReadableDate';
import { queryClient } from 'src/clients/api';
import FunctionKey from 'src/constants/functionKey';
import { NumberUtil } from 'src/utilities/NumberUtilt';

type ActiveModal = 'stake' | 'withdraw';

export interface WithdrawPanelUiProps {
    preDeposit: TPreDepositData;

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

const PanelSection = ({title}) => {
    const styles = useStyles();
    return (
        <>

            <div css={styles.header} style={{ marginTop: 10 }}>
                <div css={styles.title}>
                    <div
                        style={{
                            paddingLeft: 30,
                            paddingRight: 30,
                            paddingTop: 10,
                            paddingBottom: 10,
                            background: '#0C1215',
                            borderRadius: 50,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 10,
                            display: 'inline-flex',
                            fontWeight: '600',
                        }}
                    >
                        <div style={{}}>{title}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

const PanelHr = ({}) => {
    return <div style={{ borderTop: '1px #F3F3F7 solid', marginTop: '10px' }}></div>;
};

export const WithdrawPanelUi: React.FC<WithdrawPanelUiProps> = ({
    preDeposit,

    onStake,
    activeModal,
    closeActiveModal,
    className,
}) => {

    const styles = useStyles();
    const { t } = useTranslation();
    const handleTransactionMutation = useHandleTransactionMutation();
    const { accountAddress } = useAuth();

    if (!accountAddress || preDeposit == null) {
        return (
            <Notice
                variant="info"
                description="Wallet not connected"
            />
        );
    }

    const stakedToken = preDeposit.pUSDe;


    let status = PreDepositStatus.Active;

    const readableUserStakedTokens = useConvertWeiToReadableTokenString({
        token: preDeposit.pUSDe,
        valueWei: preDeposit.accountStaked,
        addSymbol: false,
    });


    const dataListItems = useMemo(
        () =>
            [
                {
                    title: <span></span>,
                    value: (
                        <span>
                            <span></span>
                        </span>
                    ),
                },
                {
                    title: <span>Total deposited</span>,
                    value: (
                        <>

                        </>
                    ),
                },
            ].filter(Boolean),
        [stakedToken],
    );

    const canRequepUSDe = preDeposit.balances.sUSDe.gt(0);

    const pUSDeVaultContract = useGetUniqueContract({
        name: 'pUSDeVault',
        passSigner: true,
    });
    const sUSDeContract = useGetUniqueContract({
        name: 'sUSDe',
        passSigner: true,
    });

    const invalidateQueries = () => {
        queryClient.invalidateQueries([
            FunctionKey.GET_PRE_DEPOSIT_ACCOUNT_STAKED,
            accountAddress,
        ]);
        queryClient.invalidateQueries([
            FunctionKey.GET_SUSD_DEPOSIT_ACCOUNT_STAKED,
            accountAddress,
        ]);
        queryClient.invalidateQueries([
            FunctionKey.GET_PRE_DEPOSIT_TOTALS
        ]);
    };

    const [isReceivesUSDeInProgress, setReceivesUSDeInProgress] = useState(false);
    const onReceivesUSDe = async (amountWei: BigNumber) => {
        setReceivesUSDeInProgress(true);
        try {
            let tx = await pUSDeVaultContract.withdraw(amountWei.toString(), accountAddress, accountAddress);
            return await tx.wait();
        } finally {
            invalidateQueries();
            setReceivesUSDeInProgress(false);
        }
    };

    const [isRequepUSDeInProgress, setRequepUSDeInProgress] = useState(false);
    const onRequepUSDe = async (amountWei: BigNumber) => {
        setRequepUSDeInProgress(true);
        try {
            let tx = await sUSDeContract.cooldownShares(amountWei.toString());
            return await tx.wait();
        } finally {
            invalidateQueries();
            setRequepUSDeInProgress(false);
        }
    };

    const [isWithdrawUSDeInProgress, setWithdrawUSDeInProgress] = useState(false);
    const unstake = async () => {
        setWithdrawUSDeInProgress(true);
        try {
            let tx = await sUSDeContract.unstake(accountAddress);
            return await tx.wait();
        } finally {
            invalidateQueries();
            setWithdrawUSDeInProgress(false);
        }
    };
    const onWithdrawUSDe = () => {
        return handleTransactionMutation({
            mutate: () => unstake(),
            successTransactionModalProps: contractReceipt => ({
              title: `Transaction Successful`,
              content: `USDe withdrawal successful`,
              amount: {
                valueWei: preDeposit.underlyingAmount,
                token: preDeposit.USDe,
              },
              transactionHash: contractReceipt.transactionHash,
            }),
          });
    };

    const [withdrawUSDeStatus, setWithdrawUSDeStatus] = useState(
        preDeposit.cooldownEnd == null ? 'None' : (
            preDeposit.cooldownEnd.valueOf() > Date.now() ? 'Pending' : 'Ready'
        )
    );

    return (
        <>
            <Paper css={styles.container} className={className}>
                <ConnectWallet message="Connect">


                    <PanelSection title="1. Receive sUSDe" />
                    <div css={styles.panelSection}>
                        <TransactionFormUi
                            token={preDeposit.pUSDe}
                            availableTokensLabel='Your balance'
                            availableTokensWei={preDeposit.accountStaked}
                            submitButtonLabel='Withdraw pUSDe'
                            submitButtonDisabledLabel='Select pUSDe to withdraw'
                            isTokenApproved={ true }
                            isSubmitting={isReceivesUSDeInProgress}
                            onSubmit={ onReceivesUSDe }
                        />
                    </div>



                    <PanelSection title="2. Request USDe Withdrawal" />
                    <div css={styles.panelSection}>
                        <Typography style={{ padding: '10px 0px 20px 0px' }}>
                            Cooldown period: { NumberUtil.format(preDeposit.cooldownDuration / (24 * 60 * 60)) }d
                        </Typography>
                        {canRequepUSDe && <TransactionFormUi
                            token={preDeposit.sUSDe}
                            availableTokensLabel='Your balance'
                            availableTokensWei={preDeposit.balances.sUSDe}
                            submitButtonLabel='Request USDe withdrawal'
                            submitButtonDisabledLabel='Select USDe amount to request withdrawal'
                            isTokenApproved={ true }
                            isSubmitting={isRequepUSDeInProgress}
                            onSubmit={ onRequepUSDe }
                        />}
                        {!canRequepUSDe && <LabeledInlineContent
                            iconSrc={preDeposit.sUSDe}
                            label='Your balance'
                            >
                            0 sUSDe
                            </LabeledInlineContent>
                            }
                    </div>


                    <PanelSection title="3. Withdraw USDe" />
                    <div css={styles.panelSection}>
                        {withdrawUSDeStatus === 'None' && <div css={styles.panelSection}>
                            <Notice description='No active withdrawal requests' variant='info'/>
                        </div>}
                        {withdrawUSDeStatus === 'Pending' && <>
                            <LabeledInlineContent iconSrc={preDeposit.USDe} label='Withdrawable balance'>
                                {formatTokensToReadableValue({
                                    value: preDeposit.underlyingAmount,
                                    token: preDeposit.USDe,
                                    addSymbol: true,
                                    wei: true
                                })}
                            </LabeledInlineContent>
                            <Notice description={ `Withdrawable on ${ preDeposit.cooldownEnd.toLocaleString()}` } variant='warning'/>
                        </>}
                        {withdrawUSDeStatus === 'Ready' && <>
                            <LabeledInlineContent iconSrc={preDeposit.USDe} label='Withdrawable balance'>
                                {formatTokensToReadableValue({
                                    value: preDeposit.underlyingAmount,
                                    token: preDeposit.USDe,
                                    addSymbol: true,
                                    wei: true
                                })}
                            </LabeledInlineContent>
                            <Formik initialValues={{}} onSubmit={onWithdrawUSDe}>
                                <FormikSubmitButton
                                    loading={isWithdrawUSDeInProgress}
                                    fullWidth
                                    enabledLabel='Withdraw'
                                    disabledLabel='...'
                                    onClick={onWithdrawUSDe}
                                />
                            </Formik>
                        </>}
                    </div>

                </ConnectWallet>
            </Paper>


        </>
    );
};

export type PreDepositItemProps = Omit<
    WithdrawPanelUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

const WithdrawPanel: React.FC<PreDepositItemProps> = ({
    preDeposit,
    ...preDepositItemUiProps
}) => {
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
        <WithdrawPanelUi
            onStake={onStake}
            onWithdraw={onWithdraw}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            preDeposit={preDeposit}
            {...preDepositItemUiProps}
        />
    );
};

export const Timer: React.FC<{ deadline; startsAt; before; after }> = ({
    startsAt,
    deadline,
    before,
    after,
}) => {
    // if (deadline == null || deadline <= Date.now()) {
    //     return;
    // }

    function serialize(span: number) {
        const SECOND = 1_000;
        const MINUTE = SECOND * 60;
        const HOUR = MINUTE * 60;
        const DAY = HOUR * 24;

        let days = Math.floor(span / DAY);
        let hours = Math.floor((span / HOUR) % 24);
        let minutes = Math.floor((span / MINUTE) % 60);
        let seconds = Math.floor((span / SECOND) % 60);
        let str = '';
        if (days > 0) {
            //str += `${days}d `;
            hours += days * 24;
        }
        str += hours > 0 ? hours.toString().padStart(2, '0') : '00';
        str += ':';
        str += minutes > 0 ? minutes.toString().padStart(2, '0') : '00';
        str += ':';
        str += seconds > 0 ? seconds.toString().padStart(2, '0') : '00';
        return str;
    }
    function getText() {
        let now = Date.now();
        if (now < startsAt) {
            return before;
        }
        if (now > deadline) {
            return after;
        }
        return serialize(deadline - Date.now());
    }

    const [timer, setTimer] = useState('');
    function updateTime() {
        setTimer(getText());
    }

    useEffect(() => {
        const interval = setInterval(() => updateTime(), 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return <span>{timer}</span>;
};

export default WithdrawPanel;
