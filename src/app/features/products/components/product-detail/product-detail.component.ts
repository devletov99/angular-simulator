import { Component, inject, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { IProduct } from '../../interfaces/IProduct';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBox,
  faCheck,
  faChevronRight,
  faChevronUp,
  faHeart,
  faShield,
  faShoppingCart,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';

import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  imports: [GalleriaModule, RatingModule, FormsModule, FontAwesomeModule, DecimalPipe, TranslatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  readonly faChevronRight = faChevronRight;
  readonly faCheck = faCheck;
  readonly faShoppingCart = faShoppingCart;
  readonly faHeart = faHeart;
  readonly faChevronUp = faChevronUp;
  readonly faBox = faBox;
  readonly faShield = faShield;
  readonly faTruck = faTruck;

  product!: IProduct;

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }

}
