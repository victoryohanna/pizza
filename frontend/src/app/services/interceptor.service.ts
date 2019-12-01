
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  constructor(private injector: Injector) { }

  intercept(req, next) {
    const authService = this.injector.get(AuthenticationService);
    // Make a clone of the request
    const tokenizeReq = req.clone({
      setHeaders : {
         Authorization : `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
