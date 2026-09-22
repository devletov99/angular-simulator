import { computed, inject, Injectable, ResourceRef, Signal } from '@angular/core';
import { CartApiService } from './cart-api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from '../../../core/services/user.service';
import { ICartProduct } from '../interfaces/ICartProduct';
import { Observable, tap } from 'rxjs';
import { ICartResponse } from '../interfaces/ICartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartApiService: CartApiService = inject(CartApiService);
  private userService: UserService = inject(UserService);


  readonly TAX_RATE: number = 0.2;

  cartResource: ResourceRef<ICartResponse> = rxResource({
    params: () => this.userService.userState()?.id,
    stream: ({ params: id }) => {
      return this.cartApiService.getCart(id);
    },
    defaultValue: {
      id: 0,
      userId: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      totalProducts: 0,
      totalQuantity: 0,
    }
  });

  cart: Signal<ICartResponse> = computed(() => this.cartResource.value());

  readonly subtotal: Signal<number> = computed<number>(() => { 
    const products: ICartProduct[] = this.cart().products;

    return products.reduce((acc: number, item: ICartProduct) => acc +  item.total, 0);
  });

  readonly discountedSubtotal: Signal<number> = computed<number>(() => {
    const products = this.cart().products;
    return products.reduce((acc: number, item: ICartProduct) => acc + (item.discountedTotal ?? item.total), 0);
  });

  readonly discount: Signal<number> = computed(() => this.subtotal() - this.discountedSubtotal());

  readonly tax: Signal<number> = computed<number>(() => this.discountedSubtotal() * this.TAX_RATE);

  readonly total: Signal<number> = computed<number>(() => this.subtotal() - this.discount() + this.tax());


  updateCart(productId: number, quantity: number): Observable<ICartResponse> {
    return this.cartApiService.updateCart(this.cart().id, productId, quantity).pipe(
      tap((value: ICartResponse) => this.cartResource.set(value))
    );
  }

  increaseQuantity(product: ICartProduct): Observable<ICartResponse> {
    return this.updateCart(product.id, product.quantity + 1);
  }

  decreaseQuantity(product: ICartProduct): Observable<ICartResponse> | null {
    if (product.quantity > 1) {
      return this.updateCart(product.id, product.quantity - 1);
    }
    return null;
  }

  removeProduct(productId: number): Observable<ICartResponse> {
    const remainingProducts: Pick<ICartProduct, 'id' | 'quantity'>[] = this.cart().products
      .filter((item: ICartProduct) => item.id !== productId)
      .map((item: ICartProduct) => ({
        id: item.id,
        quantity: item.quantity,
      }));

    return this.cartApiService.deleteItem(this.cart().id, remainingProducts).pipe(
      tap((value: ICartResponse) => this.cartResource.set(value))
    );
  }

}
