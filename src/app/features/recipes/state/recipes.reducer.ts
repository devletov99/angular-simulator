import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { initialRecipesState } from "./recipes.state";
import { recipeActions } from "./recipes.actions";
import { IRecipeState } from "../modeles/IRecipeState";

export const recipesReducer: ActionReducer<IRecipeState, Action<string>> = createReducer(
  initialRecipesState,
  on(recipeActions.loadRecipes, (state: IRecipeState) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(recipeActions.loadRecipesSuccess, (state: IRecipeState, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
    error: null
  })),
  on(recipeActions.loadRecipesFailure, (state: IRecipeState, { error }) => ({
    ...state,
    error,
    loading: false,
  }))

)