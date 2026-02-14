import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;
type Touched<T> = Partial<Record<keyof T, boolean>>;

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Errors<T>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Touched<T>>({});
  const [errors, setErrors] = useState<Errors<T>>({});

  const handleChange = (name: keyof T, value: string) => {
    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);

    if (validate) {
      const validationErrors = validate(nextValues);
      setErrors(validationErrors);
    }
  };


  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };


  const handleSubmit = (onSubmit: (values: T) => void) => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    onSubmit(values);
  };

  const getTextInputProps = (name: keyof T) => ({
    value: values[name],
    onChangeText: (text: string) => handleChange(name, text),
    onBlur: () => handleBlur(name),
  });

  return {
    values,
    errors,
    touched,
    handleSubmit,
    getTextInputProps,
  };
}
