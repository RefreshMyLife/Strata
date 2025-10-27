/** @jsxImportSource @emotion/react */
import MuiCheckbox from '@mui/material/Checkbox';
import React from 'react';

import { Icon } from '../Icon';
import { useStyles } from './styles';

export interface CheckboxProps {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disableRipple?: boolean;
}

export const Checkbox = ({ value, onChange, className, disableRipple }: CheckboxProps) => {
  const styles = useStyles();
  return (
    <MuiCheckbox
      className={className}
      css={styles.root}
      checked={value}
      onChange={onChange}
      icon={<Icon name="checkboxBorder" />}
      checkedIcon={<Icon name="checked" />}
      disableRipple={disableRipple ?? true}
    />
  );
};

export default Checkbox;
