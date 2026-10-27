import { IRecipeState } from "./features/recipes/modeles/IRecipeState";

export interface IAppStore {
  recipes: IRecipeState;
}