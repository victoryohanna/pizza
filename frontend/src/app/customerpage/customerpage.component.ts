import { MypizzaService } from './../services/mypizza.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-customerpage',
  templateUrl: './customerpage.component.html',
  styleUrls: ['./customerpage.component.css']
})
export class CustomerpageComponent implements OnInit {

  constructor(private route: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logIn() {
    this.route.navigate(['login/customer']);
  }
  logOut() {
    return this.authService.isLoggedOut();
  }
  signUp() {
    this.route.navigate(['signup']);
  }
}
