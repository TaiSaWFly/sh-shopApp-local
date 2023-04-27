import React, { useState, useEffect, ComponentType } from "react";
import style from "./withProductFilter.module.scss";
import { useSelector } from "react-redux";
import ShowMoreButton from "../../common/ButtonComponent/ShowMoreButton";
import SelectField from "../../common/FieldCommonents/SelectField/SelectField";
import NoProductsCaregory from "../../ui/CollectionComponents/NoProductsCaregory/NoProductsCaregory";
import {
  getFilterMemoryData,
  saveFilterData,
} from "../../../store/slices/filterMemory";
import { getProductLengthByParamsIds } from "../../../store/slices/product";
import { filterProductsByOption } from "../../../utils/filterProductsByOption";
import { useAppDispatch } from "../../../hooks/ReduxHooks/reduxHooks";
import { IProduct } from "../../../ts/models/dataModels/IProduct";
import { ICollectionCaterory } from "../../../ts/models/dataModels/ICollectionCaterory";
import { ICategory } from "../../../ts/models/dataModels/ICategory";
import { SelectFieldVariant } from "../../../ts/enums/FormFieldEnums/SelectFieldVariant";
import { FormChangeArgs } from "../../../ts/types/globalTypes/FormChangeArgs";
import { SelectOption } from "../../../ts/types/FormFieldTypes/SelectOption";
import { KeyableTypes } from "../../../ts/types/globalTypes/KeyableTypes";
import useSelectOptions from "../../../hooks/useSelectOptions";

interface withProductFilterProps {
  products: IProduct[];
  collectionPath: string;
  collection: ICollectionCaterory;
  category: ICategory;
  limit: number;
  handleMoreProduct: () => void;
}

type FilterMemoryType = KeyableTypes<SelectOption | null>;

const initialFilterState: FilterMemoryType = {
  price: null,
  size: null,
  color: null,
};

const withProductFilter =
  <T extends object>(
    Component: ComponentType<T>
  ): React.FC<withProductFilterProps> =>
  ({
    products,
    collectionPath,
    collection,
    category,
    limit,
    handleMoreProduct,
    ...props
  }) => {
    const dispatch = useAppDispatch();
    const { colorOptions, sizeOptions, priceOptions } = useSelectOptions();

    // Selectors
    const dataProductLength: number = useSelector(
      getProductLengthByParamsIds({
        collectionId: collection._id,
        categoryId: category?._id,
      })
    );
    const filterMemoryData: null | FilterMemoryType = useSelector(
      getFilterMemoryData()
    );

    // check for COMMING SOON
    const checkProducts: IProduct[] = products.filter((p) => p.prices) || [];

    // States
    const [data, setData] = useState<FilterMemoryType>(
      filterMemoryData ? filterMemoryData : initialFilterState
    );
    const [filtedProducts, setFilterProducts] = useState(products);

    const handleChange = (
      target: FormChangeArgs<string, SelectOption>
    ): void => {
      setData((prevState: any) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    };

    useEffect(() => {
      const filtedData = filterProductsByOption(data, products);
      setFilterProducts(filtedData);
    }, [products, data]);

    const handleMoreProductWithSaveFilterData = (): void => {
      handleMoreProduct();
      dispatch(saveFilterData(data));
    };

    return (
      <>
        {filtedProducts.length !== 0 ? (
          <>
            {checkProducts.length !== 0 && (
              <div className={style.product_filter}>
                <div className={style.filter_conteiner}>
                  <div className={style.filter_wrapper}>
                    <div className={style.filter}>
                      <SelectField
                        name="price"
                        options={priceOptions}
                        value={data.price}
                        placeholder="Price"
                        type={SelectFieldVariant.FILTER}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={style.filter}>
                      <SelectField
                        name="size"
                        options={sizeOptions}
                        value={data.size}
                        placeholder="Size"
                        type={SelectFieldVariant.FILTER}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={style.filter}>
                      <SelectField
                        name="color"
                        options={colorOptions}
                        value={data.color}
                        placeholder="Color"
                        type={SelectFieldVariant.FILTER}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Component {...(props as T)} productsItems={filtedProducts} />

            {limit < dataProductLength && (
              <ShowMoreButton
                handleMoreProduct={handleMoreProductWithSaveFilterData}
              />
            )}
          </>
        ) : (
          <NoProductsCaregory
            {...{
              categoryId: category?._id,
              collectionPath,
            }}
          />
        )}
      </>
    );
  };

export default withProductFilter;
