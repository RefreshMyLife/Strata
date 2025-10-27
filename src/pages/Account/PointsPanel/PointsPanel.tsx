// WithdrawFormUi

/** @jsxImportSource @emotion/react */
import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate} from 'react-router';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { QuinaryButton, TextButton } from 'src/components';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { routes } from 'src/constants/routing';
import { TOKENS } from 'src/constants/tokens';
import { useAuth } from 'src/context/AuthContext';
import { useLayout } from 'src/theme/useLayout';
import { PointsModal } from './PointsModal';
import { ProtocolsTable } from './ProtocolsTable';
import img_share from 'assets/img/icons/share.svg';
import { ShareReferralModal } from 'src/pages/PreDeposit/components/ShareReferralModal';
import { RefereesModal } from './RefereesModal';
import { NumberUtil } from 'src/utilities/NumberUtilt';


export const PointsPanel: React.FC<any> = ({
    ...props
}) => {
    const l = useLayout();
    const [ shareDialogShown, showReferralShareDialog ] = useState(false);
    const { accountAddress } = useAuth();
    const navigate = useNavigate();

    const [ isPointsModalOpened, showPointsModal ] = useState(false);
    const [ isRefereesModalOpened, showRefereesModal ] = useState(false);
    const { data: stats, isLoading } = useGetPointsStats({ accountAddress });
    const token = TOKENS.pusde;
    const strats = TOKENS.strats;
    let rank = (stats?.account?.rank ?? 0).toString();
    if (rank === '0') {
        rank = '—';
    }
    // const onViewLeaderboardClicked = () => {
    //     navigate(routes.points.path);
    // };


    return (
        <Paper css={l.paper}>
            <h2>Overview</h2>

            <div css={l.panels}>
                <div css={l.panel}>
                    <div css={l.row}>
                        <div css={[l.rowCell, l.panelIcon]}>
                            <img src={strats.asset} alt={strats.symbol} />
                        </div>
                        <div css={l.panelTitle}>
                            Strata Points Earned
                        </div>
                    </div>
                    <br />
                    <div css={[l.row]}>
                        <div style={{ paddingRight: '4em'}}>
                            <div css={[l.hint, l.white]}>Total</div>
                            <div css={l.panelCellValue}>
                                { stats == null ? <SvgLoadingInlined /> : NumberUtil.format(stats.account?.points?.total ?? 0) }
                            </div>
                        </div>
                        <div >
                            <div css={[l.hint, l.white]}>24 hour</div>
                            <div css={l.panelCellValue}>
                                { stats == null ? <SvgLoadingInlined /> : NumberUtil.abbr(stats.account?.points?.latest ?? 0) }
                            </div>
                        </div>
                    </div>
                </div>

                <div css={l.panel}>
                    <div css={l.row}>
                        <div css={[l.rowCell, l.panelIcon]}>
                            <img src={strats.asset} alt={token.symbol} />
                        </div>
                        <div css={l.panelTitle}>
                            Leaderboard Rank
                        </div>
                    </div>
                    <br />
                    <div css={[l.row, l.spaceBetween]}>
                        <div>
                            <div css={[l.hint, l.white]}>&nbsp;</div>
                            <div css={l.panelCellValue}>
                                { stats == null ? <SvgLoadingInlined /> : rank }
                            </div>
                        </div>
                        <div>
                            <div css={[l.hint, l.white]}>&nbsp;</div>
                            <TextButton className='transparent blue' onClick={() => showPointsModal(true)}>View Leaderboard →</TextButton>
                        </div>
                    </div>
                </div>

                <div css={l.panel}>
                    <div css={l.row}>
                        <div css={[l.rowCell, l.panelIcon]} style={{backgroundColor: '#012F41'}}>
                            <div className='svg_container'>
                                <img src={img_share} />
                            </div>
                        </div>
                        <div css={l.panelTitle}>
                            Refer to friends
                        </div>
                    </div>
                    <br />
                    <div css={[l.row, l.spaceBetween]}>
                        <div>
                            <div css={[l.hint, l.white]}>&nbsp;</div>
                            <div css={l.panelCellValue}>
                                <QuinaryButton className='gray sm' onClick={() => showRefereesModal(true)}>
                                    <span>See all referees</span>
                                    <svg height="10" viewBox="0 0 10 11" fill="none" className='icon'>
                                        <path opacity="0.5" d="M8.29074 5.87771L4.13366 9.43467C3.80924 9.71225 3.30859 9.48173 3.30859 9.05476L3.30859 1.94105C3.30859 1.51409 3.80922 1.28356 4.13365 1.56113L8.29073 5.11787C8.52398 5.31745 8.52399 5.67813 8.29074 5.87771Z" fill="#B4B4B2" stroke="#B4B4B2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                </QuinaryButton>
                            </div>
                        </div>
                        <div>
                            <div css={[l.hint, l.white]}>&nbsp;</div>
                            <TextButton className='transparent blue' onClick={() => showReferralShareDialog(true)}>Invite Friends →</TextButton>
                        </div>
                    </div>
                </div>
            </div>

            <div css={[l.line, l.spaceAbove]}></div>
            <h2>Activity</h2>
            <ProtocolsTable />

            <PointsModal isOpen={isPointsModalOpened} handleClose={() => showPointsModal(false)}/>
            <RefereesModal isOpen={isRefereesModalOpened} handleClose={() => showRefereesModal(false)}/>
            <ShareReferralModal isOpen={shareDialogShown} handleClose={() => showReferralShareDialog(false) }/>
        </Paper>
    );
};
