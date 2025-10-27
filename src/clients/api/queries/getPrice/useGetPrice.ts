import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { Token } from 'types';
import { callOrThrow } from 'utilities';

import getPrice, {
  GetPriceInput,
  GetPriceOutput,
} from 'clients/api/queries/getPrice';
import FunctionKey from 'constants/functionKey';
import useGetTokenContract from 'hooks/useGetTokenContract';
import useGetUniqueContract from 'src/hooks/useGetUniqueContract';

export type UseGetPriceQueryKey = [
  FunctionKey.GET_TOKEN_PRICE,
  {
    tokenAddress: string;
  },
];

type Options = QueryObserverOptions<
  GetPriceOutput,
  Error,
  GetPriceOutput,
  GetPriceOutput,
  UseGetPriceQueryKey
>;

type TrimmedGetPriceInput = { token: Token };

const useGetPrice = (
  { token }: TrimmedGetPriceInput,
  options?: Options,
) => {
  const oracle = useGetUniqueContract({
    name: 'resilientOracle',
    passSigner: false,
  });
  const queryKey: UseGetPriceQueryKey = [
    FunctionKey.GET_TOKEN_PRICE,
    {
      tokenAddress: token.address,
    },
  ];

  return useQuery(
    queryKey,
    () =>
      callOrThrow({ token, oracle }, params =>
        getPrice({
          ...params,
        }),
      ),
    options,
  );
};

export default useGetPrice;
