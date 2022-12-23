import { Ingredient } from '../shared/ingredient.model';
import { v4 as uuidv4 } from 'uuid'

export class Recipe {
  id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.id = uuidv4()
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
