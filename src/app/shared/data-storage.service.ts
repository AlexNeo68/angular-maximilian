import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
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
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipes(recipes);
        },
        (error) => console.log(error.message)
      );
    // this.http
    //   .get<Recipe[]>(
    //     'https://recipes-84d49-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
    //   )
    //   .pipe(
    //     map((recipes) => {
    //       return recipes.map((recipe) => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : [],
    //         };
    //       });
    //     })
    //   )
    //   .subscribe(
    //     (recipes) => {
    //       this.recipeService.setRecipes(recipes);
    //     },
    //     (error) => console.log(error.message)
    //   );
  }
}
