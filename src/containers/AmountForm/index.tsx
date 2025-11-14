/** @jsxImportSource @emotion/react */
import { Form, Formik, FormikConfig, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { Token } from 'src/types';

import useIsMounted from 'hooks/useIsMounted';

import getValidationSchema, { FormValues } from './validationSchema';

export * from './validationSchema';

export interface AmountFormProps
    extends Omit<FormikConfig<FormValues>, 'onSubmit' | 'initialValues'> {
    onSubmit: (value: string) => Promise<unknown>;
    onChange;
    children: (formProps: FormikProps<FormValues>) => React.ReactNode;
    initialAmount?: FormikConfig<FormValues>['initialValues']['amount'];

    initialAmountOut?: FormikConfig<FormValues>['initialValues']['amount'];
    initialAmountIn?: FormikConfig<FormValues>['initialValues']['amount'];
    initialToken?: Token;
    maxAmount?: FormikConfig<FormValues>['initialValues']['amount'];
    minAmount?: FormikConfig<FormValues>['initialValues']['amount'];
    className?: string;
}

export const AmountForm: React.FC<AmountFormProps> = ({
    children,
    onSubmit,
    onChange,
    className,
    initialAmount = '',
    initialAmountIn = '',
    initialAmountOut = '',
    initialToken,
    maxAmount,
    minAmount,
}) => {
    const isMounted = useIsMounted();

    const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        if (values.amount) {
            await onSubmit(values.amount.trim());
        }

        if (values.amount && isMounted()) {
            resetForm();
        }
    };

    return (
        <Formik
            initialValues={{
                amount: initialAmount,
                amountIn: initialAmountIn,
                amountOut: initialAmountOut,
            }}
            onSubmit={handleSubmit}
            handleChange={onChange}
            validationSchema={getValidationSchema(maxAmount, minAmount)}
            isInitialValid={false}
            validateOnMount
            validateOnChange
        >
            {formikProps => <Form className={className}>{children(formikProps)}</Form>}
        </Formik>
    );
};
