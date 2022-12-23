import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe']
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
