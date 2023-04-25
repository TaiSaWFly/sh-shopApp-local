import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./loginPage.module.scss";
import TitleComponent from "../../../common/TitleComponent/TitleComponent";
import TextField from "../../../common/FieldCommonents/TextField/TextField";
import Button from "../../../common/buttonComponent/Button";
import { loginSchema } from "../../../../utils/yupSchema";
import { useSelector } from "react-redux";
import {
  clearAuthError,
  getAuthErrors,
  logIn,
} from "../../../../store/slices/user";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { LocationState } from "../../../../ts/types/globalTypes/LocationState";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";
import { KeyableTypes } from "../../../../ts/types/globalTypes/KeyableTypes";
import { TextFieldTypeVariant } from "../../../../ts/enums/FormFieldEnums/TextFieldTypeVariant";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const authErrors = useSelector(getAuthErrors());

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<KeyableTypes<string>>({});

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validate = (): boolean => {
    loginSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target: FormChangeArgs<string, string>): void => {
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

    let redirect = "/";
    if (history.location.state) {
      const from = (history.location.state as LocationState)?.from;
      redirect = from.pathname;
    }

    dispatch(logIn({ payload: data, redirect }));
  };

  return (
    <div className={style.login_page}>
      <TitleComponent title={"sign in"} />

      {authErrors && (
        <div className={style.login_page__error}>{authErrors}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={style.login_form__field}>
          <TextField
            type={TextFieldTypeVariant.TEXT}
            name="email"
            label="e-mail"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div className={style.login_form__field}>
          <TextField
            name="password"
            label="password"
            type={TextFieldTypeVariant.PASSWORD}
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        <div className={style.login_form__action}>
          <Button isDisabled={!isValid}>log in</Button>
          <div>
            <Link to="/auth/signup">i don't have an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
