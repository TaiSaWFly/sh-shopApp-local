import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import withProductFilter from "../../hoc/WithProductFilter/withProductFilter";
import { getCategoryByPath } from "../../../store/slices/category";
import { getCollectionCategoryByPath } from "../../../store/slices/collectionCategory";
import { removeFilterData } from "../../../store/slices/filterMemory";
import {
  getProductByCollectionId,
  getProductByCollectionIdAndCategoryId,
  getProductLoadingStatus,
  loadProductByCollectionPath,
  loadProductByCollectionPathAndCategoryPath,
} from "../../../store/slices/product";
import Loading from "../../common/LoadingComponent/Loading";
import CollectionHeader from "../../ui/CollectionComponents/CollectionHeader/CollectionHeader";
import ProductItems from "../../ui/CollectionComponents/ProductItems/ProductItems";
import { useAppDispatch } from "../../../hooks/ReduxHooks/reduxHooks";
import { IProduct } from "../../../ts/models/dataModels/IProduct";
import { ICollectionCaterory } from "../../../ts/models/dataModels/ICollectionCaterory";
import { ICategory } from "../../../ts/models/dataModels/ICategory";

const AllProductsPage: React.FC = () => {
  const { collection: collectionPath, category: categoryPath } = useParams<{
    collection: string;
    category: string;
  }>();

  const dispatch = useAppDispatch();
  const defaultLength = 8;

  // States
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [limit, setLimit] = useState(defaultLength);

  // HOC
  const ProductItemsWithProductFilter = withProductFilter(ProductItems);

  // Selectors
  const collection: ICollectionCaterory = useSelector(
    getCollectionCategoryByPath(collectionPath)
  );

  const category: ICategory = useSelector(getCategoryByPath(categoryPath));

  const dataProductsSelectorByCollectionId: IProduct[] =
    useSelector(getProductByCollectionId(collection._id, limit)) || [];

  const dataProductsSelectorByCollectionIdAndCategoryId: IProduct[] =
    useSelector(
      getProductByCollectionIdAndCategoryId(
        collection._id,
        category?._id,
        limit
      )
    ) || [];

  // Loading
  const isLoadingProducts: boolean = useSelector(getProductLoadingStatus());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collectionPath]);

  useEffect(() => {
    setLoading(true);

    if (categoryPath) {
      dispatch(
        loadProductByCollectionPathAndCategoryPath(
          collectionPath,
          categoryPath,
          collection._id,
          category._id,
          limit
        )
      );

      setProducts(dataProductsSelectorByCollectionIdAndCategoryId);
    } else {
      dispatch(
        loadProductByCollectionPath(collectionPath, collection._id, limit)
      );

      setProducts(dataProductsSelectorByCollectionId);
    }

    // eslint-disable-next-line
  }, [collectionPath, categoryPath, isLoadingProducts, limit]);

  useEffect(() => {
    setLimit(defaultLength);
    dispatch(removeFilterData());

    // eslint-disable-next-line
  }, [collectionPath, categoryPath]);

  useEffect(() => {
    if (products && !isLoadingProducts) {
      setLoading(false);
    }
  }, [products, isLoadingProducts]);

  const handleMoreProduct = (): void => {
    setLimit((prevState) => prevState + defaultLength);
  };

  return (
    <>
      <CollectionHeader
        {...{
          name: category ? category.name : collection.name,
        }}
      />

      {!isLoading ? (
        <>
          <ProductItemsWithProductFilter
            {...{
              products,
              collectionPath,
              collection,
              category,
              limit,
              handleMoreProduct,
            }}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AllProductsPage;
