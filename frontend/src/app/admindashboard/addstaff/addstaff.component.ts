import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import { MypizzaService } from '../../services/mypizza.service';
import { Staffmodel } from './../../models/addstaffmodel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.css']
})
export class AddstaffComponent implements OnInit {

  firstName: String;
  lastName: String;
  gender: String;
  mydate: String;
  email: String;
  phoneNumber: String;
  address: String;
  department: String;
  password: String;
  companyName = this.authService.user.companyName;

  constructor(private staffServices: MypizzaService, private toastr: ToastrService,
              private route: Router, private authService: AuthenticationService) { }

  ngOnInit() {

    this.resetForm();
  }
  onSubmit(form?: NgForm) {
    this.staffServices.addStaff(form.value).subscribe(
      (res) => {

            this.toastr.success('Successfuly Saved', 'Staff Profile  ');
            this.resetForm();

    },
    (err) => {
            this.toastr.error('Staff Details already Exist');
            this.route.navigate(['dashboard/staff']);
    });

  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.mydate = '';
    this.email = '';
    this.phoneNumber = '';
    this.address = '';
    this.department = ' ';
    this.password = '';
  }


}
