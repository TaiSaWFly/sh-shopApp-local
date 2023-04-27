import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./productCardPage.module.scss";
import ProductImage from "../../../ui/ProductCard/ProductImage/ProductImage";
import ProductTitle from "../../../ui/ProductCard/ProductTitle/ProductTitle";
import ProductDescription from "../../../ui/ProductCard/ProductDescription/ProductDescription";
import ProductSize from "../../../ui/ProductCard/ProductSize/ProductSize";
import ProductColor from "../../../ui/ProductCard/ProductColor/ProductColor";
import RenderPrice from "../../../common/PriceComponent/RenderPrice/RenderPrice";
import withBasketAction from "../../../hoc/BasketHoc/withBasketAction";
import AddBasketButton from "../../../common/ButtonComponent/AddBasketButton/AddBasketButton";
import { IProduct } from "../../../../ts/models/dataModels/IProduct";
import { KeyableTypes } from "../../../../ts/types/globalTypes/KeyableTypes";

interface ProductCardPageProps {
  product: IProduct;
  productId: string;
}

const ProductCardPage: React.FC<ProductCardPageProps> = ({
  product,
  productId,
}) => {
  const {
    imgUrl,
    otherImg,
    name,
    articleNumber,
    prices,
    description,
    sizes,
    colors,
  } = product;

  const ButtonWithBasketAction = withBasketAction(AddBasketButton);
  const [data, setData] = useState<{ sizes: string[]; colors: string[] }>({
    sizes: [],
    colors: [],
  });

  const handleChange = (data: KeyableTypes<string[]>) => {
    setData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  return (
    <>
      <div className={style.product_card_page}>
        <div className={style.product_card_page__wrapper}>
          <div className={style.product_card_page__item}>
            <ProductImage {...{ imgUrl, otherImg }} />
          </div>

          <div className={style.product_card_page__item}>
            <div className={style.product_card_page__item_info}>
              <ProductTitle {...{ name, articleNumber }} />
              <RenderPrice {...{ prices }} />
              <ProductDescription {...{ description }} />
              <ProductSize onChange={handleChange} sizes={sizes} />
              <ProductColor onChange={handleChange} colors={colors} />

              {/* check for COMMING SOON */}
              {prices && <ButtonWithBasketAction {...{ productId, data }} />}
            </div>
          </div>
        </div>
      </div>

      <div className={style.product_card_page__links}>
        <NavLink
          className={(isActive) =>
            isActive
              ? style.product_card_page__navLink_active
              : style.product_card_page__navLink
          }
          to={`/product/${productId}/decription`}
        >
          description
        </NavLink>

        <NavLink
          className={(isActive) =>
            isActive
              ? style.product_card_page__navLink_active
              : style.product_card_page__navLink
          }
          to={`/product/${productId}/reviews`}
        >
          reviews
        </NavLink>
      </div>
    </>
  );
};

export default ProductCardPage;
