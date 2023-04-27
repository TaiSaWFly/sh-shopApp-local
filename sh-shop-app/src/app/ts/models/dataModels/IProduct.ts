export interface IProduct {
  _id: string;
  imgUrl: string;
  otherImg: OtherImgType[];
  name: string;
  prices?: PricesType;
  articleNumber: string;
  rate?: number;
  numberOfSales?: number;
  collectionId: string;
  categoryId?: string;
  sizes: string[];
  colors: string[];
  description: string;
  newArrivals?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type OtherImgType = {
  imgUrl: string;
};

export type PricesType = {
  price: string;
  newPrice: string;
};
