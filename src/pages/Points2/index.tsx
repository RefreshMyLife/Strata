/** @jsxImportSource @emotion/react */
import React from 'react';

import { useAccountAddress } from 'src/libs/wallet';
import PointsWalletDisconnected from './PointsWalletDisconnected';
import PointsWalletConnected from './PointsWalletConnected';


export const Points2: React.FC = () => {
  const { accountAddress } = useAccountAddress();
  const isWalletConnected = !!accountAddress;

  if (isWalletConnected) {
    return <PointsWalletConnected />;
  }

  return <PointsWalletDisconnected />;
};
