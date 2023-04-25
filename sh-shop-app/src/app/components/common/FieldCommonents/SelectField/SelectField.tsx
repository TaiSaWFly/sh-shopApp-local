import React from "react";
import Select, { SingleValue } from "react-select";
import "./selectField.scss";
import { SelectFieldVariant } from "../../../../ts/enums/FormFieldEnums/SelectFieldVariant";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";
import { SelectOption } from "../../../../ts/types/FormFieldTypes/SelectOption";

interface SelectFieldProps {
  label: string;
  name: string;
  options: SelectOption[];
  value: SelectOption;
  type: SelectFieldVariant;
  placeholder: string;
  onChange: (target: FormChangeArgs<string, SelectOption>) => void;
  error: string;
}

export const initialStateSelectField: SelectOption = {
  value: "",
  label: "",
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  type,
  placeholder,
  onChange,
  error,
}) => {
  const handleChange = (value: SingleValue<SelectOption>) => {
    onChange({ name: name, value: value || initialStateSelectField });
  };

  const setSelectInvalidClass = (): string => {
    const defaultClass = "select_field";
    const invalidClass = "select_field__invalid";
    const setClass = error ? `${defaultClass} ${invalidClass}` : defaultClass;
    return setClass;
  };

  const setSelectClassPrefix = () => {
    switch (type) {
      case SelectFieldVariant.FORM:
        return "select_form";
      case SelectFieldVariant.FILTER:
        return "select_filter";

      default:
        break;
    }
  };

  return (
    <div className={setSelectInvalidClass()}>
      {label && <label>{label}</label>}

      <Select
        classNamePrefix={setSelectClassPrefix()}
        name={name}
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        isClearable={true}
        maxMenuHeight={190}
      />

      {error && <span className="select_field__error">{error}</span>}
    </div>
  );
};

export default SelectField;
