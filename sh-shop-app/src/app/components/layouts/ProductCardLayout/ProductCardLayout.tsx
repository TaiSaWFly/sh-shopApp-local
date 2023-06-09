import React from "react";
import { useEffect } from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ComponentContainer from "../../common/ComponentContainer/ComponentContainer";
import Loading from "../../common/LoadingComponent/Loading";
import ProductCardPage from "../../page/ProductCardPages/ProductCardPage/ProductCardPage";
import ProductDescriptionPage from "../../page/ProductCardPages/ProductDescriptionPage/ProductDescriptionPage";
import ReviewsPage from "../../page/ReviewsPage/ReviewsPage";
import style from "./productCardLayout.module.scss";
import {
  getProductByIds,
  getProductError,
  loadProductByIds,
} from "../../../store/slices/product";
import NoProduct from "../../ui/ProductCard/NoProduct/NoProduct";
import { useAppDispatch } from "../../../hooks/ReduxHooks/reduxHooks";
import { IProduct } from "../../../ts/models/dataModels/IProduct";

const ProductCardLayout: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const dispatch = useAppDispatch();
  const product: IProduct = useSelector(getProductByIds(productId));
  const productError: boolean = useSelector(getProductError());

  useEffect(() => {
    dispatch(loadProductByIds([productId]));
    window.scrollTo(0, 0);

    // eslint-disable-next-line
  }, [productId]);

  return (
    <ComponentContainer>
      {!productError ? (
        product ? (
          <>
            <div className={style.product_card_page}>
              <ProductCardPage {...{ product, productId }} />
            </div>

            <div className={style.product_card_page__pages_info}>
              <Switch>
                <Route
                  path={`/product/${productId}/decription`}
                  component={ProductDescriptionPage}
                />

                <Route
                  path={`/product/${productId}/reviews`}
                  component={() => ReviewsPage({ ...{ productId } })}
                />

                <Redirect to={`/product/${productId}/decription`} from="*" />
              </Switch>
            </div>
          </>
        ) : (
          <Loading />
        )
      ) : (
        <NoProduct />
      )}
    </ComponentContainer>
  );
};

export default ProductCardLayout;
