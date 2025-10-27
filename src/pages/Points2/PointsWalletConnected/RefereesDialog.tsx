/** @jsxImportSource @emotion/react */
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { EllipseAddress } from 'src/components';
import { ReferralService } from 'src/services/ReferralService';

import { ReactComponent as ChevronLeft } from 'src/assets/img/icons/chevron-left.svg';
import { ReactComponent as ChevronRight } from 'src/assets/img/icons/chevron-right.svg';
import { ReactComponent as CloseIcon } from 'src/assets/img/icons/close.svg';
import { ReactComponent as StrataIcon } from 'src/assets/img/tokens/strata.svg';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import SvgLoading, { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { useRefereesStyles } from './refereesDialogStyles';

interface RefereeEntry {
    address: string;
    points: number;
}

interface RefereesDialogProps {
    isOpen: boolean;
    onClose: () => void;
    season: 'season1' | 'season0';
    accountAddress: string;
}

export const RefereesDialog: React.FC<RefereesDialogProps> = ({
    season,
    accountAddress,
    isOpen,
    onClose,
}) => {
    const s = Number(season.replace('season', '')) as 0 | 1;
    const styles = useRefereesStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: table, isFetching } = ReferralService.useGetReferees({
        accountAddress,
        season: s,
    });
    const { data: stats } = useGetPointsStats({ accountAddress, season: s });
    const isReady = stats != null && table != null;
    if (isReady) {
        table.collection = [
            { address: '0x8e5b...4d93', points: 1001 },
            { address: '0x8e5b...4d93', points: 1002 },
            { address: '0x8e5b...4d93', points: 1003 },
            { address: '0x8e5b...4d93', points: 1004 },
            { address: '0x8e5b...4d93', points: 1005 },
            { address: '0x8e5b...4d93', points: 1006 },
            { address: '0x8e5b...4d93', points: 1007 },
            { address: '0x8e5b...4d93', points: 1008 },
            { address: '0x8e5b...4d93', points: 1009 },
            { address: '0x8e5b...4d93', points: 10010 },
            { address: '0x8e5b...4d93', points: 10011 },
            { address: '0x8e5b...4d93', points: 10012 },
        ];
    }

    // Mock data - replace with actual data
    const limit = 7;
    const offset = (currentPage - 1) * limit;
    const totalPages = isReady ? Math.ceil(table.collection.length / limit) : 0;
    const rows = table == null ? [] : table.collection.slice(offset, offset + limit);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={false}
            PaperProps={{
                sx: theme => ({
                    background: 'rgba(4, 8, 10, 1)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    boxShadow: '0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset',
                    width: '640px',
                    maxWidth: 'calc(100vw - 40px)',
                    maxHeight: 'calc(100vh - 40px)',
                    margin: 0,

                    [theme.breakpoints.down('sm')]: {
                        width: '100vw',
                        height: '70vh',
                        maxWidth: '100vw',
                        maxHeight: '70vh',
                        alignSelf: 'end',
                        padding: '10px',
                    },
                }),
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(4px)',
                    },
                },
            }}
        >
            <DialogContent css={styles.dialogContent}>
                <div css={styles.content}>
                    {/* Header */}
                    <div css={styles.header}>
                        <Typography variant="h2" css={styles.title}>
                            Season {s} Referees
                        </Typography>
                        <IconButton css={styles.closeButton} onClick={onClose}>
                            <CloseIcon width="14" height="14" />
                        </IconButton>
                    </div>
                    <div css={styles.tableContainer}>
                        <div css={styles.statsContainer}>
                            <div css={styles.statItem}>
                                <svg
                                    width="14"
                                    height="11"
                                    viewBox="0 0 14 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.5 2.5C7.5 3.88071 6.38071 5 5 5C3.61929 5 2.5 3.88071 2.5 2.5C2.5 1.11929 3.61929 0 5 0C6.38071 0 7.5 1.11929 7.5 2.5Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M9.90078 10.0064C10.0099 10.5478 9.55179 11 8.99951 11H0.999506C0.447222 11 -0.0109252 10.5478 0.098233 10.0064C0.559033 7.72096 2.57829 6 4.99951 6C7.42072 6 9.43998 7.72096 9.90078 10.0064Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M13.0022 10H11.4129C11.4049 9.90533 11.3911 9.8086 11.3712 9.70991C11.1774 8.74856 10.7717 7.86398 10.205 7.10709C10.4588 7.03728 10.7262 7 11.0022 7C12.3152 7 13.4312 7.84347 13.8379 9.01811C14.0185 9.54 13.5545 10 13.0022 10Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                    <path
                                        d="M11 6C12.1046 6 13 5.10457 13 4C13 2.89543 12.1046 2 11 2C9.89543 2 9 2.89543 9 4C9 5.10457 9.89543 6 11 6Z"
                                        fill="#90A0AC"
                                        fillOpacity="0.8"
                                    />
                                </svg>
                                <span css={styles.statLabel}>My Referees:</span>
                                <span css={styles.statValue}>
                                    {table == null ? (
                                        <SvgLoadingInlined />
                                    ) : (
                                        table.collection?.length
                                    )}
                                </span>
                            </div>

                            <div css={styles.statItem}>
                                <StrataIcon width="16px" height="16px" />
                                <span css={styles.statLabel}>Earned Points:</span>
                                <span css={styles.statValue}>
                                    {stats == null ? (
                                        <SvgLoadingInlined />
                                    ) : (
                                        NumberUtil.abbr(stats?.account?.points?.referral)
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Table */}
                        <div css={styles.tableContainer}>
                            <div css={styles.tableHeader}>
                                <div css={styles.headerCell}>Address</div>
                                <div css={styles.headerCell}>Points</div>
                            </div>

                            <div css={styles.tableBody}>
                                {!isReady && (
                                    <SvgLoading
                                        style={{ height: '48px', verticalAlign: 'middle' }}
                                    />
                                )}
                                {isReady &&
                                    rows.map((entry, index) => (
                                        <div
                                            key={`${entry.address}-${index}`}
                                            css={styles.tableRow}
                                        >
                                            <div css={styles.cell}>
                                                <EllipseAddress address={entry.address} />
                                            </div>
                                            <div css={styles.cell}>
                                                <StrataIcon
                                                    width="20px"
                                                    height="20px"
                                                    style={{
                                                        marginRight: '4px',
                                                        verticalAlign: 'text-bottom',
                                                    }}
                                                />
                                                {entry.points}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    {isReady && (
                        <PaginationButtons
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

interface IPaginationButtonsProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
}

const PaginationButtons: React.FC<IPaginationButtonsProps> = ({
    currentPage,
    totalPages,
    handlePageChange,
}) => {
    const styles = useRefereesStyles();

    const renderPaginationButtons = () => {
        const buttons = [];

        // First page
        if (currentPage > 2) {
            buttons.push(
                <button key={1} css={styles.pageButton} onClick={() => handlePageChange(1)}>
                    1
                </button>,
            );
        }

        // Current page
        buttons.push(
            <button
                key={currentPage}
                css={[styles.pageButton, styles.activePageButton]}
                onClick={() => handlePageChange(currentPage)}
            >
                {currentPage}
            </button>,
        );

        // Next page
        if (currentPage < totalPages) {
            buttons.push(
                <button
                    key={currentPage + 1}
                    css={styles.pageButton}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {currentPage + 1}
                </button>,
            );
        }

        // Third page
        if (currentPage + 1 < totalPages) {
            buttons.push(
                <button
                    key={currentPage + 2}
                    css={styles.pageButton}
                    onClick={() => handlePageChange(currentPage + 2)}
                >
                    {currentPage + 2}
                </button>,
            );
        }

        // Last page indicator
        if (currentPage < totalPages - 2) {
            buttons.push(
                <span key="ellipsis" css={styles.ellipsis}>
                    ...
                </span>,
            );
            buttons.push(
                <button
                    key={totalPages}
                    css={styles.pageButton}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>,
            );
        }

        return buttons;
    };

    return (
        <div css={styles.pagination}>
            <button
                css={[styles.pageButton, styles.prevButton]}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft />
            </button>

            {renderPaginationButtons()}

            <button
                css={[styles.pageButton, styles.nextButton]}
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                <ChevronRight />
            </button>
        </div>
    );
};
