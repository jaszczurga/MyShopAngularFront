import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  //login user
  loginUser(email: string, password: string) {
    this.authenticationService.loginUser(email, password).subscribe(
      data => {
        console.log('loginUser=' + JSON.stringify(data));
        //save token to the cookie
        this.cookieService.set('jwtToken', data.token, {secure: true, sameSite: 'Strict'});
        console.log('jwtToken=' + this.cookieService.get('jwtToken'));
        //redirect to main page
        this.authenticationService.getCurrentUserRolesRequest();
        this.router.navigate(['/']);
      }
    );
  }

}
