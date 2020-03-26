import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private id:string;
  private editMode = false;
  public recipeForm:FormGroup;
  private amountRegex = /^[1-9]\d*$/;

  constructor(private activatedRoute:ActivatedRoute, 
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params:Params) => {
        this.id = params['id'] || null;
        this.editMode = this.id !== null;
        this.initForm();
      });
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let description = '';
    let recipeIngredients:FormArray = new FormArray([]); 

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients){
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, 
                Validators.pattern(this.amountRegex)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onSubmit(){
    //console.log("submit ",this.recipeForm)
    const {name, description, imagePath, ingredients} = this.recipeForm.value;
    const newRecipe:Recipe = new Recipe(
      new Date().getTime().toString(), name, description, imagePath, ingredients  
    );
    if(this.editMode){
      newRecipe.id = this.id;
      this.recipeService.updateRecipe(this.id, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(["../"], {relativeTo:this.activatedRoute});
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onRemoveIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);  
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients'))
      .push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, 
          Validators.pattern(this.amountRegex)
        ])
      }))
  }

}
