import { useSelector } from "react-redux";
import { SelectOption } from "../ts/types/FormFieldTypes/SelectOption";
import { getColorForSelect } from "../store/slices/color";
import { getSizeForSelect } from "../store/slices/size";
import { getCountryForSelect } from "../store/slices/country";

const useSelectOptions = () => {
  const countriesOptions: SelectOption[] = useSelector(getCountryForSelect());
  const colorOptions: SelectOption[] = useSelector(getColorForSelect());
  const sizeOptions: SelectOption[] = useSelector(getSizeForSelect());
  const priceOptions: SelectOption[] = [
    { value: "1", label: "10-20" },
    { value: "2", label: "20-30" },
    { value: "3", label: "30-50" },
    { value: "4", label: "50-100" },
    { value: "5", label: "100 and more" },
  ];

  return {
    countriesOptions,
    colorOptions,
    sizeOptions,
    priceOptions,
  };
};

export default useSelectOptions;
