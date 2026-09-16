export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string; 
  sku: string;
  weight: number;
  // dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  // reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  // meta: ProductMeta;
  images: string[];
  thumbnail: string;
}
