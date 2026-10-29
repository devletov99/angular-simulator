import { QuoteFilter } from '../enums/QuoteFilter';
import { IQuotesState } from '../models/IQuotesState';

export const initialState: IQuotesState = {
  quotes: [],
  favorites: [],
  filter: QuoteFilter.ALL,
  randomQuote: null,

};