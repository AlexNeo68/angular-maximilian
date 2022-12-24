import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  addNewIngredient = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Картофель', 500),
    new Ingredient('Сыр', 250),
  ];

  constructor() { }

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addNewIngredient.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.addNewIngredient.next(this.ingredients.slice());
  }
}
