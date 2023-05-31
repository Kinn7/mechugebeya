export interface CreateProductInterface {
  name: string;
  price: number;
  expiry_date: Date;
  quantity: number;
  image: string;
  category: number;
}

export interface AddCategoryInterface {
  name: string;
}
