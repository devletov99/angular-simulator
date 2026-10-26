import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRecipe } from '../modeles/IRecipe';
import { selectRecipes, selectRecipesLoading, selectRecipesError } from '../state/recipes.selectors';
import { recipeActions } from '../state/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private store: Store = inject(Store);

  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  isLoading$: Observable<boolean> = this.store.select(selectRecipesLoading);
  error$: Observable<string | null> = this.store.select(selectRecipesError);

  loadRecipes(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }

}
