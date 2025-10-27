import { PreDeposit } from 'types';

import { TOKENS } from 'src/constants/tokens';
import useGetPreDepositPoolData, { TPreDepositData } from './useGetPreDepositData/useGetPreDepositPoolData';




export interface UseGetPreDepositsOutput {
  isLoading: boolean;
  data: TPreDepositData;
}

const useGetPreDeposits = ({ accountAddress }: { accountAddress?: string }): UseGetPreDepositsOutput => {
  const { data: preDepositsData, isLoading: isGetPreDepositDataLoading } = useGetPreDepositPoolData({
    accountAddress,
    stackedToken: TOKENS.usde,
  });


  const data: TPreDepositData = preDepositsData;

  const isLoading = isGetPreDepositDataLoading;

  return {
    data,
    isLoading,
  };
};

export default useGetPreDeposits;
