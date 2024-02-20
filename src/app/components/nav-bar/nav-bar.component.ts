import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{


//user roles
  roles: string = '';

  constructor(private router : Router,
              private cookieService: CookieService,
              private authService: AuthenticationService) {
  }




  //check if the user is logged in
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  //logout user
  logoutUser() {
    this.authService.logoutUser();
    window.location.href = '/';
  }


  ngOnInit(): void {
    this.authService.CurrentUserRoles.subscribe(
      data => {
        console.log('dataRolesa=' + data);
        this.roles = data || '';
      }
    );
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
