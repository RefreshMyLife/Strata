/** @jsxImportSource @emotion/react */
import { InputLabel, Typography } from '@mui/material';
import { Button, Checkbox, Icon, Modal, PrimaryButton, QuinaryButton, TertiaryButton, toast } from 'components';
import React, { useState } from 'react';
import { useStyles } from './styles';
import img_strata from 'assets/img/icons/strata.svg';
import { useAuth } from 'src/context/AuthContext';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { ReferralService } from 'src/services/ReferralService';
import { signMessage } from '@wagmi/core';
import { SHAPE } from 'src/theme/MuiThemeProvider/muiTheme';
import { useLayout } from 'src/theme/useLayout';
import web3Config from 'src/libs/wallet/Web3Wrapper/config';

export const ReferredModal: React.FC<any> = ({}) => {
    const styles = useStyles();
    const l = useLayout();
    const { accountAddress } = useAuth();
    const [ isSubmitting, setSubmitting ] = useState(false);
    const [ isSubmitCompleted, setSubmitCompleted ] = useState(false);
    const refereeCode = ReferralService.fromUri();

    const ConsentStore = {
        get (): boolean {
            let val = localStorage.getItem('consent');
            if (!val) {
                return false;
            }
            let date = new Date(val);
            let diff = Date.now() - date.getTime();
            if (diff > 30 * 24 * 60 * 60 * 1000) {
                return false;
            }
            return true;
        },
        set () {
            localStorage.setItem('consent', new Date().toISOString());
        }
    };

    const Controller = {
        async doEnterCode () {
            setSubmitting(true);
            try {
                let code = refereeCode;
                let message = ReferralService.getMessage({ accountAddress, ref: code });

                let signature = await signMessage(web3Config, { message });
                if (signature) {
                    let result = await ReferralService.submitReferral({
                        accountAddress: accountAddress,
                        ref: code,
                        signature,
                        message,
                    });

                    setSubmitting(false);
                    if (result != null) {
                        setSubmitCompleted(true);
                    }
                }
            } catch (error) {
                setSubmitting(false);
            }
        },
        handleClose () {
            if (hasConsent) {
                ConsentStore.set();
            }
            Controller.cleanUri();
            setOpen(false);
        },
        toggleConsent () {
            hasConsent = !hasConsent;
            setConsent(hasConsent);
        },
        cleanUri () {
            const url = new URL(window.location.href);
            url.searchParams.delete('ref');
            window.history.replaceState({}, '', url);
        }
    };

    let [open, setOpen] = useState(!!refereeCode);
    let [hasConsent, setConsent] = useState(false);

    return <Modal
        isOpen={open}
        handleClose={Controller.handleClose}
        style={{ textAlign: 'center' }}
        css={styles.refModal}
        hideCloseButton

    >
        <img src={img_strata} style={{ height: '60px' }} />
        <div css={styles.refTitle}>
            You are invited to <br /> the Strata Season 1
        </div>
        <div css={styles.refInfo}>
            {!isSubmitCompleted && <span>Confirm the invitation by signing this message and get a 10% boost on your Strata Points.</span>}
            {isSubmitCompleted && <>
                <div css={[l.row, l.flexCenter]}>
                    <Icon name='checkInline' size={SHAPE.iconSize.xxLarge} style={{ color: '#07AE3B', height: '2em' }}/>
                    <span>&nbsp; Accepted!</span>
                </div>
            </>}
        </div>
        <div css={styles.buttons}>
            {accountAddress && !isSubmitCompleted && <PrimaryButton onClick={Controller.doEnterCode} fullWidth loading={isSubmitting} disabled={isSubmitCompleted}>
                Sign
            </PrimaryButton>}
            {!accountAddress && <ConnectButton fullWidth variant='primary' />}
            <TertiaryButton onClick={Controller.handleClose} fullWidth disabled={isSubmitting}>
                Close
            </TertiaryButton>
        </div>
    </Modal>;
};
