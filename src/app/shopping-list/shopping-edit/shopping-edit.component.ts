import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput')
  // public nameInputRef:ElementRef;

  // @ViewChild('amountInput')
  // public amountInputRef:ElementRef;

  // @Output()
  // private ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f', {static:false})
  private form:NgForm;

  private editSubscription:Subscription;
  public editMode:boolean = false;
  private editedItemIndex:number;
  private editedItem:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService
      .startedEditing.subscribe((index:number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      });
  }

  onAddItem(form:NgForm){
    // const ingredientName = this.nameInputRef.nativeElement.value;
    // const ingredientAmount = this.amountInputRef.nativeElement.value;

    const {name, amount} = form.value;
    const newIngredient = new Ingredient(name, amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(newIngredient, this.editedItemIndex);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
    //this.ingredientAdded.emit(newIngredient);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this.editedItemIndex = -1;
    this.editedItem = null;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex, this.editedItem);
    this.onClear();
  }

  ngOnDestroy(){
    this.editSubscription.unsubscribe();
  }

}
