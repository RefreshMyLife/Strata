/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React from 'react';
import { Spinner, TokenIcon } from 'src/components';
import { getUniqueContract } from 'src/packages/contracts';
import { CooldownsService } from 'src/services/CooldownsService';

import jrUSDe from 'assets/img/tokens/jrUSDe.svg';
import srUSDe from 'assets/img/tokens/srUSDe.svg';
import SvgLoading, { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { TOKENS } from 'src/constants/tokens';
import { useAuth } from 'src/context/AuthContext';
import useHandleTransactionMutation from 'src/hooks/useHandleTransactionMutation';
import { BigNumberUtil } from 'src/utilities/BigNumberUtil';
import { DateUtil } from 'src/utilities/DateUtil';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { PromiseUtil } from 'src/utilities/PromiseUtil';

import { useStyles } from './ViewCooldownsCss';

export const ViewCooldowns: React.FC<any> = ({}) => {
    const styles = useStyles();
    const { accountAddress } = useAuth();
    const { data: overview, isLoading } = CooldownsService.useGetOverview(accountAddress);

    return (
        <div css={styles.container}>
            <div css={styles.header}>
                <Typography variant="h5" css={styles.title}>
                    Cooldowns
                </Typography>
            </div>

            <div css={styles.boxesContainer}>
                <div css={styles.historyBox}>
                    {overview == null && <Spinner />}
                    {overview != null &&
                        overview.map((status, i) => <CooldownOverview key={i} status={status} />)}
                </div>
            </div>
        </div>
    );
};

const CooldownOverview: React.FC<{ status: CooldownsService.TCooldownStatus }> = ({ status }) => {
    const styles = useStyles();
    const unlockAt =
        status.nextUnlockAt === 0 ? '—' : DateUtil.format(new Date(status.nextUnlockAt * 1000));
    const amountReady =
        status.claimable === 0 && status.nextUnlockAt === 0
            ? '—'
            : NumberUtil.abbr(status.claimable);
    const amountPending = status.pending === 0 ? '—' : NumberUtil.abbr(status.pending);
    const amountNextUnlock =
        status.nextUnlockAmount === 0 ? '—' : NumberUtil.abbr(status.nextUnlockAmount);

    return (
        <div css={styles.historyItem}>
            <div css={styles.itemLeft}>
                <TokenIcon token={status.underlyingToken} css={styles.tokenIcon} />
                <div css={styles.itemDetails}>
                    <span css={styles.itemAction}>
                        {status.type === 'unstake' ? 'Unstake' : 'Cooldown'}
                    </span>
                    <span css={styles.itemToken}>{status.underlyingToken.symbol}</span>
                </div>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemDate}>Ready</span>
                {status.claimable === 0 && <span css={styles.itemDateValue}>{amountReady}</span>}
                {status.claimable > 0 && <FinalizeItem status={status} />}
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemLabel}>Total</span>
                <span css={styles.itemDateValue}>{amountPending}</span>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemLabel}>Next Unlock</span>
                <span css={styles.itemDateValue}>{amountNextUnlock}</span>
            </div>
            <div css={styles.itemColumn}>
                <span css={styles.itemLabel}>Date</span>
                <span css={styles.itemDateValue}>{unlockAt}</span>
            </div>
        </div>
    );
};

const FinalizeItem: React.FC<{ status: CooldownsService.TCooldownStatus }> = ({ status }) => {
    const styles = useStyles();
    const { accountAddress, signer } = useAuth();
    const handleTransactionMutation = useHandleTransactionMutation();
    const [isBusy, setIsBusy] = React.useState(false);
    const amountReady =
        status.claimable === 0 && status.nextUnlockAt === 0
            ? '—'
            : NumberUtil.abbr(status.claimable);

    const onClaimClicked = async () => {
        if (!isBusy) {
            handleFinalize();
        }
    };
    const handleFinalize = async () => {
        return handleTransactionMutation({
            label: 'Claiming tokens',
            labelSuccess: 'Tokens Claimed Successfully',
            mutate: () => doFinalize(),
            successTransactionModalProps: contractReceipt => ({
                title: `Tokens Claimed Successfully`,
                content: `You have successfully claimed`,
                amount: {
                    valueWei: BigNumberUtil.toWei(status.claimable),
                    token: status.underlyingToken,
                },
                transactionHash: contractReceipt.transactionHash,
            }),
        });
    };
    const doFinalize = async () => {
        setIsBusy(true);
        try {
            let tx = await CooldownsService.doFinalize(
                signer,
                status.token,
                accountAddress,
                status.type,
            );
            let receipt = await tx.wait();
            invalidateQueries();
            return receipt;
        } finally {
            setIsBusy(false);
        }
    };
    const invalidateQueries = () => {
        PromiseUtil.clearMemoized();
        PromiseUtil.clearTrackedQuery();
    };

    let outputToken = status.token;
    if (status.type === 'unstake') {
        switch (status.token.symbol) {
            case 'sUSDe':
                outputToken = TOKENS.usde;
                break;
        }
    }

    return (
        <span css={[styles.itemStatusClaim, styles.clickable]} onClick={onClaimClicked}>
            <span>
                Claim {amountReady} {outputToken.symbol}{' '}
            </span>
            {isBusy ? <SvgLoadingInlined /> : '•'}
        </span>
    );
};
