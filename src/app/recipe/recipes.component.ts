import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
//import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  // public selectedRecipe:Recipe;
  // private recipeServiceSubscription:Subscription

 // constructor(private recipeService:RecipeService) { }

  constructor() { }

  ngOnInit(): void {
    // this.recipeServiceSubscription = this.recipeService.recipeSelected
    //   .subscribe((recipe:Recipe)=>{
    //     this.selectedRecipe = recipe;
    //   })
  }

  ngOnDestroy():void {
    //this.recipeServiceSubscription.unsubscribe();
  }

  // handleRecipeSelected(recipe:Recipe){
  //   this.selectedRecipe = recipe;
  // }
}
