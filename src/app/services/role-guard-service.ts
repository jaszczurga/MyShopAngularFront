import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService{

  constructor(public auth: AuthenticationService, public router: Router) {}


  public canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }



}
