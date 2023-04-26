import React from "react";
import { useHistory } from "react-router-dom";
import style from "./accountMenu.module.scss";
import accountMenus from "./accountMenus";

const AccountMenu: React.FC = () => {
  const history = useHistory();

  const handleRedirectToLink = (url: string) => {
    history.push(url);
  };

  return (
    <div className={style.account}>
      <div className={style.account_menu__wrapper}>
        {accountMenus.map((m, i) => (
          <div key={i} className={style.menu_link__wrapper}>
            <div
              className={style.menu_link}
              onClick={() => handleRedirectToLink(m.url)}
            >
              <div className={style.menu_link__title}> {m.name}</div>
              <div className={style.menu_link__icon}>{m.component()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountMenu;
