import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  //register new user
  registerNewUser(username: string, email: string, password: string, confirmPassword: string) {
    this.authenticationService.registerNewUser(username, email, password, confirmPassword).subscribe(
      data => {
        console.log('registerNewUser=' + JSON.stringify(data));
        //save token to the cookie
        this.cookieService.set('jwtToken', data.token, {secure: true, sameSite: 'Strict'});
        console.log('jwtToken=' + this.cookieService.get('jwtToken'));
        this.authenticationService.getCurrentUserRolesRequest();
        //redirect to main page
        this.router.navigate(['/']);
      }
    );
  }
}


