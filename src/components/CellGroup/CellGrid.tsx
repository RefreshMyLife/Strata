/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import React from 'react';

import { InfoIcon } from '../InfoIcon';
import { useStyles } from './styles';

export interface Cell {
  label: string;
  value: string | number;
  tooltip?: string;
  color?: string;
  icon?: string;
}

export interface CellGroupProps {
  cells: Cell[];
  smallValues?: boolean;
  className?: string;
}

export const CellGroup: React.FC<CellGroupProps> = ({
  cells,
  smallValues = false,
  ...containerProps
}) => {
  const styles = useStyles();

  return (
    <div css={styles.gridContainer} {...containerProps} >
      {cells.map(({ label, value, tooltip, color, icon }) => (
        <Paper css={styles.gridCell} key={`cell-group-item-${label}`}>
          { icon && <img src={icon} css={{ marginBottom: '0.8em' }} alt={label} /> }
          <div css={styles.labelContainer}>
            <Typography variant={smallValues ? 'small2' : 'body2'} css={styles.label}>
              {label}
            </Typography>

            {!!tooltip && <InfoIcon tooltip={tooltip} css={styles.labelInfoIcon} />}
          </div>

          <Typography variant={smallValues ? 'h4' : 'h2'} css={styles.getValue({ color })}>
            {value}
          </Typography>
        </Paper>
      ))}
    </div>
  );
};

export default CellGroup;
