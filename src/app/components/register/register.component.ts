import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{



    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
    }

    //register new user
    registerNewUser(username: string, email: string, password: string, confirmPassword: string) {
      this.authenticationService.registerNewUser(username, email, password, confirmPassword).subscribe(
        data => {
          console.log('registerNewUser=' + JSON.stringify(data));
        }
      );
      //redirect to main page
      window.location.href = '/';
    }



}
