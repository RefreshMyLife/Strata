/** @jsxImportSource @emotion/react */
import { GlobalStyles } from '@mui/material';
import React from 'react';
import { ToastOptions, toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Notice } from '../Notice';
import { NoticeVariant } from '../Notice/types';
import { customToastGlobalStyles, useStyles } from './styles';
import { ContractReceipt } from 'ethers';
import img_checkmark from 'src/assets/img/icons/checkbox.svg';
import { ScanLink } from '../ScanLink';
import { truncateAddress } from 'src/utilities';

interface ToastArgs {
  message: string;
}
interface ToastProps extends ToastArgs {
  type: NoticeVariant;
  isLoading?: boolean
  title?: string
}
interface CloseButtonProps {
  closeToast: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ closeToast }) => {
  const styles = useStyles();

  return (
    <Button css={styles.btnClose} onClick={closeToast} variant="text">
      <Icon name="close" size={`${styles.iconSize}`} />
    </Button>
  );
};

const ToastComponent: React.FC<ToastProps> = ({ title, message, type = 'info', isLoading }) => {
  const styles = useStyles();

  return (
    <>
      <GlobalStyles styles={customToastGlobalStyles} />
      <Notice
          css={styles.noticeContainer}
          title={title}
          description={message}
          variant={type}
          kind='toast'
          className='toast'
          isLoading={isLoading}
        />
    </>
  );
};

const defaultOptions: ToastOptions = {
  theme: 'dark',
  position: 'bottom-right',
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  closeButton: CloseButton as ToastOptions['closeButton'],
};

export const toast = ({ message, type = 'info' }: ToastProps, options?: ToastOptions) =>
  toastify(<ToastComponent message={message} type={type} />, {
    ...defaultOptions,
    ...options,
  });

toast.info = (content: ToastArgs, options?: ToastOptions) =>
  toast({ ...content, type: 'info' }, options);

toast.error = (content: ToastArgs, options?: ToastOptions) =>
  toast({ ...content, type: 'error' }, options);

toast.success = (content: ToastArgs, options?: ToastOptions) =>
  toast({ ...content, type: 'success' }, options);

toast.warning = (content: ToastArgs, options?: ToastOptions) =>
  toast({ ...content, type: 'warning' }, options);

toast.update = toastify.update;

toast.transaction = (promise: Promise<ContractReceipt | void>, content?: { title?, titleSuccess?, message? }, options?: ToastOptions) => {

  toastify.dismiss();
  return toastify.promise(promise, {
      pending: {
        render(){
          return <>
            <ToastComponent title={content?.title ?? 'Processing Transaction'} message={content?.message ?? 'Please wait' } type='warning' isLoading={true}/>
          </>;
        },
        icon: false,
      },
      success: {
        render({data}){
          const hash = data.transactionHash;
          const message = <ScanLink
            urlType='tx'
            hash={hash} text={ truncateAddress(hash) }
            className='white'
          />
          return <ToastComponent title={content?.titleSuccess ?? 'Success'} message={message} type='success'/>
        }
      },
      error: {
        render(resp){
          return <ToastComponent message={resp.data.message} type='error'/>
        }
      }
    }, {
      ...defaultOptions,
      ...({
        closeButton: false,
      }),
      ...(options ?? {}),
    });
}
