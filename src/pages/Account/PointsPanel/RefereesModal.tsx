/** @jsxImportSource @emotion/react */
import { Box, Paper, Typography } from '@mui/material';
import { Modal, Pagination, ScanLink, Table, TableColumn } from 'components';
import React, { useMemo, useState } from 'react';

import { useAuth } from 'src/context/AuthContext';

import { useStyles } from './PointsTableCss';
import { generateBlockchainScanUrl } from 'src/utilities';
import { NumberUtil } from 'src/utilities/NumberUtilt';
import { useLayout } from 'src/theme/useLayout';
import { TOKENS } from 'src/constants/tokens';
import { ReferralService } from 'src/services/ReferralService';
import { SvgLoadingInlined } from 'src/components/Icon/icons/loading';
import ico_users from 'src/assets/img/account.png';
import { useGetPointsStats } from 'src/clients/api/queries/getPoints/getPointsStats';



export const RefereesModal: React.FC<any> = ({
    isOpen = false,
    handleClose,
}) => {
    const t = useLayout();
    const styles = useStyles();
    const { accountAddress, chainId } = useAuth();
    const [ currentPage, setCurrentPage ] = useState(0);

    const { data: table, isFetching } = ReferralService.useGetReferees(accountAddress);
    const { data: stats } = useGetPointsStats({ accountAddress });

    const limit = 20;
    const rows = table?.collection ?? [];
    const total = rows.length;
    const offset = currentPage * limit;
    const strats = TOKENS.strats;
    const totalRefereesPoints = stats?.account?.points?.referral ?? '';

    rows.forEach((row, i) => {
        row.rank = offset + i + 1;
    });

    const columns: TableColumn<(typeof rows)[0]>[] = useMemo(
        () => [
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
                        <ScanLink hash={row.address} text={row.address} />
                    </Typography>
                },
            },
            {
                key: 'points',
                label: 'Points',
                selectOptionLabel: 'Points',
                renderCell: row => {
                    const formatted = NumberUtil.format(row.points, { fraction: 0 });
                    return <div css={t.inlineHeight}>
                        <img src={strats.asset} alt={strats.symbol} />
                        <span>&nbsp; {formatted}</span>
                    </div>;
                },
            },
        ],
        [],
    );



    const Header = (props) => {

        return <div css={[t.row, t.gapBetween, t.fontHeading, styles.header]}>
            <div css={styles.blockTitle}>Your referees</div>
            <Box css={t.row}>
                <div css={[styles.headerBadge, t.inlineHeight, t.pill]}>
                    <img src={ico_users} alt={strats.symbol} />
                    <span>&nbsp;
                        {isFetching ? <SvgLoadingInlined/> : (<span className='number'>{NumberUtil.format(table.collection.length)}</span>)}
                        <span className='label'>Users</span>
                    </span>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div css={[styles.headerBadge, t.inlineHeight, t.pill]}>
                    <img src={strats.asset} alt={strats.symbol} />
                    <span>&nbsp;
                        {isFetching ? <SvgLoadingInlined/> : (<span className='number'>{NumberUtil.format(totalRefereesPoints, { fraction: 0})}</span>)}
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
                            `history-table-row-${row.address}`
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
