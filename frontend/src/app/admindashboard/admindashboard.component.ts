
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  date = new Date().toDateString();

  constructor( private authService: AuthenticationService) { }

  ngOnInit() {

  }

  logOut() {
    return this.authService.isLoggedOut();
  }
}
