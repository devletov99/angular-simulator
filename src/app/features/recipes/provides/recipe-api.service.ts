import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IRecipeResponse } from '../modeles/IRecipeResponse';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from '../modeles/IRecipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  private httpClient: HttpClient = inject(HttpClient);

  private api: string = 'https://dummyjson.com';

  getRecipes(): Observable<IRecipe[]> {
    return this.httpClient.get<IRecipeResponse>(`${ this.api }/recipes`)
      .pipe(
        map((response: IRecipeResponse) => response.recipes),
      );
  }

}
