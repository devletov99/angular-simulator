import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { initialState } from './quotes.state'
import { computed, inject } from '@angular/core'
import { IQuote } from '../models/IQuote'
import { QuoteFilter } from '../enums/QuoteFilter'
import { QuoteApiService } from '../provides/quote-api.service'
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs'
import { tapResponse } from '@ngrx/operators'
import { requestStatus } from '../../../shared/state/request-status.store'

export const QuoteStore = signalStore(
  withState(initialState),
  requestStatus,

  withComputed((store) => ({
    favoriteCount: computed(() => store.favorites().length),
    favoriteQuotes: computed(() => store.quotes().filter((quote: IQuote) => store.favorites().includes(quote.id))),
    authorCount: computed(() => {
      const allAuthors: string[] = store.quotes().map((quote: IQuote) => quote.author);

      return new Set(allAuthors).size
    }),
    quotesFilter: computed(() => {
      const quotes: IQuote[] = store.quotes();
      const filter: QuoteFilter = store.filter();
      const favorites: number[] = store.favorites();

      if (filter === QuoteFilter.FAVORITES) {
        return quotes.filter((quote: IQuote) => favorites.includes(quote.id));
      }

      return quotes
    }),
  })),

  withMethods((store, quoteApiService: QuoteApiService = inject(QuoteApiService)) => ({
    loadQuotes: rxMethod<void>(
      pipe(
        tap(() => store.setLoading()),

        switchMap(() => quoteApiService.getQuotes()
          .pipe(
            tapResponse({
              next: (quotes) => patchState(store, { quotes }),
              error: () => store.setError('Failed to load quotes'),
              finalize: () => store.setLoaded()
            })
          ))
      )
    ),

    toogleFavorite: (id: number) => {
      const favorites = store.favorites();
      const updateFavorites = favorites.includes(id) ? favorites.filter((favoriteId) => favoriteId !== id) : [...favorites, id];

      patchState(store, { favorites: updateFavorites });
    },

    setFilter(filter: QuoteFilter) {
      patchState(store, { filter })
    },

    setRandomQuote() {
      const quotes: IQuote[] = store.quotes();

      const ramdomIndex = Math.floor(Math.random() * quotes?.length);

      patchState(store, { randomQuote: quotes[ramdomIndex] });
    }
  }))
);
