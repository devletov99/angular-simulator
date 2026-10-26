import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRecipeState } from "../modeles/IRecipeState";

export const selectRecipesState = createFeatureSelector<IRecipeState>('recipes');

export const selectRecipes = createSelector(selectRecipesState, (state: IRecipeState) => state.recipes);
export const selectRecipesLoading = createSelector(selectRecipesState, (state: IRecipeState) => state.loading);
export const selectRecipesError = createSelector(selectRecipesState, (state: IRecipeState) => state.error);
