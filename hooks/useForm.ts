import { useState } from "react";
import { Text } from "react-native";

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
;
  const handleChange = (name: keyof T, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  };

  const handleSubmit = (onSubmit: (values: T) => void) => {
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      console.log(values.username)
      console.log(values.password)
      console.log(values.email)
      
      if (Object.keys(validationErrors).length > 0) {
        return
      }
    }

    onSubmit(values)
  }

  const getTextInputProps = (name: keyof T) => ({
    value: values[name],
    onChangeText: (text: string) => handleChange(name, text),
    onBlur: () => handleBlur(name),
  })

  return {
    values,
    errors,
    touched,
    handleSubmit,
    getTextInputProps,
  }
}