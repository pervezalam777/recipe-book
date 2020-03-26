import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from "../recipe/recipe.model";
import { map, tap} from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    
    constructor(private httpClient:HttpClient,
        private recipeService:RecipeService,
        private authService:AuthService){}

    public storeRecipe(){
        const recipes:Recipe[] = this.recipeService.getRecipes();
        this.httpClient
            .put("https://ng-recipe-book-88dfc.firebaseio.com/recipes.json", recipes)
            .subscribe((response) => {
                console.log(response);
            })
    }

    fetchRecipes() {
        return this.httpClient
            .get<Recipe[]>("https://ng-recipe-book-88dfc.firebaseio.com/recipes.json")
            .pipe(
                map((recipes:Recipe[]) => {
                    return recipes.map((recipe:Recipe) => {
                        let ingredients = recipe.ingredients ? recipe.ingredients : [];
                        return {...recipe, ingredients: ingredients}
                    })
                }), 
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }  
}