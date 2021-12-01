import { ChangeEvent, useState } from "react";

export function useFormFields<T extends Record<string, string>>(
  initialState: T
) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: ChangeEvent<HTMLInputElement>) {
      setValues({
        ...fields,
        [event.currentTarget.name]: event.currentTarget.value,
      });
    },
  ] as const;
}
