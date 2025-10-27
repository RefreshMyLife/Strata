/** @jsxImportSource @emotion/react */
import React from 'react';

import { useStyles } from './styles';

export interface InfoAlertProps {
  message: string;
  className?: string;
}

const InfoIcon = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M10 2.5C14.4183 2.5 18 6.08172 18 10.5C18 14.9183 14.4183 18.5 10 18.5C5.58172 18.5 2 14.9183 2 10.5C2 6.08172 5.58172 2.5 10 2.5ZM9 9.5C8.58579 9.5 8.25 9.83579 8.25 10.25C8.25 10.6642 8.58579 11 9 11H9.25293C9.41287 11 9.53176 11.1486 9.49707 11.3047L9.03809 13.3701C8.79522 14.463 9.62751 15.5 10.7471 15.5H11C11.4142 15.5 11.75 15.1642 11.75 14.75C11.75 14.3358 11.4142 14 11 14H10.7471C10.5871 14 10.4682 13.8514 10.5029 13.6953L10.9619 11.6299C11.2048 10.537 10.3725 9.5 9.25293 9.5H9ZM10 5.5C9.44771 5.5 9 5.94772 9 6.5C9 7.05228 9.44771 7.5 10 7.5C10.5523 7.5 11 7.05228 11 6.5C11 5.94772 10.5523 5.5 10 5.5Z" 
      fill="#20B0FD"
    />
  </svg>
);

export const InfoAlert = ({ message, className }: InfoAlertProps) => {
  const styles = useStyles();

  return (
    <div css={styles.container} className={className}>
      <InfoIcon />
      <span css={styles.text}>{message}</span>
    </div>
  );
};