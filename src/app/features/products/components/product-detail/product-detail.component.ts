import { Component, inject, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { IProduct } from '../../interfaces/IProduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [GalleriaModule, RatingModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  product!: IProduct;

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }

}
