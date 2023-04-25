import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signupSchema } from "../../../../utils/yupSchema";
import Button from "../../../common/buttonComponent/Button";
import CheckBoxField from "../../../common/FieldCommonents/CheckBoxField/CheckBoxField";
import SelectField, {
  initialStateSelectField,
} from "../../../common/FieldCommonents/SelectField/SelectField";
import TextField from "../../../common/FieldCommonents/TextField/TextField";
import TitleComponent from "../../../common/TitleComponent/TitleComponent";
import style from "./signupPage.module.scss";
import {
  clearAuthError,
  getAuthErrors,
  signUp,
} from "../../../../store/slices/user";
import { getCountryForSelect } from "../../../../store/slices/country";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";
import { KeyableTypes } from "../../../../ts/types/globalTypes/KeyableTypes";
import { SelectFieldVariant } from "../../../../ts/enums/FormFieldEnums/SelectFieldVariant";
import { SelectOption } from "../../../../ts/types/FormFieldTypes/SelectOption";
import { TextFieldTypeVariant } from "../../../../ts/enums/FormFieldEnums/TextFieldTypeVariant";

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authErrors = useSelector(getAuthErrors());

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: initialStateSelectField,
    licence: false,
  });
  const [errors, setErrors] = useState<KeyableTypes<string>>({});
  const countriesOptions: SelectOption[] = useSelector(getCountryForSelect());

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validate = (): boolean => {
    signupSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    target: FormChangeArgs<string, string | boolean | SelectOption>
  ): void => {
    setData((prevStare) => ({
      ...prevStare,
      [target.name]: target.value,
    }));
  };

  const isValid: boolean = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const resData = {
      userName: data.userName,
      password: data.password,
      email: data.email,
      country: data.country.value,
    };

    dispatch(signUp(resData));
  };

  return (
    <div className={style.signup_page}>
      <TitleComponent title={"sign up"} />
      {authErrors && (
        <div className={style.signup_page__error}>{authErrors}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <div className={style.signup_form__field}>
            <TextField
              type={TextFieldTypeVariant.TEXT}
              name="userName"
              label="Account Name"
              value={data.userName}
              onChange={handleChange}
              error={errors.userName}
            />
          </div>

          <div className={style.signup_form__field}>
            <TextField
              type={TextFieldTypeVariant.TEXT}
              name="email"
              label="e-mail"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <div className={style.signup_form__field}>
            <TextField
              name="password"
              label="password"
              type={TextFieldTypeVariant.PASSWORD}
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div className={style.signup_form__field}>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type={TextFieldTypeVariant.PASSWORD}
              value={data.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
          <div className={style.signup_form__field}>
            <SelectField
              label="country"
              name="country"
              options={countriesOptions}
              value={data.country}
              type={SelectFieldVariant.FORM}
              placeholder="choose your country"
              onChange={handleChange}
              error={errors.country}
            />
          </div>
        </div>

        <div className={style.signup_form__field}>
          <CheckBoxField
            name="licence"
            value={data.licence}
            onChange={handleChange}
            error={errors.licence}
          >
            <span className={style.signup_form__licence}>
              You agree to our <Link to="/">Privacy Policy</Link>
            </span>
          </CheckBoxField>
        </div>

        <div className={style.signup_form__action}>
          <Button isDisabled={!isValid}>sign up</Button>

          <div>
            <Link to="/auth/signin">i have an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
