import { QuoteFilter } from "../enums/QuoteFilter";
import { IQuote } from "./IQuote";

export interface IQuotesState {
  quotes: IQuote[];
  favorites: number[];
  randomQuote: IQuote | null,
  filter: QuoteFilter;
}