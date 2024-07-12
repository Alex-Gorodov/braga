import { useState } from "react";

interface CheckboxProps {
  id: string;
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
}

export function FormCheckbox({ id, checked, className, onChange }: CheckboxProps): JSX.Element {
  const [isChecked, setChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <label htmlFor={id} className={`checkbox__label ${className}`}>
      <input
        className="checkbox__input visually-hidden"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkbox__custom"></span>
    </label>
  );
}
