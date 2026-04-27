import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import DatePicker from "./DatePicker";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: object;
  error?: string;
  placeholderText?: string;
}

const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
  error,
  placeholderText,
}: FormDatePickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <DatePicker
          label={label}
          selected={field.value ? new Date(field.value) : null}
          onChange={(date) => {
            if (date) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              field.onChange(`${year}-${month}-${day}`);
            } else {
              field.onChange("");
            }
          }}
          error={error}
          placeholderText={placeholderText}
        />
      )}
    />
  );
};

export default FormDatePicker;
