/** @jsxImportSource @emotion/react */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { InputHTMLAttributes } from 'react';
import { Token } from 'types';

import { Icon, IconName } from '../Icon';
import { TokenIcon } from '../TokenIcon';
import { useStyles } from './styles';
import { SerializedStyles } from '@emotion/react';
import { Grid } from '@mui/material';
import { PrimaryButton } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import SvgLoading, { SvgLoadingInlined } from '../Icon/icons/loading';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  description?: string | React.ReactElement;
  hasError?: boolean;
  leftIconSrc?: IconName | Token;
  rightAdornment?: React.ReactElement;
  isSmall?: boolean;
  variant?: 'primary' | 'secondary';
  isTransparent?: boolean;
  cssInput?: SerializedStyles;
  onPercentsPicked?;
  showPercentButtons?: boolean;
  disablePercentButtons?: boolean;
  isLoading?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  label,
  description,
  hasError = false,
  leftIconSrc,
  rightAdornment,
  onChange,
  max,
  min,
  type,
  disabled,
  isSmall = false,
  isTransparent = false,
  isLoading = false,
  variant = 'primary',
  cssInput,
  onPercentsPicked,
  showPercentButtons,
  disablePercentButtons,
  ...inputProps
}) => {
  const styles = useStyles();

  const handleChange: InputHTMLAttributes<HTMLInputElement>['onChange'] = e => {

    let safeValue = e.currentTarget.value;
    if (type === 'number' && safeValue.includes('-')) {
      safeValue = safeValue.replaceAll('-', '');
      e.currentTarget.value = safeValue;
    }
    if (type === 'number' && safeValue.startsWith('.')) {
      safeValue = `0${safeValue}`;
      e.currentTarget.value = safeValue;
    }
    let zeroRgx = /^0+([123456789])/;
    if (type === 'number' && zeroRgx.test(safeValue)) {
      safeValue = safeValue.replace(zeroRgx, '$1');
      e.currentTarget.value = safeValue;
    }

    let dMax = 13;
    let fMax = 18;
    if (safeValue.length > dMax) {
      let [d, f] = safeValue.split('.');
      if (d.length > dMax || f?.length > fMax) {
        safeValue = `${d.substring(0, dMax)}.${f?.substring(0, fMax) ?? ''}`.replace(/[.]$/, '');
        console.log(`SafeValue after max length`, safeValue, d, f);
        e.currentTarget.value = safeValue;
      }
    }
    let num = parseInt(safeValue, 10);
    // Prevent value from being updated if it does not follow the rules
    const followsMaxRule = !safeValue || max === undefined || type !== 'number' || num <= +max;
    const followsMinRule = !safeValue || min === undefined || type !== 'number' || num >= +min;
    if (onChange && followsMaxRule && followsMinRule) {
      onChange(e);
    }
  };

  const percentageButtons =  [
    { key: '25', label: '25%' },
    { key: '50', label: '50%' },
    { key: '75', label: '75%' },
    { key: '100', label: 'Max' },
  ]
  const onPercentagePicked = (i) => {
    const percents = percentageButtons[i];
    onPercentsPicked?.(Number(percents.key));
  }


  return (
    <Box className={className}>
      <div css={styles.flex}>
        <div css={styles.left}>
          {!!label && (
            <Typography
              variant="h5"
              component="label"
              css={styles.getLabel({ hasError, isTransparent })}
              htmlFor={inputProps.id}
            >
              {label}
            </Typography>
          )}
        </div>
        { showPercentButtons && <div css={[styles.right, disablePercentButtons ? styles.disabled : null]}>
          <ButtonGroup
                  buttonLabels={percentageButtons}
                  css={styles.buttonsContainer}
                  activeButtonIndex={-1}
                  onButtonClick={onPercentagePicked}
                  fullWidth={false}
                  tags = { true }
                />
        </div> }

      </div>


      <Box css={styles.getInputContainer({ hasError, disabled, variant, isSmall, isTransparent })}>
        {typeof leftIconSrc === 'string' && (
          <Icon name={leftIconSrc} css={styles.getLeftIcon({ isSmall })} />
        )}

        {!!leftIconSrc && typeof leftIconSrc !== 'string' && (
          <TokenIcon token={leftIconSrc} css={styles.getLeftIcon({ isSmall })} />
        )}

        {isLoading && <SvgLoading css={[styles.svgLoading ]} />}
        <input
          css={[styles.getInput({ hasRightAdornment: !!rightAdornment, isSmall }), cssInput ]}
          className={isLoading? 'is-loading' : ''}
          max={max}
          min={min}
          onChange={handleChange}
          type={type}
          disabled={disabled}
          {...inputProps}
        />

        {rightAdornment}
      </Box>

      {!!description && (
        <Typography variant="small2" css={styles.description}>
          {description}
        </Typography>
      )}
    </Box>
  );
};
