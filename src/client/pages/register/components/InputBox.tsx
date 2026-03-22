type inputVariant = "radio" | "box";

interface InputBoxProps {
  inputName: string;
  placeHolder?: string;
  variant: inputVariant;
  options?: string[];
}

const InputBox = ({
  inputName,
  placeHolder,
  variant,
  options = [],
}: InputBoxProps) => {
  if (variant === "box") {
    return (
      <div className="grid gap-2 space-y-2">
        <label htmlFor={inputName} className="font-medium text-">
          {inputName}
        </label>
        <input
          id={inputName}
          type="text"
          className="border border-[1px] border-[#00000014] px-4 py-2 rounded-lg text-small md:min-w-[300px] lg:min-w-[340px]"
          placeholder={placeHolder}
        />
      </div>
    );
  }

  // radio
  return (
    <div className="grid gap-2">
      <p className="font-medium">{inputName}</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="radio" name={inputName} value={option} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default InputBox;
