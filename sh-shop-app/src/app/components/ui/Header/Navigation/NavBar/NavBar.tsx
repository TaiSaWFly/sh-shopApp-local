import React from "react";
import { Link } from "react-router-dom";
import style from "./navBar.module.scss";
import NavList from "../NavList/NavList";
import ComponentContainer from "../../../../common/ComponentContainer/ComponentContainer";
import { ContainerNameVariant } from "../../../../../ts/enums/ContainerNameVariant";

const NavBar: React.FC = () => {
  return (
    <ComponentContainer containerName={ContainerNameVariant.NAV_BAR}>
      <nav className={style.nav_bar}>
        <div className={style.nav_bar__wrap}>
          <Link className={style.nav_logo} to="/">
            SH
          </Link>

          <NavList />
        </div>
      </nav>
    </ComponentContainer>
  );
};

export default NavBar;
