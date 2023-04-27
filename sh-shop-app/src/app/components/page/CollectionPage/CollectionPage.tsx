import React, { useEffect } from "react";
import CollectionHeader from "../../ui/CollectionComponents/CollectionHeader/CollectionHeader";
import CollectionCategories from "../../ui/CollectionComponents/CollectionCategories/CollectionCategories";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCollectionCategoryByPath,
  getCollectionIdByPath,
} from "../../../store/slices/collectionCategory";
import { loadProductByCollectionPathAndCategoryPath } from "../../../store/slices/product";
import { getCategoryByIds } from "../../../store/slices/category";
import { useAppDispatch } from "../../../hooks/ReduxHooks/reduxHooks";
import { ICollectionCaterory } from "../../../ts/models/dataModels/ICollectionCaterory";
import { ICategory } from "../../../ts/models/dataModels/ICategory";

const CollectionPage: React.FC = () => {
  const { collection: collectionPath } = useParams<{
    collection: string;
  }>();
  const dispatch = useAppDispatch();

  const defaultLength = 4;

  const collectionCategory: ICollectionCaterory = useSelector(
    getCollectionCategoryByPath(collectionPath)
  );

  const collectionId: string = useSelector(
    getCollectionIdByPath(collectionPath)
  );
  const categoriesData: ICategory[] =
    useSelector(getCategoryByIds(collectionCategory.categories)) || [];

  useEffect(() => {
    categoriesData.forEach((c) => {
      dispatch(
        loadProductByCollectionPathAndCategoryPath(
          collectionPath,
          c.path,
          collectionId,
          c._id,
          defaultLength
        )
      );
    });

    // eslint-disable-next-line
  }, [collectionPath]);

  return (
    <>
      <CollectionHeader
        {...{
          name: collectionCategory.name,
          path: collectionPath,
        }}
      />

      <CollectionCategories
        {...{
          collectionPath,
          categories: categoriesData,
        }}
      />
    </>
  );
};

export default CollectionPage;
