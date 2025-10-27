/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { ButtonGroup, ConnectWallet, Spinner } from 'components';
import React, { useEffect, useMemo } from 'react';
import { Vault } from 'types';
import { ChainId } from 'src/packages/contracts';

import { useGetVaults } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { useAuth } from 'context/AuthContext';
import useGetPrice from 'src/clients/api/queries/getPrice/useGetPrice';

import AccountPlaceholder from './AccountPlaceholder';
import VaultsBreakdown from './VaultsBreakdown';
import { useStyles } from './styles';
import { TokenService } from 'src/services/TokenService';
import { OracleService } from 'src/services/OracleService';
import Blockies from 'react-blockies';
import { useLayout } from 'src/theme/useLayout';
import { formatTokensToReadableValue } from 'src/utilities';
import { AssetsPanel } from './AssetsPanel/AssetsPanel';
import { PointsPanel } from './PointsPanel/PointsPanel';
import { useLocation } from 'react-router';
import ConnectButton from 'src/components/Layout/ConnectButton';
import { useAccountAddress } from 'src/libs/wallet/hooks/useAccountAddress';
import config from 'src/config';
import { PendleService } from 'src/services/PendleService';
import { TermmaxService } from 'src/services/TermmaxService';

export interface AccountUiProps {
  vaults: Vault[];
  chainId: number;
  isFetching?: boolean;
}

const USD_PRICE_CENTS = new BigNumber(100);

export const AccountUi: React.FC<AccountUiProps> = ({ isFetching, vaults, chainId }) => {
  const { accountAddress } = useAuth();
  const styles = useStyles();
  const l = useLayout();
  const [ selectedTab, setSelectedTab ] = React.useState(0);

  // Filter out vaults user has not staked in
  const filteredVaults = vaults;
  const { data: pusdePrice, isLoading } = OracleService.useGetPrice(TOKENS.pusde, 1);
  const { data: pendle, isLoading: isPendleLoading } = PendleService.useGetPosition(accountAddress);
  const { data: termmax } = TermmaxService.useGetPosition(accountAddress);


  if (isFetching) {
    return <Spinner />;
  }

  const pUSDeVault = filteredVaults[0];
  const balance$ = pUSDeVault.balance * (pusdePrice ?? 1) + (pendle?.$ ?? 0) + (termmax?.gt$ ?? 0);

  return (
    <>
      <div css={l.row}>

          <Blockies
            seed={accountAddress}
            size={10}
            scale={8}
            css={styles.identicon}
          />
        <div css={l.rowCell}>
          <h1 css={l.hint} className='lg'>Total Balance</h1>
          <h2 css={styles.labelBalance}>${ formatTokensToReadableValue({ value: balance$ }) }</h2>
        </div>
      </div>
      <br />
      <ButtonGroup
                buttonLabels={[ { key: 'assets', label: 'Assets' }, { key: 'points', label: 'Points' } ]}
                css={styles.tabs}
                activeButtonIndex={ selectedTab }
                onButtonClick={x => setSelectedTab(x) }
                fullWidth={false}
              />
      <div css={l.line}></div>

      {selectedTab === 0 && (
        <AssetsPanel pUSDeAccountInfo={pUSDeVault}/>
      )}
      {selectedTab === 1 && (
        <PointsPanel />
      )}
    </>
  );
};

const Account: React.FC = () => {

  const { accountAddress } = useAccountAddress();
  const style = useStyles();
  const chainId = config.chainId;

  const { data: getVaultsData, isLoading } = useGetVaults({
    accountAddress,
    chainId,
  });


  return (
    <div css={style.page}>
      { !accountAddress && <AccountConnectPlaceholder />}

      { accountAddress && <AccountUi
        isFetching={isLoading}
        vaults={getVaultsData || []}
        chainId={chainId}
      /> }
    </div>
  );
};


const AccountConnectPlaceholder: React.FC = () => {
  const styles = useStyles();

  return <div css={styles.placeholder}>
    <div>
      <Blockies
          seed='0x00000000'
          size={10}
          scale={8}
          color="#777"
          bgColor="#222"
          spotColor="#999"

          css={[styles.identicon, styles.blockie]}
        />
    </div>
    <div style={{textAlign: 'center'}}>
      <h2>$0.00</h2>
      <p>Total Balance</p>
    </div>
    <div>
      <ConnectButton variant='primary'/>
    </div>
  </div>
}

export default Account;
