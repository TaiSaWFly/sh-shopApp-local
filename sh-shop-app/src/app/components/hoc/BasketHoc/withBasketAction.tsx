import React, { ComponentType } from "react";
import { useSelector } from "react-redux";
import {
  addProductToBasket,
  getIsExistingProductInBasket,
  getQtyProductsBasket,
} from "../../../store/slices/basket";
import { getProductByIds } from "../../../store/slices/product";
import { useAppDispatch } from "../../../hooks/ReduxHooks/reduxHooks";
import { KeyableTypes } from "../../../ts/types/globalTypes/KeyableTypes";
import { IProduct } from "../../../ts/models/dataModels/IProduct";

interface withBasketActionProps {
  productId: string;
  data: KeyableTypes<string[]>;
}

const withBasketAction =
  <T extends object>(
    Component: ComponentType<T>
  ): React.FC<withBasketActionProps> =>
  ({ productId, data, ...props }) => {
    const dispatch = useAppDispatch();

    const qtyProduct: number = useSelector(getQtyProductsBasket(productId));
    const inBasket: boolean = useSelector(
      getIsExistingProductInBasket(productId)
    );
    const product: IProduct = useSelector(getProductByIds(productId));

    const productPrices = product.prices
      ? product.prices.newPrice
        ? product.prices.newPrice
        : product.prices.price
      : null;
    const colorAndSizeData = data;

    const handleAddProduct = (): void => {
      const resData = {
        productId: product._id,
        imgUrl: product.imgUrl,
        name: product.name,
        prices: productPrices,
        articleNumber: product.articleNumber,
        quantity: 1,
        ...colorAndSizeData,
      };

      dispatch(addProductToBasket(resData));
    };

    return (
      <Component
        {...(props as T)}
        {...{ inBasket, qty: qtyProduct, handleAddProduct }}
      />
    );
  };

export default withBasketAction;
