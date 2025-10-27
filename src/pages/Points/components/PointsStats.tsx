/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'src/translation';

import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { useAuth } from 'src/context/AuthContext';

import { useStyles } from './PointsStatsCss';
import { NumberUtil } from 'src/utilities/NumberUtilt';

export const PointsStats: React.FC<any> = ({ ...containerProps }) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const { accountAddress } = useAuth();
    const { data: stats } = useGetPointsStats({ accountAddress });

    return (
        <div css={styles.container}>
            <Paper css={styles.block} {...containerProps}>
                <div css={styles.blockTitle}>My points summary</div>
                <div css={styles.blockRow} className='bold'>
                    <div css={styles.rowTitle}>Total points</div>
                    <div css={styles.rowValue}>{NumberUtil.format(stats?.account?.points?.total ?? 0)}</div>
                </div>
                <div css={styles.blockRow} className='bold'>
                    <div css={styles.rowTitle}>Ranking</div>
                    <div css={styles.rowValue}>{stats?.account?.rank ?? 0}</div>
                </div>
                <hr/>
                <div css={styles.blockRow}>
                    <div css={styles.rowTitle}>Borrowing</div>
                    <div css={styles.rowValue}>{NumberUtil.format(stats?.account?.points?.borrow ?? 0)}</div>
                </div>
                <div css={styles.blockRow}>
                    <div css={styles.rowTitle}>Lending</div>
                    <div css={styles.rowValue}>{NumberUtil.format(stats?.account?.points?.supply ?? 0)}</div>
                </div>
                <div css={styles.blockRow}>
                    <div css={styles.rowTitle}>Avg. Boost</div>
                    <div css={styles.rowValue}>{NumberUtil.format(stats?.account?.points?.boost?.staking ?? 1)}</div>
                </div>
            </Paper>
            <Paper css={styles.block} {...containerProps}>
                <div css={styles.blockTitle}>Total points summary</div>
                <div css={styles.blockRow}>
                    <div css={styles.rowTitle}>Daily Snapshot</div>
                    <div css={styles.rowValue} style={{ minWidth: '4em' }}>
                        {stats?.info?.next && <Timer deadline={stats?.info.next} /> }
                    </div>
                </div>
                <div css={styles.blockRow}>
                    <div css={styles.rowTitle}>Total Days</div>
                    <div css={styles.rowValue}>{stats?.info?.days ?? 0}d</div>
                </div>
                <div css={styles.blockRow}>
                    <div css={styles.rowTitle}>Total points awarded</div>
                    <div css={styles.rowValue}>{NumberUtil.format(stats?.info?.points ?? 0)}</div>
                </div>
            </Paper>
        </div>
    );
};



export const Timer: React.FC<{ deadline }> = ({
    deadline
}) => {

    if (deadline == null) {
        return null;
    }

    if (typeof deadline === 'string') {
        deadline = new Date(deadline);
    }
    if (deadline instanceof Date) {
        deadline = deadline.getTime();
    }

    function serialize (span: number) {
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
    function getText () {
        let now = Date.now();
        if (now > deadline) {
            deadline += 24 * 60 * 60 * 1000;
        }
        return serialize(deadline - Date.now());
    }

    const [ timer, setTimer ] = useState('');
    function updateTime () {
        setTimer(getText());
    }

    useEffect(() => {
        const interval = setInterval(() => updateTime(), 1000);

        return () => clearInterval(interval);
      }, [timer]);

    return <span>{timer}</span>;
}
