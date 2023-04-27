import React from "react";
import Button from "../Button";
import style from "./addBasketButton.module.scss";

interface AddBasketButtonProps {
  inBasket: boolean;
  qty: number;
  handleAddProduct: () => void;
}

const AddBasketButton: React.FC<AddBasketButtonProps> = ({
  inBasket,
  qty,
  handleAddProduct,
}) => {
  return (
    <Button
      className={inBasket ? style.basket_button__active : style.basket_button}
      onAction={handleAddProduct}
    >
      {inBasket ? (
        <span className={style.basket_button__info}>
          add more
          {qty > 1 && (
            <div className={style.basket_button__qty}>
              <span>{qty}</span>
            </div>
          )}
        </span>
      ) : (
        "add to basket"
      )}
    </Button>
  );
};

export default AddBasketButton;
