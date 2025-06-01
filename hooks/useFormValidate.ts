import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
  const [errors, setErrors] = useState<Partial<T>>();

  const validateField = (name: string, value: string) => {
    setErrors({
      ...errors,
      [name]: undefined,
    });
    const parsedValue = schema.pick({ [name]: true }).safeParse({
      [name]: value,
    });

    if (!parsedValue.success) {
      setErrors({
        ...errors,
        ...parsedValue.error.flatten().fieldErrors,
      });
    }
  };

  return { errors, validateField };
}