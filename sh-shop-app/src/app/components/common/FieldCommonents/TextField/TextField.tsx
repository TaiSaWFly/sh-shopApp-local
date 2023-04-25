import React, { useState } from "react";
import style from "./form.module.scss";
import { ReactComponent as EyeSlash } from "../../../../../../node_modules/bootstrap-icons/icons/eye-slash-fill.svg";
import { ReactComponent as Eye } from "../../../../../../node_modules/bootstrap-icons/icons/eye-fill.svg";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";
import { TextFieldTypeVariant } from "../../../../ts/enums/FormFieldEnums/TextFieldTypeVariant";

interface TextFieldProps {
  name: string;
  label: string;
  subLabel?: string;
  type: TextFieldTypeVariant;
  value: string;
  onChange: (target: FormChangeArgs<string, string>) => void;
  error: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  subLabel,
  type,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: currentTarget.name, value: currentTarget.value });
  };

  return (
    <div className={error ? style.form__field_error : style.form__field}>
      <label htmlFor={name}>
        {label} {subLabel ? <span>{subLabel}</span> : null}
      </label>
      <input
        className={
          type === TextFieldTypeVariant.NUMBER
            ? style.input__field_number
            : style.input__field
        }
        type={showPassword ? TextFieldTypeVariant.TEXT : type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {type === TextFieldTypeVariant.PASSWORD && (
        <div
          className={
            showPassword ? style.form__show_password : style.form__hide_password
          }
          onClick={toggleShowPassword}
        >
          {showPassword ? <Eye /> : <EyeSlash />}
        </div>
      )}

      {error && <span className={style.form__error}>{error}</span>}
    </div>
  );
};

export default TextField;
