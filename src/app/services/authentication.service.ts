import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterResponseDto} from "../dto/register-response-dto";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Subject} from "rxjs";
import {Product} from "../common/product";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{

  //create role list for current user subscribable for components
  CurrentUserRoles: Subject<string | null> = new BehaviorSubject<string | null>(null);



  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }


  ngOnInit(): void {
    this.getCurrentUserRolesRequest();
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
}

interface roles {
  rolesString: string ;
}
