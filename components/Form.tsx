import React, { useState } from "react";
import { Keyboard } from "react-native";
import * as Yup from "yup";

type FormReturnValue = {
  clearValues: () => void;
  handleSubmit: () => void;
  handleFoucs: (key: string) => (value: any) => void;
  handleChange: (key: string) => (value: any) => void;
  values: { [key: string]: any };
  errors: { [key: string]: any };
  setErrors: (errors: { [key: string]: boolean }) => void;
  setFieldValue: (key: string, value: any) => void;
};

interface FormProps {
  children: ({
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    errors,
    handleFoucs,
    clearValues,
  }: FormReturnValue) => React.ReactNode;
  validationRules?: { [key: string]: (value: any) => boolean };
  validationSchema?: Yup.ObjectSchema<any>;
  initialValues?: { [key: string]: any };
  clearOnSubmit?: boolean;
  onSubmit?: (
    values: { [key: string]: any },
    actions: Partial<FormReturnValue>
  ) => void;
}

export const useForm = ({
  initialValues = {},
  onSubmit,
  clearOnSubmit,
  validationRules,
  validationSchema,
}: Omit<FormProps, "children">): FormReturnValue => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (key: string) => (value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const validationErrors: { [key: string]: any } = {};
    if (validationSchema) {
      try {
        await validationSchema.validate(values, { abortEarly: false });
      } catch (err: any) {
        if (err.inner) {
          err.inner.forEach((error: Yup.ValidationError) => {
            validationErrors[error.path as string] = error.message;
          });
        }
      }
    } else if (validationRules) {
      Object.keys(values).forEach((v) => {
        if (validationRules[v] && validationRules[v](values[v])) {
          validationErrors[v] = true;
        }
      });
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (onSubmit) {
      onSubmit(values, { setErrors });
      if (clearOnSubmit) {
        setTimeout(() => {
          setValues(initialValues);
        }, 300);
      }
    }
  };

  const handleFoucs = (key: string) => () => {
    if (errors[key]) {
      setErrors({ ...errors, [key]: false });
    }
  };

  const setFieldValue = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const clearValues = () => {
    setErrors({});
    setValues(initialValues);
  };

  return {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    errors,
    setErrors,
    handleFoucs,
    clearValues,
  };
};

const Form = ({ children, ...props }: FormProps) => {
  const form = useForm(props);
  return children(form);
};

export default Form;
