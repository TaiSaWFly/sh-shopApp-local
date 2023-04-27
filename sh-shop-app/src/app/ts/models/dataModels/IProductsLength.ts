export interface IProductsLength {
  _id: string;
  allProductslength: number;
  currentLength: number;
  categories: CategoryLength[];
}

interface CategoryLength {
  _id: string;
  length: number;
}
