import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn:'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes:Recipe[] = [];
  
  // private recipes:Recipe[] = [
  //   new Recipe("1","steak Recipe", "This is simply a test of recipe", 
  //     "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg", 
  //     [
  //       new Ingredient("Meat", 1),
  //       new Ingredient("Bread", 1)
  //     ]),
  //   new Recipe("2","Chicken Recipe", "This is simply a test of recipe", 
  //     "https://upload.wikimedia.org/wikipedia/commons/f/f5/Handi-chicken-recipe.jpg", 
  //     [
  //       new Ingredient("Meat", 2),
  //       new Ingredient("French fries", 20)
  //     ])
  // ];

  constructor(private shoppingListService:ShoppingListService){}

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  getRecipes():Recipe[]{
    return [...this.recipes];
    //or
    // return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredient:Ingredient[]){
    this.shoppingListService.addIngredients(ingredient); 
  }

  getRecipeById(id:string){
    for(let recipe of this.recipes){
      if(recipe.id === id){
        return recipe;
      }
    }
    return null;
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(id:string, updatedRecipe:Recipe):boolean {
    for (let index = 0; index < this.recipes.length; index++) {
      const recipe = this.recipes[index];
      if(recipe.id === id){
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.getRecipes());
        return true;
      }
    }
    return false;
  }

  deleteRecipe(id:string):boolean{
    for (let index = 0; index < this.recipes.length; index++) {
      const recipe = this.recipes[index];
      if(recipe.id === id){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
        return true;
      }
    }
    return false;
  }
}
