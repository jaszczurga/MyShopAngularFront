import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterResponseDto} from "../dto/register-response-dto";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Subject} from "rxjs";
import {Product} from "../common/product";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  //create role list for current user subscribable for components
  CurrentUserRoles: Subject<string | null> = new BehaviorSubject<string | null>(null);
  CurrentUserId: Subject<string> = new BehaviorSubject<string>("2");



  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              private jwtHelper: JwtHelperService) {
    this.getCurrentUserRolesRequest();
    this.getCurrentUserId();
  }

  decodeJwtToken() {

    if(this.getJwtToken()==null){
      return null;
    }

    const token = this.getJwtToken();
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }


  //register new user to the backend

  registerNewUser(username: string, email: string, password: string, confirmPassword: string) {
    //dto of the register request
    const registerRequestDto = {
      firstName: username,
      lastName: username,
      email: email,
      password: password
    };

    console.log('registerRequestDto=' + JSON.stringify(registerRequestDto));
    //send the request to the backend
    return this.httpClient.post<RegisterResponseDto>("http://localhost:8080/api/v1/auth/register", registerRequestDto);
  }

  //login user to the backend
  loginUser(email: string, password: string) {
    //dto of the login request
    const loginRequestDto = {
      email: email,
      password: password
    };

    console.log('loginRequestDto=' + JSON.stringify(loginRequestDto));
    //send the request to the backend
    let res =  this.httpClient.post<RegisterResponseDto>("http://localhost:8080/api/v1/auth/authenticate", loginRequestDto);
    return res;
  }

  //logout user from the backend
  logoutUser() {
    //remove the token from the cookie
    this.cookieService.delete('jwtToken');
  }

  //get current user roles
  getCurrentUserRolesRequest() {
    //send the request to the backend
    let respone = this.httpClient.get<roles>("http://localhost:8080/api/v1/auth/roles");
    respone.subscribe(data => {
      this.CurrentUserRoles.next(data.rolesString);
    });
  }

  //get current user id
  getCurrentUserId(){
    //send the request to the backend
    let respone = this.httpClient.get<{"id":number}>("http://localhost:8080/api/v1/auth/currentUserId");
    respone.subscribe(data => {
      this.CurrentUserId.next(data.id.toString());
    });

  }


  isLoggedIn() {
    if(this.cookieService.get('jwtToken') !== '' && !this.jwtHelper.isTokenExpired(this.cookieService.get('jwtToken'))){
      return true;
    }else {
      this.cookieService.delete('jwtToken');
      return false;
    }
  }

  //get jwt token
  getJwtToken() {
    return this.cookieService.get('jwtToken');
  }


}

interface roles {
  rolesString: string ;
}
