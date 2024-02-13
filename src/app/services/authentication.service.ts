import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.post("http://localhost:8080/api/v1/auth/register", registerRequestDto);
  }



}
