import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipesService } from "../recipes.service";


@Injectable()

export class RecipeResolver implements Resolve<Recipe> {

  constructor(private recipesService: RecipesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
    return this.recipesService.getRecipe(route.params['id'])
  }

}
