import React from "react";
import NavBar from "../Navigation/NavBar/NavBar";
import AboveHeader from "../AboveHeader/AboveHeader";

const Header: React.FC = () => {
  return (
    <>
      <AboveHeader />

      <header>
        <NavBar />
      </header>
    </>
  );
};

export default Header;
