import { ChangeEvent, useState } from 'react';

export type Validation = {
  required?: {
    value: boolean;
    message?: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
};

type Errors = Partial<Record<string, string>>;

type Validations = Partial<Record<string, Validation>>;

type InitialValues = Partial<Record<string, string | Record<string, string>>>;

export type Props = {
  validations: Validations;
  groupValidations: Partial<Record<string, Validations>>;

  initialValues?: InitialValues;
  onSubmit?: () => void;
};

export type FieldChangeHandler = <S extends unknown>(
  key: string,
  id?: string,
  sanitizeFn?: (value: string) => S,
) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;

export const getValue = (
  prop: string,
  values: InitialValues,
  key?: string,
): string => {
  const value = key && values[key];

  return (
    value && typeof value === 'object' ? value[prop] : values[prop]
  ) as string;
};

export const useForm = ({
  validations,
  groupValidations,
  onSubmit,
  initialValues = {},
}: Props) => {
  const [values, setValues] = useState<InitialValues>(initialValues);
  const [errors, setErrors] = useState<Errors>();
  const [groupErrors, setGroupErrors] = useState<Record<string, Errors>>();

  const handleChange =
    <S extends unknown>(
      key: string,
      id?: string,
      sanitizeFn?: (value: string) => S,
    ) =>
    (
      e: ChangeEvent<HTMLInputElement & HTMLSelectElement>,
      selectValue?: string,
    ) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

      const prevValue = id ? values[id] : {};

      const newValue = id
        ? {
            ...values,
            [id]: {
              ...(typeof prevValue === 'object' ? prevValue : {}),
              [key]: selectValue || value,
            },
          }
        : {
            ...values,
            [key]: value,
          };

      setValues(newValue as any);
    };

  const createErrors = (rules: Validations, id?: string) => {
    const newErrors: Errors = {};

    for (const key of Object.keys(rules)) {
      const value = getValue(key, values, id);
      const validation = rules[key];

      if (validation?.required?.value && !value) {
        newErrors[key] = validation?.required?.message ?? 'Required';
      }

      const pattern = validation?.pattern;

      if (pattern?.value && !RegExp(pattern.value).test(value as string)) {
        newErrors[key] = pattern.message;
      }

      const custom = validation?.custom;

      if (custom?.isValid && !custom.isValid(value as string)) {
        newErrors[key] = custom.message;
      }
    }

    return newErrors;
  };

  const validate = (
    rules: Validations,
    groupRules: Partial<Record<string, Validations>>,
  ) => {
    if (rules || groupRules) {
      let valid = true;

      const newErrors = createErrors(rules);
      let newGroupErrors = {};

      let errorsCount = 0;

      for (const key of Object.keys(groupRules)) {
        const groupRule = groupRules[key];

        if (groupRule) {
          const createdErrors = { ...createErrors(groupRule, key) };

          errorsCount += Object.keys(createdErrors).length;

          newGroupErrors = {
            ...newGroupErrors,
            [key]: createdErrors,
          };
        }
      }

      errorsCount += Object.keys(newErrors).length;
      valid = !errorsCount;

      if (!valid) {
        setErrors(newErrors);
        setGroupErrors(newGroupErrors);

        return { valid };
      }
    }

    setErrors({});
    setGroupErrors({});

    return { valid: true };
  };

  const handleSubmit = () => {
    const { valid } = validate(validations, groupValidations);

    if (!valid) {
      return;
    }

    if (onSubmit) {
      onSubmit();
    }
  };

  return {
    values,
    errors,
    groupErrors,
    handleChange,
    handleSubmit,
  };
};
