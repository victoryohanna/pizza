import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginString = 'Admin LogIn';
  counter = 0;
  toggle: boolean;
  constructor(private route: Router) { }

  ngOnInit() {
  }

  loginOption() {
    this.counter += 1;
    if (this.counter == 1) {
      this.loginString = 'Customer Login';
      this.route.navigate(['login/company']);
    }

    if (this.counter == 2) {
      this.counter = 0;
    }

    if (this.counter == 0) {
      this.loginString = 'Admin Login';
      this.route.navigate(['login']);
    }
  }

  adminLog() {
    if (this.counter = 0) {

    return true;
    }
  }
}
