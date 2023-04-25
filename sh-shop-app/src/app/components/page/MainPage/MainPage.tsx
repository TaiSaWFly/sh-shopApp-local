import React from "react";
import ComponentContainer from "../../common/ComponentContainer/ComponentContainer";
import MainTitle from "../../ui/Main/MainTitle/HomeTitle";
import PopularProducts from "../../ui/Main/PopularComponents/PopularProducts/PopularProducts";
import ShopsNewsLetter from "../../ui/Main/ShopsNewsletter/ShopsNewsletter";

const MainPage: React.FC = () => {
  return (
    <ComponentContainer>
      <MainTitle />
      <PopularProducts />
      <ShopsNewsLetter />
    </ComponentContainer>
  );
};

export default MainPage;
