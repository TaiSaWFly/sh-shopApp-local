import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ComponentContainer from "../common/ComponentContainer/ComponentContainer";
import AllProductsPage from "../page/AllProductsPage/AllProductsPage";
import CollectionPage from "../page/CollectionPage/CollectionPage";

const CollectionLayout: React.FC = () => {
  return (
    <ComponentContainer>
      <Switch>
        <Route
          exact
          path="/collection/:collection?"
          component={CollectionPage}
        />

        <Route
          path="/collection/:collection?/:category?/products"
          component={AllProductsPage}
        />

        <Redirect to="/" from="*" />
      </Switch>
    </ComponentContainer>
  );
};

export default CollectionLayout;
