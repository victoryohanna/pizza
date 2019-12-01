import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  counter = 0 ;
  signUpString = 'Sign-Up Company';
  constructor(private route: Router) { }

  ngOnInit() {
  }
  signUpOption() {
    this.counter += 1;
    if (this.counter == 1) {
      this.signUpString = 'Sign-Up User';
      this.route.navigate(['signup/company']);
    }

    if (this.counter == 2) {
      this.counter = 0;
    }

    if (this.counter == 0) {
      this.signUpString = 'Sign-Up Company';
      this.route.navigate(['signup']);
    }
  }
}
