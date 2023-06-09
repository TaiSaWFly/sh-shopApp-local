import React, { useState, useEffect } from "react";
import TextField from "../../../common/FieldCommonents/TextField/TextField";
import style from "./editProfileForm.module.scss";
import Button from "../../../common/ButtonComponent/Button";
import BackButton from "../../../common/ButtonComponent/BackButton";
import Loading from "../../../common/LoadingComponent/Loading";
import { updateUser } from "../../../../store/slices/user";
import SelectField from "../../../common/FieldCommonents/SelectField/SelectField";
import { editUserSchema } from "../../../../utils/yupSchema";
import { IUser } from "../../../../ts/models/dataModels/IUser";
import { SelectOption } from "../../../../ts/types/FormFieldTypes/SelectOption";
import { KeyableTypes } from "../../../../ts/types/globalTypes/KeyableTypes";
import { FormChangeArgs } from "../../../../ts/types/globalTypes/FormChangeArgs";
import { TextFieldTypeVariant } from "../../../../ts/enums/FormFieldEnums/TextFieldTypeVariant";
import { SelectFieldVariant } from "../../../../ts/enums/FormFieldEnums/SelectFieldVariant";
import { useAppDispatch } from "../../../../hooks/ReduxHooks/reduxHooks";
import useSelectOptions from "../../../../hooks/useSelectOptions";

interface EditProfileFormProps {
  user: IUser;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { countriesOptions } = useSelectOptions();
  const redirect = "/account";

  const userCountry =
    countriesOptions.find((c) => c.value === user.country) || null;

  const [data, setData] = useState({
    userName: user.userName,
    email: user.email,
    country: userCountry,
  });
  const [errors, setErrors] = useState<KeyableTypes<string>>({});

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validate = (): boolean => {
    editUserSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    target: FormChangeArgs<string, string | SelectOption>
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
      ...data,
      country: data.country?.value,
    } as unknown as IUser;

    dispatch(updateUser({ payload: resData, redirect }));
  };

  return (
    <div className={style.edit_profile_form__wrapper}>
      <div className={style.edit_profile_form}>
        <BackButton
          className={style.edit_profile__back_button}
          urlBack={redirect}
        >
          go back
        </BackButton>

        <div className={style.profile_form__title}>Edit Profile</div>
        {user ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className={style.edit_form__field}>
                <TextField
                  type={TextFieldTypeVariant.TEXT}
                  name="userName"
                  label="Your Name"
                  value={data.userName}
                  onChange={handleChange}
                  error={errors.userName}
                />
              </div>

              <div className={style.edit_form__field}>
                <TextField
                  type={TextFieldTypeVariant.TEXT}
                  name="email"
                  label="e-mail"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <div className={style.edit_form__field}>
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

              <div className={style.edit_form__action}>
                <Button isDisabled={!isValid}>submit</Button>
              </div>
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
