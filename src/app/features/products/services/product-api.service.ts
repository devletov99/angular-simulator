import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { IProductCategory } from '../interfaces/IProductCategory';
import { IProduct } from '../interfaces/IProduct';
import { IProductParams } from '../interfaces/IProductParams';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly url: string = 'https://dummyjson.com/products';
  
  private getBaseParams(requestParams: IProductParams): HttpParams {
    let httpParams = new HttpParams()
      .set('limit', requestParams.rows.toString())
      .set('skip', requestParams.skip.toString())
      .set('select', 'thumbnail,title,category,price,rating,stock');

    if (requestParams.sortBy && requestParams.sortDirection) { 
      httpParams = httpParams
        .set('sortBy', requestParams.sortBy)
        .set('order', requestParams.sortDirection);         
    }

    if (requestParams.search) {
      httpParams = httpParams.set('q', requestParams.search);
    }

    return httpParams;
  }

  private resolveEndpoint({ search, category }: IProductParams): string {
    if (search) {
      return `${ this.url }/search`;
    }
    if (category) {
      return `${ this.url }/category/${ category }`;
    }

    return this.url;
  }

  getProducts(params: IProductParams): Observable<IProductResponse> {
    const url: string = this.resolveEndpoint(params);

    const httpParams: HttpParams = this.getBaseParams(params);

    return this.httpClient.get<IProductResponse>(url, { params: httpParams });
  }

  getProductsCategories(): Observable<IProductCategory[]> {
    return this.httpClient.get<IProductCategory[]>(`${ this.url }/categories`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${ this.url }/${ id }`);
  }
  

}
