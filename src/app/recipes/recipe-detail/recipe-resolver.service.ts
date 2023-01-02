import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  constructor(
    private recipesService: RecipesService,
    private dataStorage: DataStorageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe | Observable<Recipe> | Promise<Recipe> {
    let recipe = this.recipesService.getRecipe(route.params['id']);
    if (!recipe) {
      this.dataStorage.index();
      recipe = this.recipesService.getRecipe(route.params['id']);
    }

    return recipe;
  }
}
