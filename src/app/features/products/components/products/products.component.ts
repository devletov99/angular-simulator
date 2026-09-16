import { ChangeDetectionStrategy, Component, computed, inject, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { IProductResponse } from '../../interfaces/IProductResponse';
import { CurrencyPipe, NgClass } from '@angular/common';
import 'primeicons/primeicons.css';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { SearchComponent } from '../search/search.component';
import { IProductParams } from '../../interfaces/IProductParams';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { productSorting } from '../../enums/productSorting';
import { ISelectOption } from '../../../../shared/interfaces/ISelectOption';
import { SelectChangeEvent } from 'primeng/select';
import { sortingDirection } from '../../enums/sortingProduction';
import { IProductCategory } from '../../interfaces/IProductCategory';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../services/cart.service';
 
@Component({
  selector: 'app-products',
  imports: [DataViewModule, SelectButtonModule, TagModule, ButtonModule, FormsModule, NgClass, CurrencyPipe, PaginatorModule, SkeletonModule, SearchComponent, SelectComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

  private readonly router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  readonly skip: WritableSignal<number> = signal<number>(0);
  readonly rows: WritableSignal<number> = signal<number>(10);
  readonly searchQuery: WritableSignal<string> = signal<string>('');
  readonly sortByProduct: WritableSignal<string> = signal<string>('');
  readonly sortDirection: WritableSignal<string> = signal<string>('');
  readonly category: WritableSignal<string> = signal<string>('');

  readonly skeletonArray: Signal<unknown[]> = computed<unknown[]>(() => new Array(this.rows())); 
  readonly totalRecord: Signal<number> = computed<number>(() => this.productsResource.value().total);

  readonly layout: ('list' | 'grid') = <'list' | 'grid'>('list');
  readonly options: ('list' | 'grid')[] = ['list', 'grid'];

  readonly requestParams: Signal<IProductParams> = computed<IProductParams>(() => ({
    skip: this.skip(),
    rows: this.rows(),
    search: this.searchQuery(),
    sortBy: this.sortByProduct(),
    sortDirection: this.sortDirection(),
    category: this.category()
  }));

  readonly productsResource: ResourceRef<IProductResponse> = this.productService.loadProducts(this.requestParams);

  readonly categoriesProducts: Signal<ISelectOption[]> = computed<ISelectOption[]>(() => 
    this.productService.categories().map((category: IProductCategory) => ({
      label: category.name,
      value: category.slug,
    }))
  );

  readonly sortList: ISelectOption[] = [
    { value: productSorting.TITLE, label: 'По названию' },
    { value: productSorting.PRICE, label: 'По цене' },
    { value: productSorting.RATING, label: 'По рейтингу' },
    { value: productSorting.STOCK, label: 'По наличию' },
  ];

  readonly sortDirections: ISelectOption[] = [
    { value: sortingDirection.ASCENDING, label: 'По возврастанию' },
    { value: sortingDirection.DESCENDING, label: 'По убыванию' }
  ];

  onPageChange(event: PaginatorState): void {
    this.skip.set(event.first ?? 0);
    this.rows.set(event.rows ?? 10);
  }

  onSearchProduct(value: string): void {
    this.searchQuery.set(value);
    this.skip.set(0);
  }

  onSortByProduct(event: SelectChangeEvent): void {
    this.sortByProduct.set((event.value ?? '') as string);
    this.skip.set(0);
  }

  onSortDirection(event: SelectChangeEvent): void {
    this.sortDirection.set(event?.value);
    this.skip.set(0);
  }

  onProductCategory(event: SelectChangeEvent): void {
    this.category.set(event?.value);
  }

  onProductDblClick(product: IProduct): void {
    this.router.navigate(['/products', product.id]);
  }

  addCart(productId: number): void {
    this.cartService.updateCart(this.cartService.cartResource.value().id, productId, 1).subscribe();
  }

}
