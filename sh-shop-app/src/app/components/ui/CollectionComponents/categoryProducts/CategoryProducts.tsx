import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCollectionIdByPath } from "../../../../store/slices/collectionCategory";
import { getProductByCollectionIdAndCategoryId } from "../../../../store/slices/product";
import ProductItems from "../ProductItems/ProductItems";
import style from "./categoryProducts.module.scss";
import { ICategory } from "../../../../ts/models/dataModels/ICategory";
import { IProduct } from "../../../../ts/models/dataModels/IProduct";

interface CategoryProductsProps {
  category: ICategory;
  collectionPath: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  category,
  collectionPath,
}) => {
  const collectionId: string = useSelector(
    getCollectionIdByPath(collectionPath)
  );
  const products: IProduct[] =
    useSelector(
      getProductByCollectionIdAndCategoryId(collectionId, category._id, 4)
    ) || [];

  return (
    <>
      {products.length !== 0 && (
        <div className={style.category_products__wrapper}>
          <div className={style.category_products__info}>
            <div className={style.category_products__info_title}>
              {category.name}
            </div>
            <div className={style.category_products__info_show_more}>
              <Link
                to={{
                  pathname: `/collection/${
                    collectionPath + "/" + category.path
                  }/products`,
                }}
              >
                show more
              </Link>
            </div>
          </div>

          <ProductItems productsItems={products} />
        </div>
      )}
    </>
  );
};

export default CategoryProducts;
