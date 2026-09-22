import { ICartProduct } from './ICartProduct';

export interface ICartResponse {
  id: number;
  userId: number;
  products: ICartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}
