import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {OKTA_AUTH} from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";
import {from, lastValueFrom, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor{

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any> {
    return from(this.handleAccess(req, next)); // from converts a promise to an observable
  }

  private  async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    const theEndPoint = environment.springBootApiUrlhttp+ "/action/";
    //only add an access token for secured endpoints
    const securedEndpoints = [theEndPoint];

    //if(securedEndpoints.some(url => req.urlWithParams.includes(url))) {
    if(req.urlWithParams.startsWith(theEndPoint)) {
      //get access token
      const accessToken = await this.oktaAuth.getAccessToken();
      //clone the request and add new header with access token
      //we must use clone because request is immutable
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return await lastValueFrom(next.handle(req));
  }
}
