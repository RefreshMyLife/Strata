// WithdrawFormUi

/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button, ConnectWallet, FormikSubmitButton, LabeledInlineContent, Notice, TokenIcon } from 'components';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Token } from 'types';
import { convertTokensToWei, convertWeiToTokens, formatTokensToReadableValue } from 'utilities';

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
import { TOKENS } from 'src/constants/tokens';
import { AmountForm } from 'src/containers/AmountForm';
import { TokenSelectPanel } from '../components/TokenSelectPanel';
import { getUniqueContract } from 'src/packages/contracts';
import config from 'src/config';
import { PromiseUtil } from 'src/utilities/PromiseUtil';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { TokenService } from 'src/services/TokenService';

type ActiveModal = 'stake' | 'withdraw';

export interface WithdrawFormUiProps {
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

export const WithdrawFormUi: React.FC<WithdrawFormUiProps> = ({
    preDeposit,

    onStake,
    activeModal,
    closeActiveModal,
    className,
}) => {

    const styles = useStyles();
    const { t } = useTranslation();
    const handleTransactionMutation = useHandleTransactionMutation();
    const { accountAddress, signer } = useAuth();
    const [ selectedAmount, setSelectedAmount ] = useState(null);
    const [ selectedToken, setSelectedToken ] = useState(TOKENS.usde);
    const [ hasError, setHasError ] = useState(false);
    const [ errMessage, setErrorMessage ] = useState('');
    const tokens = [ TOKENS.usde, TOKENS.eusde ];

    const { data: pusdeBalance } = TokenService.useGetBalance(TOKENS.pusde, accountAddress);

    const stakedToken = preDeposit.pUSDe;

    const readableUserStakedTokens = useConvertWeiToReadableTokenString({
        token: preDeposit.pUSDe,
        valueWei: preDeposit.accountStaked,
        addSymbol: false,
    });


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
        PromiseUtil.clearMemoized();
        PromiseUtil.clearTrackedQuery();
    };

    const [isSubmitting, setSubmittingProgress] = useState(false);
    const onWithdraw = async (token: Token, amountWei: BigNumber) => {
        setSubmittingProgress(true);
        try {
            const vault = getUniqueContract({
                name: 'pUSDeVault',
                signerOrProvider: signer,
                chainId: config.networkId
            });

            const enabled = await vault.withdrawalsEnabled();
            if (!enabled) {
                throw new Error('Withdrawals are not enabled');
            }

            console.log(`Withdraw`, token, amountWei.toString(), accountAddress);

            let tx = await vault['withdraw(address,uint256,address,address)'](token.address, amountWei.toString(10), accountAddress, accountAddress);
            return await tx.wait();
        } finally {
            invalidateQueries();
            setSubmittingProgress(false);
        }
    };

    const handleWithdraw = async (amountTokens: string) => {
        const amountWei = convertTokensToWei({
          value: new BigNumber(amountTokens),
          token: TOKENS.pusde,
        });
        const token = selectedToken;
        return handleTransactionMutation({
          label: 'Processing Withdrawal',
          labelSuccess: 'Withdrawal Successful',
          mutate: () => onWithdraw(token, amountWei),
          successTransactionModalProps: contractReceipt => ({
            title: 'Withdrawal Successful',
            content: 'Withdrawn',
            amount: {
              valueWei: amountWei,
              token: TOKENS.pusde,
            },
            transactionHash: contractReceipt.transactionHash,
          }),
        });
      };


    const setSelectedTokenHandler = (t: Token) => {
        let selected = tokens.find(x => x.address === t.address);
        setSelectedToken(selected);
    };
    const setSelectedAmountHandler = (e) => {
        let selected = Number(e);
        setSelectedAmount(selected);

        let balance = pusdeBalance;
        let _hasError = balance != null && selected > balance;
        let _errMessage = _hasError ? 'Insufficient Balance' : '';
        if (hasError != _hasError) {
            setHasError(_hasError);
            setErrorMessage(_errMessage);
        }
    };

    return (
        <>
            <Paper css={styles.container} className={className}>
                <div css={styles.panelSection}>
                    <AmountForm onSubmit={handleWithdraw}>
                    {({ dirty, isValid, setFieldValue, values }) => (
                        <>
                            <TokenSelectPanel
                                label = 'From'
                                token = {TOKENS.pusde}
                                tokens = {[TOKENS.pusde]}
                                onInput = { setSelectedAmountHandler }
                                disabled = {false}
                                readonly={isSubmitting}
                                showPercentButtons = {true}
                            />

                            <TokenSelectPanel
                                value={selectedAmount}
                                label = 'To'
                                token = {selectedToken}
                                tokens = {[ TOKENS.usde, TOKENS.eusde ]}
                                onTokenSelected = { setSelectedTokenHandler }
                                readonly={isSubmitting}
                                disabled = {false}
                                showPercentButtons = {false}
                            />

                            {!accountAddress && <ConnectButton fullWidth style={{'margin': '0'}} variant="primary"/> }

                            {accountAddress && <FormikSubmitButton
                            loading={isSubmitting}
                            disabled={!selectedAmount || hasError || isSubmitting}
                            fullWidth
                            enabledLabel={hasError ? errMessage : 'Withdraw'}
                            disabledLabel={hasError ? errMessage : 'Withdraw'}
                            />}
                        </>
                    )}
                    </AmountForm>
                </div>
            </Paper>


        </>
    );
};

export type PreDepositItemProps = Omit<
    WithdrawFormUiProps,
    'onStake' | 'onWithdraw' | 'closeActiveModal' | 'activeModal' | 'isWithdrawLoading'
>;

const WithdrawForm: React.FC<PreDepositItemProps> = ({
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
        <WithdrawFormUi
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

export default WithdrawForm;
