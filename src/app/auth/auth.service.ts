import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import {throwError, BehaviorSubject} from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";
import {environment} from "../../environments/environment"

export interface AuthResponseData {
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
    expirationDate?:Date | string;
}

const AUTH_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
const API_KEY = environment.firebaseAPIkey; 
const SIGNUP_URL = AUTH_URL+ "/signupNewUser?key="+API_KEY;
const LOGIN_URL = AUTH_URL + "/verifyPassword?key="+API_KEY;


@Injectable({
    providedIn:"root"
})
export class AuthService {
    userSubject = new BehaviorSubject<User>(null);
    logoutTimeout = null;

    constructor(private httpClient:HttpClient,
        private router:Router){

        }

    signup(email:string, password:string){
        return this.authenticate(email, password, SIGNUP_URL);
    }

    login(email:string, password:string) {
        return this.authenticate(email, password, LOGIN_URL);
    }

    logout(){
        this.userSubject.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem('userData')
        if(this.logoutTimeout){
            clearTimeout(this.logoutTimeout)
        }
    }

    autoLogout(expirationDate:Date){
        let duration:number = expirationDate.getTime() - new Date().getTime();
        this.logoutTimeout = setTimeout(()=>{
           this.logout(); 
        }, duration)
    }

    autoLogin(){
        const userData = localStorage.getItem('userData');
        if(!userData){
            return;
        } else {
            this.processUserData(JSON.parse(userData));
        }
    }

    private authenticate(email:string, password:string, url){
        return this.httpClient.post<AuthResponseData>(
            url,
            {
                email:email,
                password:password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication)
        );
    }

    private handleAuthentication = (response:AuthResponseData) => {
        const expiresIn:number =  (+response.expiresIn*1000);
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        response.expirationDate = expirationDate;

        this.processUserData(response);
        localStorage.setItem('userData', JSON.stringify(response));
    }

    private processUserData(response:AuthResponseData){
        let expirationDate = response.expirationDate;
        if(typeof expirationDate === 'string'){
            expirationDate = new Date(expirationDate);
        }
        const user = new User(
            response.email,
            response.localId, 
            response.idToken, 
            <Date>expirationDate
        );
        if(user.token){
            this.userSubject.next(user);
            this.autoLogout(user.tokenExpirationDate);
        }
    }

    private handleError(errorResponse:HttpErrorResponse) {
        let errorMessage = "Unknown error occurred!";
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage)
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = "Email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
                errorMessage = "Invalid login credential";
                break;
            default:
                errorMessage = "Unknown error: "+errorResponse.error.error.message;
        }
        return throwError(errorMessage);
    }
}