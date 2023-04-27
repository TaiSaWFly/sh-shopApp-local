import React from "react";
import Button from "./Button";
import style from "./button.module.scss";

interface ShowMoreButtonProps {
  handleMoreProduct: () => void;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  handleMoreProduct,
}) => {
  return (
    <div className={style.show_more_button}>
      <Button onAction={handleMoreProduct}>show more</Button>
    </div>
  );
};

export default ShowMoreButton;
