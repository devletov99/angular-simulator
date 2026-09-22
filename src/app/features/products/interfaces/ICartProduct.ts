export interface ICartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage?: number;
  discountedTotal?: number;
  thumbnail: string;
  specs?: string;
  size?: string;
  sizeRange?: string;
  deliveryDate?: string;
  stockLeft?: number;
  isFavorite?: boolean;
}
