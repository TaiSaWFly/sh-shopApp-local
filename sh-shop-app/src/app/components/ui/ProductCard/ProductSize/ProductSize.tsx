import React, { useState } from "react";
import style from "./productSize.module.scss";
import Loading from "../../../common/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { getSizeByIds } from "../../../../store/slices/size";
import { KeyableTypes } from "../../../../ts/types/globalTypes/KeyableTypes";
import { ISize } from "../../../../ts/models/dataModels/ISize";

interface ProductSizeProps {
  sizes: string[];
  onChange: (data: KeyableTypes<string[]>) => void;
}

const ProductSize: React.FC<ProductSizeProps> = ({ sizes, onChange }) => {
  const sizesArray: ISize[] = useSelector(getSizeByIds(sizes));
  const [currentSize, setCurrentSize] = useState("");

  const handleChange = (id: string) => {
    setCurrentSize(id);
    onChange({ sizes: [id] });
  };

  const setActiveClass = (id: string): string => {
    return id === currentSize
      ? style.product_size___list_item__active
      : style.product_size___list_item;
  };

  return (
    <>
      {sizes.length !== 0 && (
        <>
          {sizesArray ? (
            <div className={style.product_size}>
              {sizesArray && sizesArray.length !== 0 && (
                <ul className={style.product_size__list}>
                  <div className={style.product_size__title}>size</div>
                  {sizesArray.map((s) => (
                    <li
                      key={s._id}
                      onClick={() => handleChange(s._id)}
                      className={setActiveClass(s._id)}
                    >
                      <span>{s.name}</span>
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

export default ProductSize;
