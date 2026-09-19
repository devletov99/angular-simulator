import { computed, inject, Injectable, ResourceRef, signal, Signal, WritableSignal } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { IProductParams } from '../interfaces/IProductParams';
import { IProductCategory } from '../interfaces/IProductCategory';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IProductResponse } from '../interfaces/IProductResponse';
import { PaginatorState } from 'primeng/paginator';
import { SelectChangeEvent } from 'primeng/select';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly productApiService: ProductApiService = inject(ProductApiService);

  readonly productFilters = signal<IProductParams>({
    skip: 0,
    rows: 10,
    search: '',
    sortBy: '',
    sortDirection: '',
    category: ''
  });

  readonly categories: Signal<IProductCategory[]> = toSignal(
    this.productApiService.getProductsCategories(),
    { initialValue: [] }
  );

  readonly productResource: ResourceRef<IProductResponse> = rxResource({
    params: () => this.productFilters(),
    stream: ({ params }) => this.productApiService.getProducts(params),
    defaultValue: { products: [], total: 0, limit: 0, skip: 0 }
  });

  readonly skeletonArray: Signal<unknown[]> = computed<unknown[]>(() => new Array(this.productFilters().rows)); 
  readonly totalRecord: Signal<number> = computed<number>(() => this.productResource.value().total);

  getProduct(id: number): Observable<IProduct> {
    return this.productApiService.getProductById(id);
  }

  private updateFilters(patchValues: Partial<IProductParams>, resetPage: boolean): void {
    this.productFilters.update((state: IProductParams) => ({
      ...state,
      ...patchValues,
      skip: resetPage ? 0 : state.skip,
    }));
  }

  pageChange(event: PaginatorState) {
    this.updateFilters({ skip: event.first, rows: event.rows }, false);
  }

  searchProduct(value: string) {
    this.updateFilters({ search: value }, true);
  }

  sortProduct(event: string) {
    this.updateFilters({ sortBy: event }, true);
  }

  sortDirectionProduct(event: string) {
    this.updateFilters({ sortDirection: event }, true);
  }

  categoryProduct(event: string) {
    this.updateFilters({ category: event }, true);
  }

}
