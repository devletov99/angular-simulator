import { inject, Injectable, ResourceRef, Signal } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProductResponse } from '../interfaces/IProductResponse';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { IProductParams } from '../interfaces/IProductParams';
import { IProductCategory } from '../interfaces/IProductCategory';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly productApiService: ProductApiService = inject(ProductApiService);

  readonly categories: Signal<IProductCategory[]> = toSignal(this.productApiService.getProductsCategories(), { 
    initialValue: [] 
  });

  loadProducts(paramsSignal: Signal<IProductParams>): ResourceRef<IProductResponse> {
    return rxResource({
      params: () => paramsSignal(),
      stream: ({ params }: { params: IProductParams }) => this.productApiService.getProducts(
        params.rows, 
        params.skip,
        params.search,
        params.sortBy,
        params.sortDirection,
        params.category
      ),
      defaultValue: { products: [], total: 0, limit: 0, skip: 0 }
    });
  }

  getProduct(id: number): Observable<IProduct> {
    return this.productApiService.getProductById(id);
  }

}
