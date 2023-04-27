import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductLoadingStatus } from "../../../../store/slices/product";
import ProductDescriptionShort from "../../../common/ProductDescriptionShort/ProductDescriptionShort";
import style from "./productItems.module.scss";
import Loading from "../../../common/LoadingComponent/Loading";
import BasketChevronQuantity from "../../../common/Chevrons/BasketChevronQuantity/BasketChevronQuantity";
import { IProduct } from "../../../../ts/models/dataModels/IProduct";

interface ProductItemsProps {
  productsItems: IProduct[];
}

const ProductItems: React.FC<ProductItemsProps> = ({
  productsItems: products,
}) => {
  const history = useHistory();
  const handleRedirectToProduct = (id: string): void => {
    history.push(`/product/${id}`);
  };

  const isLoadingProducts = useSelector(getProductLoadingStatus());

  return (
    <div className={style.product_items}>
      {!isLoadingProducts ? (
        products.map((p) => (
          <div key={p._id} className={style.product_item_wrapper}>
            <div className={style.product_item_wrap}>
              <div
                onClick={() => handleRedirectToProduct(p._id)}
                className={style.product_item_img}
              >
                <img alt="pic" src={require(`/src/${p.imgUrl}`)} />
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
              <BasketChevronQuantity productId={p._id} />
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductItems;
