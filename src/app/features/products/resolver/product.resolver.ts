import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/IProduct';

export const productResolver: ResolveFn<IProduct> = (route: ActivatedRouteSnapshot) => {
  const productService: ProductService = inject(ProductService);
  return productService.getProduct(Number(route.paramMap.get('id')));
};
