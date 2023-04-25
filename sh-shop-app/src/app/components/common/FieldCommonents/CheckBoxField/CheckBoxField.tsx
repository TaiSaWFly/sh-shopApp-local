import React, { ReactNode } from "react";
import style from "./checkBoxField.module.scss";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";

interface CheckBoxFieldProps {
  name: string;
  value: boolean;
  children: ReactNode;
  onChange: (target: FormChangeArgs<string, boolean>) => void;
  error: string;
}

const CheckBoxField: React.FC<CheckBoxFieldProps> = ({
  name,
  value,
  children,
  onChange,
  error,
}) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div>
      <div className={style.checkbox_field}>
        <input
          className={style.checkbox}
          type="checkbox"
          value=""
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label htmlFor={name}>{children}</label>
      </div>
      {error && <span className={style.checkbox_field__error}>{error}</span>}
    </div>
  );
};

export default CheckBoxField;
