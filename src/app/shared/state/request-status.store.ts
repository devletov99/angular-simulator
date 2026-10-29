import { withState, withMethods, signalStoreFeature, patchState, withComputed } from '@ngrx/signals';
import { initialState } from './request-status.state';
import { computed } from '@angular/core';

export const withLoading = signalStoreFeature(
  withState(initialState),

  withComputed(({ error }) => ({
    hasError: computed(() => error() !== null),
  })),

  withMethods((store) => ({
    showLoader(): void {
      patchState(store, { loading: true, error: null });
    },
    hideLoader(): void {
      patchState(store, { loading: false });
    },
    withError(error: string): void {
      patchState(store, { loading: false, error });
    },
  }))
);
