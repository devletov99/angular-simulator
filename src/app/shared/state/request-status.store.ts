import { withState, withMethods, signalStoreFeature, patchState, withComputed } from "@ngrx/signals";
import { initialState } from "./request-status.state";
import { computed } from "@angular/core";

export const requestStatus = signalStoreFeature (
  withState(initialState),

  withComputed(({ error }) => ({
    hasError: computed(() => error() !== null)
  })),

  withMethods((store) => ({
    setLoading(): void {
      patchState(store, { loading: true, error: null})
    },
    setLoaded(): void {
      patchState(store, { loading: false })
    },
    setError(error: string): void {
      patchState(store, { loading: false, error })
    }
  }))
)
