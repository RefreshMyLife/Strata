/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React from 'react';

import { Icon } from '../Icon';
import { useStyles } from './styles';
import { ChipProps } from './types';

export * from './types';

export const Chip = ({ className, text, iconName, type = 'default' }: ChipProps) => {
  const styles = useStyles();

  return (
    <div className={className} css={styles.root({ chipType: type })}>
      {!!iconName && <Icon name={iconName} css={styles.icon} />}

      <Typography variant="small2" color="textPrimary">
        {text}
      </Typography>
    </div>
  );
};

export const ActiveChip: React.FC<ChipProps> = ({ ...props }) => <Chip {...props} type="active" />;

export const InactiveChip: React.FC<ChipProps> = ({ ...props }) => (
  <Chip {...props} type="inactive" />
);

export const BlueChip: React.FC<ChipProps> = ({ ...props }) => <Chip {...props} type="blue" />;

export const ErrorChip: React.FC<ChipProps> = ({ ...props }) => <Chip {...props} type="error" />;
