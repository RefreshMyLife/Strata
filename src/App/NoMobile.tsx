/** @jsxImportSource @emotion/react */
import { InputLabel, Typography } from '@mui/material';
import { AnchorButton, Button, Checkbox, Icon, Modal, PrimaryButton, QuinaryButton, TertiaryButton, toast } from 'components';
import React, { useState } from 'react';
import { useStyles } from './styles';
import img_strata from 'assets/img/icons/strata.svg';
import { useAuth } from 'src/context/AuthContext';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { ReferralService } from 'src/services/ReferralService';
import { signMessage } from '@wagmi/core';
import { SHAPE } from 'src/theme/MuiThemeProvider/muiTheme';
import { useLayout } from 'src/theme/useLayout';
import { ReactComponent as LogoDesktop } from 'assets/img/StrataLogoWithTextV2.svg';

import img_no_mobile from 'assets/img/background/mobile.png';
import { STRATA_DISCORD_URL } from 'src/components/Layout/Footer/constants';

export const NoMobile: React.FC<any> = ({}) => {
    const styles = useStyles();
    const l = useLayout();

    if (window.innerWidth > 900) {
        return null;
    }
    document.body.style.overflow = 'hidden';
    return <div css={styles.noMobile}>
        <div className='header'>
            <LogoDesktop className='logo'/>
        </div>
        <div className='body' css={[l.column, l.spaceAround, l.selfCenter]}>
            <div>
                <img className='keyvisual' src={img_no_mobile} alt='Use desktop' />
            </div>
            <div className='title'>
                Access via Desktop <br/>
                Enjoy the Full Experience
            </div>
            <div className='text' >
                We’re currently optimising the mobile experience.<br/>Please use a desktop to access the app
            </div>

            <div>
                <AnchorButton href={STRATA_DISCORD_URL} target='_blank' className='transparent blue link' variant='text'>
                    Contact us on Discord →
                </AnchorButton>
            </div>
        </div>
    </div>
}
