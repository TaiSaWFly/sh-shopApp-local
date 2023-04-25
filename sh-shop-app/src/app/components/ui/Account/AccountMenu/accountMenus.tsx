import React, { ReactNode } from "react";
import style from "./accountMenu.module.scss";
import { ReactComponent as Edit } from "../../../../../../node_modules/bootstrap-icons/icons/pencil-square.svg";
import { ReactComponent as Favourite } from "../../../../../../node_modules/bootstrap-icons/icons/heart-half.svg";
import { ReactComponent as History } from "../../../../../../node_modules/bootstrap-icons/icons/hourglass-split.svg";
import { ReactComponent as Basket } from "../../../../../../node_modules/bootstrap-icons/icons/basket3-fill.svg";
import FavouriteChevronQuantity from "../../../common/Chevrons/FavouriteChevronQuantity/FavouriteChevronQuantity";
// import BasketChevronQuantity from "../../../common/chevrons/basketChevronQuantity/basketChevronQuantity";

type AccountMenus = {
  url: string;
  name: string;
  component: () => ReactNode;
};

const accountMenus: AccountMenus[] = [
  {
    url: "/account/edit",
    name: "Edit profile",
    component: () => <Edit max-width="100px" width="100%" height="100px" />,
  },
  {
    url: "/account/favourite",
    name: "Favourite",
    component: () => (
      <div className={style.menu_link__icon_chevron}>
        <Favourite max-width="100px" width="100%" height="100px" />
        <FavouriteChevronQuantity />
      </div>
    ),
  },
  {
    url: "/account/history",
    name: " history purchase ",
    component: () => <History max-width="100px" width="100%" height="100px" />,
  },
  {
    url: "/basket",
    name: "Your Basket",
    component: () => (
      <div>
        <Basket max-width="100px" width="100%" height="100px" />
        {/* <BasketChevronQuantity /> */}
      </div>
    ),
  },
];

export default accountMenus;
