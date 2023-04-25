import React from "react";
import style from "./navList.module.scss";
import { ReactComponent as Search } from "../../../../../../assets/svg_icons/search.svg";
import NavListMenuItems from "../NavListMenuItems/NavListMenuItems";
import Loading from "../../../../common/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import {
  getNavigateMenu,
  getNavigateMenuLoadingStatus,
} from "../../../../../store/slices/navigateMenu";
import { INavigateMenu } from "../../../../../ts/models/INavigateMenu";

const NavList: React.FC = () => {
  const menus: INavigateMenu[] = useSelector(getNavigateMenu());
  const isLoadingMenus: boolean = useSelector(getNavigateMenuLoadingStatus());

  return (
    <>
      {!isLoadingMenus ? (
        <ul className={style.nav_list}>
          {menus.map((menu) => (
            <NavListMenuItems key={menu._id} menu={menu} />
          ))}
        </ul>
      ) : (
        <Loading />
      )}

      <div className={style.nav_list__search}>
        <label id="search" className={style.nav_list__search_label}>
          <Search
            className={style.nav_list__search_icon}
            width="16px"
            height="16px"
          />
        </label>
        <input
          className={style.nav_list__search_input}
          id="search"
          type="search"
          placeholder="Search..."
        />
      </div>
    </>
  );
};

export default NavList;
