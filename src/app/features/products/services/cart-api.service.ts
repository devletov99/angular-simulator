import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartProduct } from '../interfaces/ICartProduct';
import { ICartResponse } from '../interfaces/ICartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {

  private httpClient: HttpClient = inject(HttpClient);

  private readonly url: string = 'https://dummyjson.com/carts';

  getCart(id: number): Observable<ICartResponse> {
    return this.httpClient.get<ICartResponse>(`${ this.url }/${ id }`);
  }

  addCart(userId: number, products: Pick<ICartProduct, 'id' | 'quantity'>[]): Observable<ICartResponse> {
    return this.httpClient.post<ICartResponse>(`${ this.url }/${ userId }`, {
      products
    });
  }

  updateCart(cartId: number, productId: number, quantity: number): Observable<ICartResponse> {
    return this.httpClient.put<ICartResponse>(`${ this.url }/${ cartId }`, {
      merge: true,
      products: [{
        id: productId,
        quantity: quantity
      }],
    });
  }

  deleteItem(cartId: number, products: Pick<ICartProduct, 'id' | 'quantity'>[]): Observable<ICartResponse> {
    return this.httpClient.put<ICartResponse>(`${ this.url }/${ cartId }`, {
      merge: false,
      products: products
    });
  }

  deleteCart(cartId: number): Observable<ICartResponse> {
    return this.httpClient.delete<ICartResponse>(`${ this.url }/${ cartId }`);
  }
 
}
