import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signcompany',
  templateUrl: './signcompany.component.html',
  styleUrls: ['./signcompany.component.css']
})
export class SigncompanyComponent implements OnInit {

  loginData = {
    email: '',
    password : ''
  };

  showErrorMessage: boolean;
  constructor( private route: Router, private auth: AuthenticationService) { }

  ngOnInit() {
  }
  
  logUser() {
    this.auth.loginCompany(this.loginData).subscribe(
      (res) => {
        if (res) {
          this.route.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
        this.showErrorMessage = true;
        setTimeout( () => this.showErrorMessage = false, 4000);
      }
    );
  }

}
