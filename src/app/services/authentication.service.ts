import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterResponseDto} from "../dto/register-response-dto";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }

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
    return this.httpClient.post<RegisterResponseDto>("http://localhost:8080/api/v1/auth/authenticate", loginRequestDto);
  }

  //logout user from the backend
  logoutUser() {
    //remove the token from the cookie
    this.cookieService.delete('jwtToken');
  }

}
