import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "./components/ui/Footer/FooterComponent/Footer";
import Header from "./components/ui/Header/HeaderComponent/Header";
import CollectionLayout from "./components/layouts/CollectionLayout";
import AboutPage from "./components/page/AboutPage/aboutPage";
import BasketPage from "./components/page/BasketPage/basketPage";
import MainPage from "./components/page/MainPage/mainPage";
import PageLayout from "./components/layouts/PageLayout";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import AccountLayout from "./components/layouts/AccountLayout/AccountLayout";
import ContactPage from "./components/page/ContactPage/contactPage";
import ProductCardLayout from "./components/layouts/ProductCardLayout/productCardLayout";
import ProtectedRoute from "./components/common/protectedRoutes/protectedRoute";
import NewArrivalsPage from "./components/page/NewProductsPages/newArrivalsPage";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import AppLoader from "./hoc/appLoader";

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
