import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //@Input()
  public recipe:Recipe;
  public id:string;

  constructor(private recipeService:RecipeService, 
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.id = params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    })
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["../"], {relativeTo:this.activatedRoute});
  }

}
