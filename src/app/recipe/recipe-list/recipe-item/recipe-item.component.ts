import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input()
  public recipe:Recipe = null;

  // @Output()
  // recipeSelected = new EventEmitter<void>();

  // @Input()
  // public name:string = "";

  // @Input()
  // public description:string = "";

  // @Input()
  // public imagePath:string = "";

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

  // onSelected(){
  //   //this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
