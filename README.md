# Project One
This project will have shopping list and adding ingredient.

## To run project
1) You need to add firebase API key in environment files.

## Features
Shoppiing list and Recipe Book


## TODO 
1) Advance preloading concept while loading some module right away and some with delay and not preloading at all [medium link](https://medium.com/@adrianfaciu/custom-preloading-strategy-for-angular-modules-b3b5c873681a)

```javascript
export const routes: Routes = [
    { path: '', redirectTo: 'items', pathMatch: 'full' },
    {
        path: 'items',
        loadChildren: 'app/+items/items.module#ItemsModule',
        data: { preload: true, delay: false },
    },
    {
        path: 'item',
        loadChildren: 'app/+item-details/item-details.module#ItemDetailsModule',
        data: { preload: true, delay: true },
    },
    {
        path: 'admin',
        loadChildren: 'app/+admin/admin.module#AdminModule',
        data: { preload: false, delay: true },
    },
];

export class AppPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        const loadRoute = (delay) => delay
            ? timer(150).pipe(flatMap(_ => load()))
            : load();
        return route.data && route.data.preload 
            ? loadRoute(route.data.delay)
            : of(null);
      }
}

RouterModule.forRoot(routes, { 
   preloadingStrategy: AppPreloadingStrategy
})
```




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
