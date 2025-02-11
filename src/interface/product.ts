interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export default IProduct;
export type ProductInput = Omit<
  IProduct,
  "id" | "stock" | "discountPercentage" | "rating" | "brand"
>;
