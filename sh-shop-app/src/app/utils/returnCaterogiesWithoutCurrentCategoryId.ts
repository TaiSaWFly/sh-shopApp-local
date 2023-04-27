import { IProductsLength } from "../ts/models/dataModels/IProductsLength";
import { randomNumber } from "./randomNumber";

export function returnCaterogiesWithoutCurrentCategoryId(
  categoryId: string,
  collectionId: string,
  productsLength: IProductsLength[]
): string[] {
  const findCollection = productsLength.find((c) => c._id === collectionId);

  const cloneCollectionCaterogyArray = findCollection
    ? [...findCollection.categories]
    : [];

  const categoriesWithoutCurrentCategoryIdAndEmptyLength =
    cloneCollectionCaterogyArray.filter(
      (c) => c._id !== categoryId && c.length !== 0
    );

  const categoriesIdsArray =
    categoriesWithoutCurrentCategoryIdAndEmptyLength.map((c) => c._id);

  let mixCategoriesIds: string[] = [];
  for (let i = 0; i < categoriesIdsArray.length; i++) {
    let number = randomNumber(0, 100);
    if (number % 2 !== 0) {
      mixCategoriesIds.push(categoriesIdsArray[i]);
    } else {
      mixCategoriesIds.unshift(categoriesIdsArray[i]);
    }
  }

  return mixCategoriesIds;
}
