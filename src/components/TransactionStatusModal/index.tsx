/** @jsxImportSource @emotion/react */
import { Button, Icon, TokenIcon } from 'components';
import React from 'react';
import { Token } from 'src/types';

import CheckSvg from '../../assets/img/icons/check.svg';
import SpinnerSvg from '../../assets/img/icons/spinner.svg';
import SuccessModalCheckSvg from '../../assets/img/icons/success-modal-check.svg';
import UnsuccessModalSvg from '../../assets/img/icons/unsucess-modal.svg';
import USDeSvg from '../../assets/img/tokens/USDe.svg';
import SrUSDeSvg from '../../assets/img/tokens/srUSDe.svg';

import { Spinner } from '../Spinner';
import { useStyles } from './styles';

export interface TransactionStep {
    title: string;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    amount?: string | number; // For success/failure modal
    token?: Token; // For success/failure modal
    inputAmount?: string; // For failure modal (original input amount)
    inputToken?: string; // For failure modal (original input token)
}

export interface TransactionStatusModalProps {
    steps: TransactionStep[];
    isOpen: boolean;
    handleClose: () => void;
}

export const TransactionStatusModal: React.FC<TransactionStatusModalProps> = ({
    steps,
    isOpen,
    handleClose,
}) => {
    const styles = useStyles();

    // Check if this is the success modal (step 4) or failure modal
    const isSuccessModal = steps.length === 1 && steps[0]?.title === 'success';
    const isFailureModal = steps.length === 1 && steps[0]?.title === 'failure';

    const renderStepIcon = (status: TransactionStep['status']) => {
        switch (status) {
            case 'completed':
                return (
                    <div css={styles.stepIconCompleted}>
                        <img src={CheckSvg} alt="Completed" css={styles.checkIcon} />
                    </div>
                );
            case 'in_progress':
                return <div css={styles.stepIconPending} />; // Show pending circle for in_progress on left side
            case 'failed':
                return <Icon name="close" css={styles.stepIconFailed} />;
            case 'pending':
            default:
                return <div css={styles.stepIconPending} />;
        }
    };

    if (!isOpen) {
        return null;
    }

    // Render success modal (step 4)
    if (isSuccessModal) {
        return (
            <>
                <div css={styles.backdrop} onClick={handleClose} />
                <div css={styles.successDialog}>
                    <Button css={styles.successCloseIcon} onClick={handleClose}>
                        <Icon
                            name="close"
                            size={`${styles.closeIconSize}`}
                            css={styles.closeIconSvg}
                        />
                    </Button>
                    <div css={styles.successContent}>
                        <img
                            src={SuccessModalCheckSvg}
                            alt="Success"
                            css={styles.successCheckIcon}
                        />
                        <div css={styles.successTitle}>Transaction Successful</div>
                        <div css={styles.successSubtitle}>
                            Bought {steps[0]?.amount} <TokenIcon token={steps[0]?.token} />{' '}
                            {steps[0]?.token.symbol}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Render failure modal
    if (isFailureModal) {
        return (
            <>
                <div css={styles.backdrop} onClick={handleClose} />
                <div css={styles.failureDialog}>
                    <Button css={styles.successCloseIcon} onClick={handleClose}>
                        <Icon
                            name="close"
                            size={`${styles.closeIconSize}`}
                            css={styles.closeIconSvg}
                        />
                    </Button>
                    <div css={styles.successContent}>
                        <img src={UnsuccessModalSvg} alt="Failed" css={styles.successCheckIcon} />
                        <div css={styles.failureTitle}>Transaction Failed</div>
                        <div css={styles.successSubtitle}>
                            {steps[0]?.inputAmount || '2,938'}{' '}
                            <img src={USDeSvg} alt="USDe" css={styles.tokenIcon} />{' '}
                            {steps[0]?.inputToken || 'USDe'} → {steps[0]?.amount || '2,338'}{' '}
                            <img src={SrUSDeSvg} alt="srUSDe" css={styles.tokenIcon} />{' '}
                            {steps[0]?.token || 'srUSDe'}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Render normal transaction steps modal (steps 1-3)
    return (
        <>
            <div css={styles.backdrop} onClick={handleClose} />
            <div css={styles.dialog}>
                <div css={styles.dialogHeading}>
                    Transaction Status
                    <Button css={styles.closeIcon} onClick={handleClose}>
                        <Icon
                            name="close"
                            size={`${styles.closeIconSize}`}
                            css={styles.closeIconSvg}
                        />
                    </Button>
                </div>
                <div css={styles.dialogHeadingBorder} />
                <div css={styles.dialogBody}>
                    <div css={styles.stepsContainer}>
                        {steps.map((step, index) => (
                            <div key={index} css={styles.stepItem}>
                                <div css={styles.stepLeft}>
                                    {renderStepIcon(step.status)}
                                    <div css={styles.stepContent}>
                                        <div
                                            css={[
                                                styles.stepTitle,
                                                step.status === 'completed' &&
                                                    styles.stepTitleCompleted,
                                                step.status === 'in_progress' &&
                                                    styles.stepTitleInProgress,
                                                step.status === 'failed' && styles.stepTitleFailed,
                                            ]}
                                        >
                                            {step.title}
                                        </div>
                                    </div>
                                </div>
                                <div css={styles.stepIconContainer}>
                                    {step.status === 'in_progress' ? (
                                        <img
                                            src={SpinnerSvg}
                                            alt="Loading"
                                            css={styles.stepIconSpinner}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
