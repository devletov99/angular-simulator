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
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductSorting } from '../../enums/productSorting';
import { ISelectOption } from '../../../../shared/interfaces/ISelectOption';
import { SortingDirection } from '../../enums/sortingProduction';
import { IProductCategory } from '../../interfaces/IProductCategory';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
 
@Component({
  selector: 'app-products',
  imports: [
    DataViewModule,
    SelectButtonModule,
    TagModule,
    ButtonModule,
    FormsModule,
    NgClass,
    CurrencyPipe,
    PaginatorModule,
    SkeletonModule,
    SearchComponent,
    SelectComponent,
    FontAwesomeModule,
    TranslatePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

  private router: Router = inject(Router);
  productService: ProductService = inject(ProductService);
  private cartService: CartService = inject(CartService);

  readonly faStar = faStar;
  readonly faHeart = faHeart;
  readonly faShoppingCart = faShoppingCart;

  readonly layout: WritableSignal<'list' | 'grid'> = signal<'list' | 'grid'>('list');
  readonly options: ('list' | 'grid')[] = ['list', 'grid'];

  readonly productsResource: ResourceRef<IProductResponse> = this.productService.productResource;

  readonly productCategories: Signal<ISelectOption[]> = computed<ISelectOption[]>(() => 
    this.productService.categories().map((category: IProductCategory) => ({
      label: category.name,
      value: category.slug,
    }))
  );

  readonly sortList: ISelectOption[] = [
    { value: ProductSorting.TITLE, label: 'PRODUCTS.SORT.TITLE' },
    { value: ProductSorting.PRICE, label: 'PRODUCTS.SORT.PRICE' },
    { value: ProductSorting.RATING, label: 'PRODUCTS.SORT.RATING' },
    { value: ProductSorting.STOCK, label: 'PRODUCTS.SORT.STOCK' },
  ];

  readonly sortDirections: ISelectOption[] = [
    { value: SortingDirection.ASCENDING, label: 'PRODUCTS.SORT_DIRECTION.ASCENDING' },
    { value: SortingDirection.DESCENDING, label: 'PRODUCTS.SORT_DIRECTION.DESCENDING' },
  ];

  onPageChange(event: PaginatorState): void {
    this.productService.pageChange(event);
  }

  onSearchProduct(value: string): void {
    this.productService.searchProduct(value);
  }

  onSortByProduct(event: string): void {
    this.productService.sortProduct(event);
  }

  onSortDirection(event: string): void {
    this.productService.sortDirectionProduct(event);
  }

  onProductCategory(event: string): void {
    this.productService.categoryProduct(event);
  }

  onProductDblClick(product: IProduct): void {
    this.router.navigate(['/products', product.id]);
  }

  addCart(productId: number): void {
    this.cartService.updateCart(productId, 1).subscribe();
  }

}
