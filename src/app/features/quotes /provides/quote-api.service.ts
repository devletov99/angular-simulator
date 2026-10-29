import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IQuote } from '../models/IQuote';
import { IQuoteResponse } from '../models/IQuoteResponse';

@Injectable({
  providedIn: 'root',
})
export class QuoteApiService {

  http: HttpClient = inject(HttpClient);

  api: string = 'https://dummyjson.com/quotes'

  getQuotes(): Observable<IQuote[]> {
    return this.http.get<IQuoteResponse>(this.api)
      .pipe(
        map((response: IQuoteResponse) => response.quotes)
      )
  }
}
