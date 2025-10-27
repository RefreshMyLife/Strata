import { VError, formatVErrorToReadableString } from 'errors';
import { ContractReceipt } from 'ethers';

import { toast } from 'components/Toast';
import useSuccessfulTransactionModal, {
  OpenSuccessfulTransactionModalInput,
} from 'hooks/useSuccessfulTransactionModal';

export interface HandleMutationInput {
  label?: string
  labelSuccess?: string
  onComplete?: (receipt: ContractReceipt) => void;
  mutate: () => Promise<ContractReceipt | void>;
  successTransactionModalProps?: (
    contractReceipt: ContractReceipt,
  ) => OpenSuccessfulTransactionModalInput;
}

const useHandleTransactionMutation = () => {
  const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();

  const mutateWrapped = async (mutate: () => Promise<ContractReceipt | void>) => {
    try {
      const txPromise = mutate();
      return await txPromise;
    } catch (error) {
      if (error instanceof VError) {
        throw new Error(formatVErrorToReadableString(error));
      }
      if (error.error?.message != null) {
        throw new Error(error.error.message);
      }

      throw error;
    }
  }

  const handleMutation = async ({ label, labelSuccess, onComplete, mutate, successTransactionModalProps }: HandleMutationInput) => {
      // Send request
      const txPromise = mutateWrapped(mutate);
      toast.transaction(txPromise, { title: label, titleSuccess: labelSuccess });

      const contractReceipt = await txPromise;

      // Display successful transaction modal
      if (contractReceipt) {
        if (typeof successTransactionModalProps === 'function') {
          const successfulTransactionModalProps = successTransactionModalProps(contractReceipt);
          openSuccessfulTransactionModal(successfulTransactionModalProps);
        }
        if (typeof onComplete === 'function') {
          onComplete(contractReceipt);
        }
      }
  };

  return handleMutation;
};

export default useHandleTransactionMutation;
