export interface IProduct {
  _id: string;
  imgUrl: string;
  otherImg: OtherImg[];
  name: string;
  prices?: Prices;
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

export interface OtherImg {
  imgUrl: string;
}

export interface Prices {
  price: string;
  newPrice: string;
}
