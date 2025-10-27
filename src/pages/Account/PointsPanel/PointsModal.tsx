/** @jsxImportSource @emotion/react */
import { Box, Paper, Typography } from '@mui/material';
import { EllipseAddress, Modal, Pagination, Table, TableColumn } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'src/translation';

import { useGetPointsTable } from 'src/clients/api/queries/getPoints/getPointsTable';
import { useAuth } from 'src/context/AuthContext';
import useUrlPagination from 'src/hooks/useUrlPagination';

import { useStyles } from './PointsTableCss';
import { generateBlockchainScanUrl } from 'src/utilities';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { useLayout } from 'src/theme/useLayout';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import { TOKENS } from 'src/constants/tokens';
import ico_users from 'src/assets/img/account.png';



export const PointsModal: React.FC<any> = ({
    isOpen = false,
    handleClose,
}) => {
    const t = useLayout();
    const styles = useStyles();
    const { accountAddress, chainId } = useAuth();
    const [ currentPage, setCurrentPage ] = useState(0);

    const limit = 10;
    const { data: table, isFetching } = useGetPointsTable({ page: currentPage + 1, limit: limit });
    const { data: points } = useGetPointsStats({ accountAddress });

    const total = table?.total;
    const rows = table?.data ?? [];
    const offset = currentPage * limit;
    const strats = TOKENS.strats;

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
                    return <Typography
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
                        {
                            row.name || <EllipseAddress address={row.address} />
                        }
                    </Typography>
                },
            },
            {
                key: 'points',
                label: 'Points',
                selectOptionLabel: 'Points',
                renderCell: row => {
                    const formatted = NumberUtil.format(row.points?.total, { fraction: 0 });
                    return <div css={t.inlineHeight}>
                        <img src={strats.asset} alt={strats.symbol} />
                        <span>&nbsp; {formatted}</span>
                    </div>;
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
                    return <h5>
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
                            {
                                row.name || <EllipseAddress address={row.address} />
                            }
                    </Typography>
                    </h5>;
                },
            },
            {
                key: 'points',
                label: 'Points',
                selectOptionLabel: 'Points',
                renderCell: row => {
                    const formatted = NumberUtil.format(row.points?.total, { fraction: 0 });
                    return <div css={t.inlineHeight}>
                        <img src={ico_users} alt={strats.symbol} />
                        <span>&nbsp; {formatted}</span>
                    </div>;
                },
            },
        ],
        [],
    );


    const Header = (props) => {

        return <div css={[t.row, t.gapBetween, t.fontHeading, styles.header]}>
            <div css={styles.blockTitle}>Points Leaderboard</div>
            <Box css={t.row}>
                <div css={[styles.headerBadge, t.inlineHeight, t.pill]}>
                    <img src={ico_users} alt={strats.symbol} />
                    <span>&nbsp;
                        {table == null ? <SvgLoadingInlined/> : (<span className='number'>{NumberUtil.format(table.total, { fraction: 0 })}</span>)}
                        <span className='label'>Users</span>
                    </span>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div css={[styles.headerBadge, t.inlineHeight, t.pill]}>
                    <img src={strats.asset} alt={strats.symbol} />
                    <span>&nbsp;
                        {points == null ? <SvgLoadingInlined /> : (<span className='number'>{NumberUtil.format(points.info?.points, { fraction: 0 })}</span>)}
                        <span className='label'>Points</span>

                    </span>
                </div>
            </Box>
        </div>
    }

    return (
        <Modal isOpen={isOpen} header={<Header/>} handleClose={handleClose} css={styles.modal}>
            <div css={styles.container}>
                <Paper css={styles.block}>


                    <Table
                        columns={columns}
                        cardColumns={columns}
                        rowWrapperMobile={styles.rowWrapperMobile}
                        rowTitleMobile={styles.rowTitleMobile}
                        data={rows}
                        rowKeyExtractor={row =>
                            `history-table-row-${row.rank}`
                        }
                        breakpoint="xs"
                        css={styles.table}
                        isFetching={isFetching}
                        hover={false}
                        withPadding={true}
                    />


                    <Pagination
                            itemsCount={total}
                            onChange={setCurrentPage}
                            itemsPerPageCount={limit}
                        />
                </Paper>
            </div>
        </Modal>
    );
};
