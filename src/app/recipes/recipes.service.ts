import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Картофельная запеканка с курицей и помидорами',
      'Эта сытная запеканка станет не только идеальным вариантом для семейного обеда или ужина, но и отлично подойдёт для праздничного стола.',
      'https://img1.russianfood.com/dycontent/images_upl/564/sm_563820.jpg'
    ),
    new Recipe(
      'Сосиски с сыром в лаваше (в духовке)',
      'Лёгкий и быстрый вариант популярных сосисок в тесте. Внутри - аппетитная сосиска, которую обволакивает расплавленный сыр, а сверху - чуть хрустящий лаваш, посыпанный семенами кунжута.',
      'https://img1.russianfood.com/dycontent/images_upl/562/sm_561306.jpg'
    ),
    new Recipe(
      'Куриное филе с грибами, запечённое в сметанно-сырном соусе',
      'Запечённая курица с грибами в сметанно-сырном соусе — удачный способ превратить довольно пресную и суховатую куриную грудку в достойное блюдо. Шампиньоны и сыр придают текстуру и вкус, а сметана — сочность.',
      'https://img1.russianfood.com/dycontent/images_upl/628/sm_627437.jpg'
    ),
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }
}
