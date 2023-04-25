import React, { useEffect } from "react";
import style from "./accountFavourite.module.scss";
import ProductDescriptionShort from "../../../common/productDescriptionShort/productDescriptionShort";
import { useHistory } from "react-router-dom";
import Loading from "../../../common/LoadingComponent/Loading";
import BackButton from "../../../common/buttonComponent/BackButton";
import { useSelector } from "react-redux";
import { getFavourite } from "../../../../store/slices/favourite";
import {
  getProductByIds,
  getProductLoadingStatus,
  loadProductByIds,
} from "../../../../store/slices/product";
import BasketChevronQuantity from "../../../common/chevrons/BasketChevronQuantity/BasketChevronQuantity";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { IProduct } from "../../../../ts/models/IProduct";

const AccountFavourite: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const favourite: string[] = useSelector(getFavourite());
  const favouriteProducts: IProduct[] = useSelector(getProductByIds(favourite));
  const isLoadingProducts: boolean = useSelector(getProductLoadingStatus());

  useEffect(() => {
    dispatch(loadProductByIds(favourite));
    // eslint-disable-next-line
  }, []);

  const handleRedirectToProduct = (id: string): void => {
    history.push(`/product/${id}`);
  };

  return (
    <div className={style.favourite_products}>
      <BackButton className={style.favourite__back_button} urlBack="/account">
        go back
      </BackButton>

      {!isLoadingProducts ? (
        favouriteProducts.map((p) => (
          <div key={p._id} className={style.product_item}>
            <div className={style.product_wrapper}>
              <div
                onClick={() => handleRedirectToProduct(p._id)}
                className={style.product_img}
              >
                <img alt="pic" src={require(`/src/${p.imgUrl}`)} />

                <BasketChevronQuantity productId={p._id} />
              </div>

              <ProductDescriptionShort
                {...{
                  id: p._id,
                  name: p.name,
                  prices: p.prices,
                  description: p.description,
                  titleSize: "1.2rem",
                  textSize: "1.15rem",
                  QTYSentences: 2,
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AccountFavourite;
