import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { definedLengthArray } from "../../../../utils/definedLengthArray";
import { getProductLength } from "../../../../store/slices/product";
import { getCollectionIdByPath } from "../../../../store/slices/collectionCategory";
import { getCategoryByIds } from "../../../../store/slices/category";
import { IProductsLength } from "../../../../ts/models/dataModels/IProductsLength";
import { returnCaterogiesWithoutCurrentCategoryId } from "../../../../utils/returnCaterogiesWithoutCurrentCategoryId";
import { ICategory } from "../../../../ts/models/dataModels/ICategory";

interface RenderCategoryLinksProps {
  categoryId: string;
  collectionPath: string;
}

const RenderCategoryLinks: React.FC<RenderCategoryLinksProps> = ({
  categoryId,
  collectionPath,
}) => {
  const productsLength: IProductsLength[] = useSelector(getProductLength());
  const collectionId: string = useSelector(
    getCollectionIdByPath(collectionPath)
  );

  const categoriesIds = returnCaterogiesWithoutCurrentCategoryId(
    categoryId,
    collectionId,
    productsLength
  );

  const definedLengthCategories = definedLengthArray(categoriesIds, 3);

  const categories: ICategory[] | undefined = useSelector(
    getCategoryByIds(definedLengthCategories)
  );

  const renderCategoryLink = (
    collectionPath: string,
    name: string,
    categoryPath: string
  ): ReactNode => {
    return (
      <Link
        to={{
          pathname: `/collection/${
            collectionPath + "/" + categoryPath
          }/products`,
        }}
      >
        {name}
      </Link>
    );
  };

  return (
    <>
      {categories &&
        categories.map((d, i, arr) =>
          i === arr.length - 1 ? (
            <span key={d._id}>
              {" and"} {renderCategoryLink(collectionPath, d.name, d.path)}
            </span>
          ) : i === arr.length - 2 ? (
            <span key={d._id}>
              {renderCategoryLink(collectionPath, d.name, d.path)}
            </span>
          ) : (
            <span key={d._id}>
              {renderCategoryLink(collectionPath, d.name, d.path)}
              {", "}
            </span>
          )
        )}
    </>
  );
};

export default RenderCategoryLinks;
