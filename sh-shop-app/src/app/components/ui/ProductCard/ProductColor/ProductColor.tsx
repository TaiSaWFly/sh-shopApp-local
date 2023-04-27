import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./productColor.module.scss";
import Loading from "../../../common/LoadingComponent/Loading";
import { getColorByIds } from "../../../../store/slices/color";
import { KeyableTypes } from "../../../../ts/types/globalTypes/KeyableTypes";
import { IColor } from "../../../../ts/models/dataModels/IColor";

interface ProductColorProps {
  colors: string[];
  onChange: (data: KeyableTypes<string[]>) => void;
}

const ProductColor: React.FC<ProductColorProps> = ({ colors, onChange }) => {
  const colorsArr: IColor[] = useSelector(getColorByIds(colors));
  const [currentColor, setCurrentColor] = useState("");

  const handleChange = (id: string) => {
    setCurrentColor(id);
    onChange({ colors: [id] });
  };

  const setActiveClass = (id: string): string => {
    return id === currentColor
      ? style.product_color___list_item__active
      : style.product_color___list_item;
  };

  return (
    <>
      {colors.length !== 0 && (
        <>
          {colorsArr ? (
            <div className={style.product_color}>
              {colorsArr && colorsArr.length !== 0 && (
                <ul className={style.product_color__list}>
                  <div className={style.product_color__title}>colors</div>
                  {colorsArr.map((c) => (
                    <li
                      key={c._id}
                      onClick={() => handleChange(c._id)}
                      className={setActiveClass(c._id)}
                    >
                      <div
                        style={{
                          backgroundColor: `${c.hex}`,
                        }}
                      ></div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
};

export default ProductColor;
