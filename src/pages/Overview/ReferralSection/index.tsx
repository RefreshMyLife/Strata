/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { Button } from 'components';
import React, { useState } from 'react';

import ReferralIcon from 'assets/img/referral_icon.svg';
import { useAuth } from 'context/AuthContext';
import ConnectButton from 'src/components/Layout2/ConnectButton';
import { InviteFriendDialog } from 'src/pages/Points2/PointsWalletConnected/InviteFriendDialog';

import { useStyles } from './styles';

const ReferralSection: React.FC = () => {
    const styles = useStyles();
    const { accountAddress } = useAuth();
    const isConnected = !!accountAddress;
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const handleInviteFriend = () => {
        setIsInviteDialogOpen(true);
    };

    if (isConnected) {
        return (
            <div css={styles.container(true)}>
                <div css={styles.iconContainer}>
                    <img src={ReferralIcon} alt="Referral Icon" width="90" height="90" />
                </div>

                <div css={styles.content(true)}>
                    <Typography variant="h4" css={styles.title}>
                        Refer to Friends
                    </Typography>
                    <Typography variant="body2" css={styles.subtitle}>
                        Invite your friends and get 10% of Strata Points earned by them.
                    </Typography>
                </div>

                <Button
                    variant="secondary"
                    css={styles.inviteButton(true)}
                    onClick={handleInviteFriend}
                >
                    Share Link
                </Button>
                <InviteFriendDialog
                    isOpen={isInviteDialogOpen}
                    onClose={() => setIsInviteDialogOpen(false)}
                />
            </div>
        );
    }

    return (
        <div css={styles.container(false)}>
            <div css={styles.content(false)}>
                <Typography variant="h4" css={styles.title}>
                    Refer to Friends
                </Typography>
                <Typography variant="body2" css={styles.subtitle}>
                    Invite your friends and get 10% of Strata Points earned by them.
                </Typography>
            </div>

            <ConnectButton css={styles.conntectBtn} />
        </div>
    );
};

export default ReferralSection;
