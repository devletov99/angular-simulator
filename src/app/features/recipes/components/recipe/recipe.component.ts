import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IRecipe } from '../../modeles/IRecipe';
import { RecipeService } from '../../provides/recipe.service';

@Component({
  selector: 'app-recipe',
  imports: [AsyncPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {

  private recipeService: RecipeService = inject(RecipeService);

  recipes$: Observable<IRecipe[]> = this.recipeService.recipes$;
  isLoading$: Observable<boolean> = this.recipeService.isLoading$;
  error$: Observable<string | null> = this.recipeService.error$;

  ngOnInit(): void {
    this.recipeService.loadRecipes();
  }

  reloadRecipes(): void {
    this.recipeService.loadRecipes();
  }

}
