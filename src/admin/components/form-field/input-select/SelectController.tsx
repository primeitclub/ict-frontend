import { Controller, useFormContext, type RegisterOptions } from "react-hook-form";
import Select, { type SelectOption } from "./Select";

interface FormSelectProps {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  rules?: RegisterOptions;
  isLoading?: boolean;
}

const FormSelect = ({ name, label, options, placeholder, rules, isLoading }: FormSelectProps) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Select
          label={label}
          options={options}
          placeholder={placeholder ?? "Select an option"}
          value={options.find((opt) => opt.value === value) ?? null}
          onChange={(selected) => onChange(selected?.value ?? "")}
          error={errors[name]?.message as string | undefined}
          isLoading={isLoading}
        />
      )}
    />
  );
};

export default FormSelect;
