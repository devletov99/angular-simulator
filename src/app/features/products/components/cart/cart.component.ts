import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMinus,
  faPlus,
  faTrash,
  faShoppingCart,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { ICartProduct } from '../../interfaces/ICartProduct';
import { ICartResponse } from '../../interfaces/ICartResponse';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {

  cartService: CartService = inject(CartService);

  readonly faMinus = faMinus;
  readonly faPlus = faPlus;
  readonly faTrash = faTrash;
  readonly faShoppingCart = faShoppingCart;
  readonly faShield = faShield;

  readonly cart: Signal<ICartResponse> = computed<ICartResponse>(() => this.cartService.cartResource.value());

  removeProduct(product: ICartProduct): void {
    this.cartService.removeProduct(product.id).subscribe();
  }

  decreaseQuantity(product: ICartProduct): void {
    this.cartService.decreaseQuantity(product)?.subscribe();
  }

  incrementQuantity(product: ICartProduct): void {
    this.cartService.increaseQuantity(product).subscribe();
  }

}
