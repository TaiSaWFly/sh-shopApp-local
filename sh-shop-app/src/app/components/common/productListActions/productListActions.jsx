import React from "react";
import style from "./productListActions.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Info } from "../../../../../node_modules/bootstrap-icons/icons/info-lg.svg";
import AddBasketButtonSmall from "../ButtonComponent/AddBasketButtonSmall/AddBasketButtonSmall";
import AddFavouriteButtonSmall from "../ButtonComponent/AddFavouriteButtonSmall/AddFavouriteButtonSmall";
import withBasketAction from "../../hoc/BasketHoc/withBasketAction";
import withFavouriteAction from "../../hoc/FavouriteHoc/withFavouriteAction";
import { useSelector } from "react-redux";
import { getIsLoggedInStatus } from "../../../store/slices/user";

const ProductListActions = ({ productId, prices }) => {
  const isLoggedIn = useSelector(getIsLoggedInStatus());
  const ButtonWithBasketAction = withBasketAction(AddBasketButtonSmall);
  const ButtonWithFavouriteAction = withFavouriteAction(
    AddFavouriteButtonSmall
  );

  return (
    <div className={style.popular_list_actions__wrapper}>
      {prices && <ButtonWithBasketAction {...{ productId }} />}

      {isLoggedIn && <ButtonWithFavouriteAction {...{ productId }} />}

      <Link
        to={`/product/${productId}`}
        className={style.popular_list_actions__wrap}
      >
        <Info
          className={style.popular_list_actions__icon}
          width="22px"
          height="22px"
        />
      </Link>
    </div>
  );
};

export default ProductListActions;
