import React from "react";
import ComponentContainer from "../../common/ComponentContainer/ComponentContainer";
import MainTitle from "../../ui/Main/mainTitle/homeTitle";
import PopularProducts from "../../ui/Main/popularComponents/popularProducts/popularProducts";
import ShopsNewsLetter from "../../ui/Main/shopsNewsletter/shopsNewsletter";

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
