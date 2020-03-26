import { Component, ViewChild, ComponentFactoryResolver, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AlertComponent } from "../shared/alert/alert.component"
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:"app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    errorMessage:string = null;
    closeSub:Subscription

    @ViewChild(PlaceholderDirective, {static: false})
    private alertHost:PlaceholderDirective

    constructor(private authService:AuthService,
        private router:Router,
        private componentFactoryResolver:ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError(){
        this.errorMessage = null;
    }

    onSubmit(authForm:NgForm){
        console.log(authForm.value);
        if(!authForm.valid){ return; }
        this.isLoading = true;
        this.errorMessage = null;

        let authObserver:Observable<AuthResponseData>;
        const {email, password} = authForm.value;
        if(this.isLoginMode){
            authObserver = this.authService.login(email, password)
        } else {
            authObserver = this.authService.signup(email, password)
        }

        authObserver.subscribe(
            responseData =>{
                this.isLoading = false;
                console.log("response ", responseData)
                this.router.navigate(["./recipes"])
            },
            errorMsg => {
                console.log('Error signing up ', errorMsg)
                this.isLoading = false;
                this.errorMessage = errorMsg;
                this.showErrorAlert(this.errorMessage);
            }
        );
       
        authForm.reset();
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(err:string){
        //const alertComp = new AlertComponent();
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        
        const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
        componentRef.instance.message = err;
        this.closeSub = componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

}