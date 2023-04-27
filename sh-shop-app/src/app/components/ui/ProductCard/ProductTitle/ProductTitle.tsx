import React from "react";
import style from "./productTitle.module.scss";

interface ProductTitleProps {
  name: string;
  articleNumber: string;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ name, articleNumber }) => {
  return (
    <div className={style.product_title__wrapper}>
      <div className={style.product_title}>{name}</div>
      <div className={style.product_article_number}>
        Article number: {articleNumber}
      </div>
    </div>
  );
};

export default ProductTitle;
