import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}
  store() {
    this.http
      .put(
        'https://recipes-84d49-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        this.recipeService.getRecipes()
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
  index() {
    this.http
      .get<Recipe[]>(
        'https://recipes-84d49-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
