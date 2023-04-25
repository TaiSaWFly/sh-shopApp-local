import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/ui/Footer/FooterComponent/Footer";
import Header from "./components/ui/Header/HeaderComponent/Header";
import CollectionLayout from "./components/layouts/CollectionLayout";
import AboutPage from "./components/page/AboutPage/AboutPage";
import BasketPage from "./components/page/BasketPage/BasketPage";
import MainPage from "./components/page/MainPage/MainPage";
import PageLayout from "./components/layouts/PageLayout";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import AccountLayout from "./components/layouts/AccountLayout/AccountLayout";
import ContactPage from "./components/page/ContactPage/ContactPage";
import ProductCardLayout from "./components/layouts/ProductCardLayout/ProductCardLayout";
import ProtectedRoute from "./components/common/ProtectedRoutes/ProtectedRoute";
import NewArrivalsPage from "./components/page/NewProductsPages/NewArrivalsPage";
import withRedux from "./components/hoc/withRedux";
import withRouter from "./components/hoc/withRouter";
import AppLoader from "./components/hoc/appLoader";

const App: React.FC = () => {
  return (
    <AppLoader>
      <Header />
      <PageLayout>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/auth" component={AuthLayout} />
          <ProtectedRoute path="/account" component={AccountLayout} />
          <Route path="/collection" component={CollectionLayout} />
          <Route path="/product/:productId?" component={ProductCardLayout} />
          <Route path="/basket" component={BasketPage} />
          <Route path="/newarrivals" component={NewArrivalsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />

          <Redirect to="/" from="*" />
        </Switch>
      </PageLayout>
      <Footer />
    </AppLoader>
  );
};

const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
