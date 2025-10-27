/** @jsxImportSource @emotion/react */
import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { MetricsService } from 'src/services/MetricsService';

import { Assets } from './Assets';
import { ProtocolTransactions } from './ProtocolTransactions';
import { Reserves } from './Reserves';
import { useStyles } from './styles';

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
    <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={expanded ? 'expanded' : ''}
    >
        <path
            d="M3.62669 5.61333L0.426596 1.34666C0.0310436 0.819272 0.407347 0.0666504 1.06659 0.0666504H7.46659C8.12582 0.0666504 8.50213 0.819252 8.1066 1.34664L4.90669 5.61331C4.5867 6.03998 3.9467 6.03999 3.62669 5.61333Z"
            fill="white"
        />
    </svg>
);

export const NewDashboardUi: React.FC = () => {
    const styles = useStyles();
    const [assetsExpanded, setAssetsExpanded] = useState(true);
    const [reservesExpanded, setReservesExpanded] = useState(true);
    const [protocolExpanded, setProtocolExpanded] = useState(true);

    return (
        <div css={styles.container}>
            {/* Assets Section */}
            <div css={styles.sectionStyles}>
                <button
                    css={styles.headerStyles}
                    onClick={() => setAssetsExpanded(!assetsExpanded)}
                >
                    <h2>Assets</h2>
                    <ChevronIcon expanded={assetsExpanded} />
                </button>
                <Collapse in={assetsExpanded}>
                    <div css={styles.expandedContent}>
                        <Assets />
                    </div>
                </Collapse>
            </div>

            {/* Reserves Section */}
            <div css={styles.sectionStyles}>
                <button
                    css={styles.headerStyles}
                    onClick={() => setReservesExpanded(!reservesExpanded)}
                >
                    <h2>Reserves</h2>
                    <ChevronIcon expanded={reservesExpanded} />
                </button>
                <Collapse in={reservesExpanded}>
                    <div css={styles.expandedContent}>
                        <Reserves />
                    </div>
                </Collapse>
            </div>

            {/* Protocol Transactions Section */}
            {/* <div css={styles.sectionStyles}>
                <button
                    css={styles.headerStyles}
                    onClick={() => setProtocolExpanded(!protocolExpanded)}
                >
                    <h2>Protocol Transactions</h2>
                    <ChevronIcon expanded={protocolExpanded} />
                </button>
                <Collapse in={protocolExpanded}>
                    <div css={styles.expandedContent}>
                        <ProtocolTransactions />
                    </div>
                </Collapse>
            </div> */}
        </div>
    );
};
