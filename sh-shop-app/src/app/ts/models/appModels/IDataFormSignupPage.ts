import { SelectOption } from "../../types/FormFieldTypes/SelectOption";

export interface IDataFormSignupPage {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: SelectOption | null;
  licence: boolean;
}
