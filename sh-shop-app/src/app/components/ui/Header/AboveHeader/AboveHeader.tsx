import React from "react";
import style from "./aboveHeader.module.scss";
import AccountLink from "../../Account/AccountLink/AccountLink";
import BasketLink from "../../BasketComponents/basketLink/basketLink";

const AboveHeader: React.FC = () => {
  return (
    <div className={style.above_header}>
      <div className={style.above_header__container}>
        <div className={style.above_header__link}>
          <div className={style.above_header__link_currency}>
            Currency : GBP
          </div>
        </div>
        <div className={style.above_header__links}>
          <AccountLink />

          <BasketLink />
        </div>
      </div>
    </div>
  );
};

export default AboveHeader;
