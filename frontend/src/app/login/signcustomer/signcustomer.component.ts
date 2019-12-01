import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signcustomer',
  templateUrl: './signcustomer.component.html',
  styleUrls: ['./signcustomer.component.css']
})
export class SigncustomerComponent implements OnInit {

  loginData = {
    email : '',
    password : ''
  };
  showErrorMessage: boolean;

  constructor(private auth: AuthenticationService, private route: Router) { }

  ngOnInit() {
  }
  routAdmin() {
    this.route.navigate(['login/company']);
  }
  onSubmit() {
    this.auth.logCustomer(this.loginData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.route.navigate(['/customer']);
      },
      (err) => {
        console.log(err);
        this.showErrorMessage = true;
        setTimeout( () => this.showErrorMessage = false, 4000);
      }
    );
  }
}
