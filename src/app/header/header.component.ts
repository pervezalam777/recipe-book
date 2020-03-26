import {Component, EventEmitter, Output, OnInit, OnDestroy} from "@angular/core"
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"

})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated:boolean = false; 
    private authServiceSubscription:Subscription;

    constructor(private dataStoreService:DataStorageService,
        private authService:AuthService){}

    ngOnInit(){
        this.authServiceSubscription = this.authService.userSubject
            .subscribe((user:User) => {
                this.isAuthenticated = !!user;
            })
    }

    onSaveData(){
        this.dataStoreService.storeRecipe();
    }

    onFetchData(){
        this.dataStoreService
            .fetchRecipes()
            .subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authServiceSubscription.unsubscribe();
    }
}