import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Картофельная запеканка с курицей и помидорами',
  //     'Эта сытная запеканка станет не только идеальным вариантом для семейного обеда или ужина, но и отлично подойдёт для праздничного стола.',
  //     'https://img1.russianfood.com/dycontent/images_upl/564/sm_563820.jpg',
  //     [new Ingredient('Сыр', 300), new Ingredient('Масло', 50)]
  //   ),
  //   new Recipe(
  //     'Сосиски с сыром в лаваше (в духовке)',
  //     'Лёгкий и быстрый вариант популярных сосисок в тесте. Внутри - аппетитная сосиска, которую обволакивает расплавленный сыр, а сверху - чуть хрустящий лаваш, посыпанный семенами кунжута.',
  //     'https://img1.russianfood.com/dycontent/images_upl/562/sm_561306.jpg',
  //     [new Ingredient('Петрушка', 100), new Ingredient('Лён', 150)]
  //   ),
  //   new Recipe(
  //     'Куриное филе с грибами, запечённое в сметанно-сырном соусе',
  //     'Запечённая курица с грибами в сметанно-сырном соусе — удачный способ превратить довольно пресную и суховатую куриную грудку в достойное блюдо. Шампиньоны и сыр придают текстуру и вкус, а сметана — сочность.',
  //     'https://img1.russianfood.com/dycontent/images_upl/628/sm_627437.jpg',
  //     [new Ingredient('Фетача', 70), new Ingredient('Мёд', 150)]
  //   ),
  // ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find((r) => r.id === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(
      new Recipe(
        recipe.name,
        recipe.description,
        recipe.imagePath,
        recipe.ingredients
      )
    );
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: string, recipe: Recipe) {
    const recipeIndex = this.recipes.findIndex((r) => r.id === id);
    if (recipeIndex !== -1) {
      recipe.id = id;
      this.recipes[recipeIndex] = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
