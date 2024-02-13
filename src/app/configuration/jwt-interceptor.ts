import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get the token from storage
   // let jwtToken = localStorage.getItem('jwtToken');
    let jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlVTRVIiLCJzdWIiOiJ0ZXN0QUB0ZXN0LmNvbSIsImlhdCI6MTcwNzg0OTQ2OSwiZXhwIjoxNzA3ODUwOTA5fQ.HuIqxPwDkFP6COAtgC6_c71d9LWJ4yYTbTM-2WoIg2k"

    // clone the request and add the JWT token in the Authorization header
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }

    // call next.handle() to continue the request pipeline
    return next.handle(request);
  }
}
