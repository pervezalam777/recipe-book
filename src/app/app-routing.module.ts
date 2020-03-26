import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes:Routes = [
    { 
        path: '', 
        redirectTo:'/recipes', 
        pathMatch:'full' 
    },
    {
        path:'recipes',
        loadChildren:'./recipe/recipes.module#RecipesModule'
    }
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule {}