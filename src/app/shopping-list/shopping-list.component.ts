import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  shoppingListChange:Subscription

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListChange = this.shoppingListService.ingredientChanged
      .subscribe((ingredients:Ingredient[]) =>{
        this.ingredients = ingredients;
      })
  }

  ngOnDestroy():void {
    this.shoppingListChange.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

  // onIngredientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);
  // }
}
