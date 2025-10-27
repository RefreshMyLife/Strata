import * as yup from 'yup';

export type FormValues = yup.InferType<ReturnType<typeof getValidationSchema>>;

export enum ErrorCode {
  NOT_POSITIVE = 'NOT_POSITIVE', // value must be positive
  HIGHER_THAN_MAX = 'HIGHER_THAN_MAX', // value must be lower or equal to max
  LOWER_THAN_MIN = 'LOWER_THAN_MIN', // value must be higher or equal to min
}

const getValidationSchema = (maxAmount?: string, minAmount?: string) =>
  yup.object({
    amount: yup
      .string()
      .positive(ErrorCode.NOT_POSITIVE)
      .lowerThanOrEqualTo(maxAmount, ErrorCode.HIGHER_THAN_MAX)
      .greaterThanOrEqualTo(minAmount, ErrorCode.LOWER_THAN_MIN)
      .required(),
  });

export default getValidationSchema;
