/** @jsxImportSource @emotion/react */
import { Button, Modal as MUIModal, ModalProps as MUIModalProps } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import config from 'config';
import React, { ReactElement } from 'react';

import { Icon } from '../Icon';
import { useModalStyles } from './styles';

export interface ModalProps extends Omit<MUIModalProps, 'title' | 'open'> {
  className?: string;
  isOpen: boolean;
  handleClose: () => void;
  handleBackAction?: () => void;
  title?: string | ReactElement | ReactElement[];
  titleIcon?: any
  noHorizontalPadding?: boolean;
  hideCloseButton?: boolean;
  header?;
}

export const Modal: React.FC<ModalProps> = ({
  className,
  children,
  handleClose,
  handleBackAction,
  isOpen,
  title,
  titleIcon,
  noHorizontalPadding,
  hideCloseButton,
  header,
  ...otherModalProps
}) => {
  const s = useModalStyles({ hasTitleComponent: Boolean(title), noHorizontalPadding });
  return (
    <MUIModal
      open={isOpen}
      onClose={handleClose}
      onBackdropClick={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: { backdropFilter: 'blur(5px)' },
      }}
      disablePortal={config.environment === 'storybook'}
      {...otherModalProps}
    >
      <Fade in={isOpen}>
        <div css={s.box} className={className}>
          <div css={s.titleWrapper} className='title_wrapper'>
            {!!handleBackAction && (
              <Button css={s.backAction} disableRipple onClick={handleBackAction}>
                <Icon css={s.backArrow} name="arrowRight" />
              </Button>
            )}
            { !!title && (<div css={s.titleComponent}>
              {titleIcon && (<img src={titleIcon} />)}
              {title}
            </div>)}
            { !!header && (<div css={s.titleComponent}>
              {header}
            </div>)}
            { !hideCloseButton && (
              <Button css={s.closeIcon} disableRipple onClick={handleClose} className={!title ? "without-title" : null}>
                <Icon name="close" size={`${s.closeIconSize}`} />
              </Button>
            )}
          </div>
          <div css={s.contentWrapper}>{children}</div>
        </div>
      </Fade>
    </MUIModal>
  );
};
