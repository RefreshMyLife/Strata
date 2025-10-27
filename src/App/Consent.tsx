/** @jsxImportSource @emotion/react */
import { InputLabel, Typography } from '@mui/material';
import { Button, Checkbox, Modal } from 'components';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { useAuth } from 'src/context/AuthContext';

const ConsentModal: React.FC<any> = ({}) => {
    const styles = useStyles();
    const { accountAddress } = useAuth();

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
        handleClose () {
            if (hasConsent) {
                ConsentStore.set();
            }
            setOpen(false);

            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 500);
        },
        toggleConsent () {
            hasConsent = !hasConsent;
            setConsent(hasConsent);
        }
    };

    let [open, setOpen] = useState(ConsentStore.get() === false);
    let [hasConsent, setConsent] = useState(false);
    let hasUser = !!accountAddress;

    if (!hasUser) {
        return null;
    }

    return <Modal
            isOpen={open}
            title="Terms of Service and Privacy Policy"
            handleClose={Controller.handleClose}
            style={{ textAlign: 'center' }}
            css={styles.modal}
            hideCloseButton
        >

        <div style={{ padding: '0', fontSize: '14px', textAlign: 'left' }}>
            <p>To proceed, please review and accept the following:</p>
            <p>By using the Strata application, you agree to our <a href="https://strata-money.gitbook.io/docs/resources/terms-of-service" target="_blank">Terms of Service</a> and <a href="https://strata-money.gitbook.io/docs/resources/privacy-policy" target="_blank">Privacy Policy</a>.</p>

            <p>
                <InputLabel style={{
                    whiteSpace: 'normal',
                    textOverflow: 'initial',
                    display: 'flex',
                    alignItems: 'start',
                    fontSize: '14px'
                }}>
                    <Checkbox value={hasConsent} onChange={Controller.toggleConsent} disableRipple={false}/>
                    <span>&nbsp;&nbsp;</span> I have read and agree to the terms. Don’t show again for 30 days.
                </InputLabel>

            </p>
            <center>
                <Button onClick={Controller.handleClose} color="primary" fullWidth>
                    Agree
                </Button>
            </center>
        </div>
    </Modal>;
};

export default ConsentModal;
