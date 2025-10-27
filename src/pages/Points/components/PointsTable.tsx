/** @jsxImportSource @emotion/react */
import { Box, Paper, Typography } from '@mui/material';
import { EllipseAddress, Pagination, Table, TableColumn } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'src/translation';
import { generateBlockchainScanUrl } from 'src/utilities';

import ico_users from 'src/assets/img/account.png';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { useGetPointsTable } from 'src/clients/api/queries/getPoints/getPointsTable';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { TOKENS } from 'src/constants/tokens';
import { useAuth } from 'src/context/AuthContext';
import useUrlPagination from 'src/hooks/useUrlPagination';
import { useLayout } from 'src/theme/useLayout';
import { NumberUtil } from 'src/utilities/NumberUtilt';

import { useStyles } from './PointsTableCss';

export const PointsTable: React.FC<any> = ({ history, location, ...containerProps }) => {
    const t = useLayout();
    const styles = useStyles();
    const { accountAddress, chainId } = useAuth();
    const { currentPage, setCurrentPage } = useUrlPagination({
        history,
        location,
    });

    const { data: table, isFetching } = useGetPointsTable({ page: currentPage + 1 });
    const { data: points } = useGetPointsStats({ accountAddress });

    const total = table?.total;
    const limit = 20;
    const rows = table?.data ?? [];
    const offset = currentPage * limit;
    const strats = TOKENS.strats;
    const totalPoints = points.info?.points ?? table?.points;

    rows.forEach((row, i) => {
        row.rank = offset + i + 1;
    });

    const columns: TableColumn<(typeof rows)[0]>[] = useMemo(
        () => [
            {
                key: 'rank',
                label: 'Rank',
                selectOptionLabel: 'Rank',
                renderCell: (row, i, params) => {
                    return <>{row.rank}</>;
                },
            },
            {
                key: 'address',
                label: 'Address',
                selectOptionLabel: 'Address',
                renderCell: row => {
                    return (
                        <Typography
                            component="a"
                            href={
                                chainId &&
                                generateBlockchainScanUrl({
                                    hash: row.address,
                                    urlType: 'address',
                                    chainId,
                                })
                            }
                            target="_blank"
                            rel="noreferrer"
                            variant="small2"
                            css={styles.txnHashText}
                        >
                            {row.name || <EllipseAddress address={row.address} />}
                        </Typography>
                    );
                },
            },
            // {
            //     key: 'pointsSupply',
            //     label: 'Points ',
            //     selectOptionLabel: 'Points on BSC',
            //     renderCell: row => {
            //         const formatted = NumberUtil.format(row.points?.chains?.bsc, { fraction: 0 });
            //         return <>{formatted}</>;
            //     },
            // },
            // {
            //     key: 'pointsBorrow',
            //     label: 'Points on opBNB',
            //     selectOptionLabel: 'Points on opBNB',
            //     renderCell: row => {
            //         const formatted = NumberUtil.format(row.points?.chains?.opbnb, { fraction: 0 });
            //         return <>{formatted}</>;
            //     },
            // },
            // {
            //     key: 'avgBoost',
            //     label: 'avg. Staking Boost',
            //     selectOptionLabel: 'avg. Staking Boost',
            //     renderCell: row => {
            //         const formatted = NumberUtil.format(row.points?.boost?.staking);
            //         return <>{formatted}</>;
            //     },
            // },
            {
                key: 'points',
                label: 'Points',
                selectOptionLabel: 'Points',
                renderCell: row => {
                    const formatted = NumberUtil.format(row.points?.total, { fraction: 0 });
                    return (
                        <div css={t.inlineHeight}>
                            <img src={strats.asset} alt={strats.symbol} />
                            <span>&nbsp; {formatted}</span>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const cardColumns: TableColumn<(typeof rows)[0]>[] = useMemo(
        () => [
            {
                key: 'rank',
                label: 'Rank',
                selectOptionLabel: 'Rank',
                renderCell: (row, i, params) => {
                    return (
                        <h5>
                            <span style={{ marginRight: '.5em' }}>#{row.rank}</span>
                            <Typography
                                component="a"
                                href={
                                    chainId &&
                                    generateBlockchainScanUrl({
                                        hash: row.address,
                                        urlType: 'address',
                                        chainId,
                                    })
                                }
                                target="_blank"
                                rel="noreferrer"
                                variant="small2"
                                css={styles.txnHashTextMobile}
                            >
                                {row.name || <EllipseAddress address={row.address} />}
                            </Typography>
                        </h5>
                    );
                },
            },
            // {
            //     key: 'pointsBsc',
            //     label: 'Points on BSC',
            //     selectOptionLabel: 'Points on BSC',
            //     renderCell: row => {
            //         const formatted = NumberUtil.format(row.points?.chains?.bsc, { fraction: 0 });
            //         return <>{formatted}</>;
            //     },
            // },
            // {
            //     key: 'pointsOpBnb',
            //     label: 'Points on opBNB',
            //     selectOptionLabel: 'Points on opBNB',
            //     renderCell: row => {
            //         const formatted = NumberUtil.format(row.points?.chains?.opbnb, { fraction: 0 });
            //         return <>{formatted}</>;
            //     },
            // },
            // {
            //     key: 'avgBoost',
            //     label: 'avg. Staking Boost',
            //     selectOptionLabel: 'avg. Staking Boost',
            //     renderCell: row => {
            //         const formatted = NumberUtil.format(row.points?.boost?.staking);
            //         return <>{formatted}</>;
            //     },
            // },
            {
                key: 'points',
                label: 'Points',
                selectOptionLabel: 'Points',
                renderCell: row => {
                    const formatted = NumberUtil.format(row.points?.total, { fraction: 0 });
                    return (
                        <div css={t.inlineHeight}>
                            <img src={ico_users} alt={strats.symbol} />
                            <span>&nbsp; {formatted}</span>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    return (
        <div css={styles.container}>
            <Paper css={styles.block} {...containerProps}>
                <div css={[t.row, t.gapBetween, t.fontHeading]}>
                    <div css={styles.blockTitle}>Points Leaderboard</div>
                    <Box css={t.row}>
                        <div css={[t.inlineHeight, t.pill]}>
                            <img src={ico_users} alt={strats.symbol} />
                            <span>
                                &nbsp;
                                {points == null ? (
                                    <SvgLoadingInlined />
                                ) : (
                                    <span className="number">{NumberUtil.format(totalPoints)}</span>
                                )}
                                <span className="label">Users</span>
                            </span>
                        </div>
                        <div css={[t.inlineHeight, t.pill]}>
                            <img src={strats.asset} alt={strats.symbol} />
                            <span>
                                &nbsp;
                                {table == null ? (
                                    <SvgLoadingInlined />
                                ) : (
                                    <span className="number">{NumberUtil.format(table.total)}</span>
                                )}
                                <span className="label">Points</span>
                            </span>
                        </div>
                    </Box>
                </div>

                <Table
                    columns={columns}
                    cardColumns={cardColumns}
                    rowWrapperMobile={styles.rowWrapperMobile}
                    rowTitleMobile={styles.rowTitleMobile}
                    data={rows}
                    rowKeyExtractor={row => `history-table-row-${row.rank}`}
                    breakpoint="xl"
                    css={styles.table}
                    isFetching={isFetching}
                />

                <Pagination
                    itemsCount={total}
                    onChange={setCurrentPage}
                    itemsPerPageCount={limit}
                />

                {table?.total && (
                    <Pagination
                        itemsCount={total}
                        onChange={setCurrentPage}
                        itemsPerPageCount={limit}
                    />
                )}
            </Paper>
        </div>
    );
};
