import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ICartProduct } from '../../interfaces/ICartProduct';
import 'primeicons/primeicons.css';
import { UserService } from '../../../../core/services/user.service';
import { ICartResponse } from '../../interfaces/ICartResponse';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {

  cartService = inject(CartService);
  private userSevice = inject(UserService);

  readonly TAX_RATE: number = 0.2;

  readonly cart: Signal<ICartResponse> = computed<ICartResponse>(() => this.cartService.cartResource.value());

  readonly subtotal: Signal<number> = computed<number>(() => { 
    const products: ICartProduct[] = this.cart().products;

    return products.reduce((acc: number, item: ICartProduct) => acc + (item.discountedTotal ?? item.total), 0);
  });

  readonly tax: Signal<number> = computed<number>(() => this.subtotal() * this.TAX_RATE);

  readonly total: Signal<number> = computed<number>(() => this.tax() + this.subtotal());

  removeProduct(product: ICartProduct): void {
    const remainingProducts: Pick<ICartProduct, 'id' | 'quantity'>[] = this.cart().products
      .filter((item: ICartProduct) => item.id !== product.id)
      .map((item: ICartProduct) => ({
        id: item.id,
        quantity: item.quantity,
      }));

    this.cartService.removeItemCart(this.cart().id, remainingProducts).subscribe();
  }

  decreaseQuantity(product: ICartProduct): void {
    const productQuantity: number = product.quantity - 1;

    if (product.quantity > 1) {
      this.cartService.updateCart(
        this.cart().id, product.id, productQuantity
      ).subscribe();
    }
  }

  incrementQuantity(product: ICartProduct): void {
    const productQuantity: number = product.quantity + 1;

    this.cartService.updateCart(
      this.cart().id, product.id, productQuantity
    ).subscribe();
  }

}
