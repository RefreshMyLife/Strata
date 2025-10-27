/** @jsxImportSource @emotion/react */
import { LinkButton, PrimaryButton, Spinner } from 'components';
import React from 'react';
import { PreDeposit } from 'types';

import { useGetPreDeposits } from 'clients/api';
import { useAuth } from 'context/AuthContext';

import { useStyles } from './styles';
import { ChainId, changeChainId } from 'src/packages/contracts';
import config from 'src/config';
import { Paper, Typography } from '@mui/material';
import { PointsBannerUi } from './components/PointsBanner';
import { InfoBanner } from './components/InfoBanner';
import { PointsStats } from './components/PointsStats';
import { PointsTable } from './components/PointsTable';
import { RouteComponentProps } from 'react-router';

export interface PreDepositUiProps {
  preDeposits: PreDeposit[];
  isInitialLoading: boolean;
}


export const PreDepositUi: React.FC<PreDepositUiProps> = ({ preDeposits, isInitialLoading }) => {
  const styles = useStyles();
  if (isInitialLoading || preDeposits.length === 0) {
    return <Spinner />;
  }


  return (<>

    <div css={styles.container}>
      {preDeposits.map(preDeposit => (
          <PreDepositItem {...preDeposit} key={generatePreDepositKey(preDeposit)} />
      ))}
      <PreDepositStatus totalStaked={preDeposits[0].totalStaked} stakedToken={preDeposits[0].stakedToken} />
    </div>
  </>);
};

const PointsPage: React.FC<RouteComponentProps> = ({ history, location }) => {
  const { accountAddress } = useAuth();
  // const { data: preDeposits, isLoading: isGetPreDepositsLoading } = useGetPreDeposits({
  //   accountAddress,
  // });
  return <>
      {/* <PointsBannerUi />
      <InfoBanner />
      <Typography variant='h3'>
        Points details
      </Typography>
      <PointsStats /> */}
      <PointsTable history={history} location={location} />
    </>;
};

export default PointsPage;
