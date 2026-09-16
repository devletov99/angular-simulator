import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { IProductCategory } from '../interfaces/IProductCategory';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly url: string = 'https://dummyjson.com/products';
  
  getProducts(rows: number, skip: number, search: string, sortBy: string, order: string, category: string): Observable<IProductResponse> {
    let params = new HttpParams()
      .set('limit', rows.toString())
      .set('skip', skip.toString())
      .set('select', 'thumbnail,title,category,price,rating,stock');

    if (sortBy && order) {
      params = params.set('sortBy', sortBy).set('order', order);
    }

    if (search) {
      params = params.set('q', search);
      return this.httpClient.get<IProductResponse>(`${ this.url }/search`, { params });
    }

    if (category) {
      return this.httpClient.get<IProductResponse>(`${ this.url }/category/${ category }`, { params });
    }
    
    return this.httpClient.get<IProductResponse>(`${ this.url }`, { params });
  }

  getProductsCategories(): Observable<IProductCategory[]> {
    return this.httpClient.get<IProductCategory[]>(`${ this.url }/categories`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${ this.url }/${ id }`);
  }
  

}
