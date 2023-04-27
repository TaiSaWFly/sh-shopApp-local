import React, { useState, useEffect } from "react";
import style from "./collectionCategories.module.scss";
import { useSelector } from "react-redux";
import CategoryProducts from "../CategoryProducts/CategoryProducts";
import { getProductLoadingStatus } from "../../../../store/slices/product";
import Loading from "../../../common/LoadingComponent/Loading";
import { ICategory } from "../../../../ts/models/dataModels/ICategory";

interface CollectionCategoriesProps {
  collectionPath: string;
  categories: ICategory[];
}

const CollectionCategories: React.FC<CollectionCategoriesProps> = ({
  collectionPath,
  categories,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategories] = useState<ICategory[]>([]);
  const isLoadingProducts: boolean = useSelector(getProductLoadingStatus());

  useEffect(() => {
    setIsLoading(true);
    setCategories(categories);
  }, [collectionPath, categories]);

  useEffect(() => {
    if (categoriesData && !isLoadingProducts) {
      setIsLoading(false);
    }
  }, [categoriesData, isLoadingProducts]);

  return (
    <>
      {!isLoading ? (
        <div className={style.collection_categories}>
          {categories.map((c) => (
            <div key={c._id}>
              <CategoryProducts category={c} collectionPath={collectionPath} />
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CollectionCategories;
