import React from "react";
import { Route, Switch } from "react-router-dom";
import ComponentContainer from "../../common/ComponentContainer/ComponentContainer";
import style from "./accountLayout.module.scss";
import AccountUser from "../../ui/Account/AccountUser/AccountUser";
import AccountMenu from "../../ui/Account/AccountMenu/AccountMenu";
import TitleComponent from "../../common/TitleComponent/TitleComponent";
import AccountFavourite from "../../ui/Account/AccountFavourite/AccountFavourite";
import Loading from "../../common/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { getIsLoadingStatusUser, getUser } from "../../../store/slices/user";
import { IUser } from "../../../ts/models/dataModels/IUser";
import EditProfileForm from "../../ui/Forms/EditProfileForm/EditProfileForm";
import HistoryTable from "../../ui/Account/AccountHistory/HistoryTable/HistoryTable";

const AccountLayout: React.FC = () => {
  const user: IUser = useSelector(getUser());
  const isLoadingUser: boolean = useSelector(getIsLoadingStatusUser());

  return (
    <ComponentContainer>
      <div className={style.account_title}>
        <TitleComponent title="Account" />
      </div>

      {!isLoadingUser ? (
        <div className={style.account_layout}>
          <div className={style.account_user}>
            <AccountUser {...{ user }} />
          </div>

          <div className={style.account_menus}>
            <Switch>
              <Route exact path="/account" component={AccountMenu} />
              <Route
                path="/account/edit"
                component={() => EditProfileForm({ ...{ user } })}
              />
              <Route path="/account/favourite" component={AccountFavourite} />
              <Route path="/account/history" component={HistoryTable} />
            </Switch>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </ComponentContainer>
  );
};

export default AccountLayout;
