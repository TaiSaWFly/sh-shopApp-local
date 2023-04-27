import React from "react";
import style from "./productDescription.module.scss";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <div className={style.product_description}>
      <div className={style.product_description_title}>Description</div>
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
