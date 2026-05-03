import ReactSelect, { type Props as ReactSelectProps } from "react-select";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends ReactSelectProps<SelectOption, false> {
  label?: string;
  error?: string;
}

const selectStyles: ReactSelectProps<SelectOption, false>["styles"] = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#02111F",
    borderColor: state.isFocused ? "var(--color-admin-secondary)" : "#1f2937",
    borderRadius: "0.5rem",
    padding: "1px 2px",
    boxShadow: "none",
    "&:hover": { borderColor: state.isFocused ? "var(--color-admin-secondary)" : "#1f2937" },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#02111F",
    border: "1px solid #1f2937",
    borderRadius: "0.5rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--color-admin-secondary)"
      : state.isFocused
        ? "#0d2236"
        : "transparent",
    color: "#fff",
    fontSize: "0.875rem",
    cursor: "pointer",
  }),
  singleValue: (base) => ({ ...base, color: "#fff", fontSize: "0.875rem" }),
  placeholder: (base) => ({ ...base, color: "#6b7280", fontSize: "0.875rem" }),
  input: (base) => ({ ...base, color: "#fff" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#6b7280" }),
};

const Select = ({ label, error, ...props }: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      )}
      <ReactSelect
        styles={selectStyles}
        classNamePrefix="rs"
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
