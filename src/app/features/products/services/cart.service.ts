import { inject, Injectable, ResourceRef } from '@angular/core';
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

  updateCart(cartId: number, productId: number, quantity: number): Observable<ICartResponse> {
    return this.cartApiService.updateCart(cartId, productId, quantity).pipe(
      tap((value: ICartResponse) => this.cartResource.set(value))
    );
  }

  removeItemCart(cartId: number, products: Pick<ICartProduct, 'id' | 'quantity'>[]): Observable<ICartResponse> {
    return this.cartApiService.deleteItem(cartId, products);
  }

}
