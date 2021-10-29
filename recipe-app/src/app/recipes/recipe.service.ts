import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("A Test Recipe",
         "This is simply a test",
          "https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg",
          [
              new Ingredient('Meat', 1),
              new Ingredient('Lettuce', 3)
          ]),
        new Recipe("Another Test Recipe",
         "This is simply another test",
          "https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg",
          [
              new Ingredient('Bread', 4),
              new Ingredient('Kale', 7)
          ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

}