import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingredients: [
    new Ingredient('Картофель', 500),
    new Ingredient('Сыр', 250),
  ],
  ingredientEdit: null,
  ingredientEditIndex: -1
}

export const shoppingListReducer = (
  state = initialState,
  action: ShoppingListActions.ShoppingListActions) => {

  switch (action.type) {

    case ShoppingListActions.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] }
    case ShoppingListActions.ADD_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, ...action.payload] }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const newIngredient = { ...action.payload.ingredient }
      const ingredient = { ...state.ingredients[action.payload.index] }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = { ...ingredient, ...newIngredient };
      return { ...state, ingredients: updatedIngredients }

    case ShoppingListActions.DELETE_INGREDIENT:
      return { ...state, ingredients: state.ingredients.filter((ing, index) => index !== action.payload) }
    default:
      return state;
  }
}
