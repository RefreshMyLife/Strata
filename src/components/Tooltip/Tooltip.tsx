import { Global } from '@emotion/react';
import MuiTooltip, { TooltipProps as MUITooltipProps } from '@mui/material/Tooltip';
import React from 'react';

import { useStyles } from './styles';

export interface TooltipProps extends MUITooltipProps {
  title: string | React.ReactElement;
}

export const Tooltip = ({ children, placement = 'top', ...rest }: TooltipProps) => {
  const styles = useStyles();
  return (
    <>
      <Global styles={styles} />
      <MuiTooltip arrow placement={placement} enterTouchDelay={0} {...rest}>
        <span>{children}</span>
      </MuiTooltip>
    </>
  );
};

export const TooltipIcon = (props: Omit<TooltipProps, 'children'>) => {
  return (
    <Tooltip {...props}>
      <svg style={{width: '.9em', height: '.9em', marginLeft: '.2em'}} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM8 4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4ZM5.75 7C5.33579 7 5 7.33579 5 7.75C5 8.16421 5.33579 8.5 5.75 8.5H6.5V10.25C6.5 10.6642 6.83579 11 7.25 11C7.66421 11 8 10.6642 8 10.25V7.75C8 7.33579 7.66421 7 7.25 7H5.75Z" fill="#90A0AC" fillOpacity="0.5"/>
      </svg>
    </Tooltip>
  );
};
