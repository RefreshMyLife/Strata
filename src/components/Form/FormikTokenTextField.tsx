import { useField } from 'formik';
import React, { useState } from 'react';

import { TokenTextField, TokenTextFieldProps } from '../TokenTextField';

interface FormikTokenTextFieldProps
  extends Omit<TokenTextFieldProps, 'name' | 'onChange'> {
  name: string;
  isLoading?: boolean;
  displayableErrorCodes?: string[];
  onAmountSelected?;
  showPercentButtons?;
  tokenSelectModalProps?: {
    showTokenSelectModal: boolean;
    setShowTokenSelectModal: (show: boolean) => void;
    tokenSelectData: any;
    setTokenSelectData: (data: any) => void;
  };
}

export const FormikTokenTextField = ({
  name,
  label,
  displayableErrorCodes = [],
  token,
  onTokenSelected,
  onAmountSelected,
  value,
  showPercentButtons,
  isLoading,
  tokenSelectModalProps,
  ...rest
}: FormikTokenTextFieldProps) => {

  const useStateField = (initValue) => {
     let [value, setValue ] = [
      initValue, () => {}
     ];
     return [
        { value, onBlur: null },
        { error: null },
        { setValue }
     ];
  }
  let [{ value: inputValue, onBlur }, { error }, { setValue }] = false && rest.disabled != true
    ? useField(name)
    : useStateField(value);

  let onChange = (val: string) => {

    setValue?.(val);
    onAmountSelected?.(val);
  };

  return (
    <TokenTextField
      name={name}
      value={inputValue}
      token={token}
      label={label}
      showPercentButtons={showPercentButtons}
      onChange={onChange}
      onTokenSelected={onTokenSelected}
      onBlur={onBlur}
      hasError={!!(error && displayableErrorCodes.includes(error))}
      tokenSelectModalProps={tokenSelectModalProps}
      isLoading={isLoading}
      {...rest}
    />
  );
};
