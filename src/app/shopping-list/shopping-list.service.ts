import { Ingredient } from "../shared/Ingredient.model";
//import { EventEmitter } from "@angular/core";
import {Subject} from 'rxjs'

export class ShoppingListService {

    ingredients:Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    ingredientChanged = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();

    public getIngredients():Ingredient[] {
        return [...this.ingredients];
        //return this.ingredients.slice();
    }

    public addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.getIngredients());
    }

    public updateIngredient(ingredient:Ingredient, index:number){
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.getIngredients());
    }

    public addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.getIngredients());
    }

    public getIngredient(index:number):Ingredient {
        return this.ingredients[index];
    }

    public deleteIngredient(editedItemIndex: number, editedItem: Ingredient) {
        this.ingredients.splice(editedItemIndex, 1);
        this.ingredientChanged.next(this.getIngredients());
    }
}