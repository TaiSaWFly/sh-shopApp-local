import React, { useState, useEffect } from "react";
import style from "./dropdownList.module.scss";
import { Link } from "react-router-dom";
import Loading from "../../../common/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import {
  getCategoryByIds,
  getCategoryLoadingStatus,
} from "../../../../store/slices/category";
import { ICategory } from "../../../../ts/models/dataModels/ICategory";

interface DropdownListProps {
  submenus: string[];
  dropdown: boolean;
  collectionPath: string;
  collectionName: string;
}

const DropdownList: React.FC<DropdownListProps> = ({
  submenus,
  dropdown,
  collectionPath: path,
  collectionName: name,
}) => {
  const [submenusItems, setSubmenusItems] = useState<ICategory[]>([]);
  const categorySelectorData: ICategory[] = useSelector(
    getCategoryByIds(submenus)
  )!;
  const isLoadingCategory: boolean = useSelector(getCategoryLoadingStatus());

  useEffect(() => {
    setSubmenusItems(categorySelectorData);
    // eslint-disable-next-line
  }, [submenus]);

  return (
    <div
      className={
        dropdown ? style.dropdown_list__show : style.dropdown_list__hide
      }
    >
      <div className={style.dropdown_list__title}>{name}</div>
      <ul className={style.dropdown_list__item}>
        {!isLoadingCategory && submenusItems.length !== 0 ? (
          submenusItems.map((s) => (
            <li key={s._id} className={style.dropdown_list__wrapper}>
              <Link
                key={s._id}
                className={style.dropdown_list__link}
                to={{
                  pathname: `/collection/${path + "/" + s.path}/products`,
                }}
              >
                {s.name}
              </Link>
            </li>
          ))
        ) : (
          <Loading />
        )}
      </ul>
    </div>
  );
};

export default DropdownList;
