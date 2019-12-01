import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginString = 'Admin LogIn';
  counter = 0;

  constructor( public auth: AuthenticationService, private route: Router) { }

  ngOnInit() {
  }

  loginOption() {
    this.counter += 1;
    if (this.counter == 1) {
      this.loginString = 'Customer Login';
      this.route.navigate(['login/admin']);
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
    if (this.counter = 1) {

    return true;
    }

    }

}
