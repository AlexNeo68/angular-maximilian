import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT, ShoppingListAction } from "./shopping-list.action";

const initialState = {
  ingredients: [
    new Ingredient('Картофель', 500),
    new Ingredient('Сыр', 250),
  ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListAction) {
  switch (action.type) {

    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] }

    default:
      return state;
  }
}
