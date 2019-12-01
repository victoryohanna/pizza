import { MypizzaService } from './mypizza.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private route: Router) {}

  canActivate(): boolean {
    if (this.auth.getToken()) {
     return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
