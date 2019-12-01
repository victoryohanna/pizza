
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';


import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'api';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  uniqueID: string;

  constructor( private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>
    (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // login method for company admin
  loginCompany(credentials) {
    return this.http.post<any>(this.url + '/company/login', credentials)
    .pipe(map(res => {
      // console.log(res);
      const result = res;
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        // console.log(localStorage)
        return true;
      } else {
        return false;
      }
    }));
  }

  logCustomer(data) {
    return this.http.post<any>(this.url + '/login', data);
  }

  // Check logged in users
  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) { return false; }

    const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired =  jwtHelper.isTokenExpired(token);

    return !isExpired;
  }


  isLoggedOut() {
    return localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }

   get user() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const loggedInUser = new JwtHelperService().decodeToken(token);
    return loggedInUser.subject;

  }
  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;

        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
