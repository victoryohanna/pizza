import { Router } from '@angular/router';
import { MypizzaService } from '../../services/mypizza.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {

  showSuccessMessage: boolean;
  showErrorMessage: boolean ;
  constructor(public companyService: MypizzaService, private toastr: ToastrService,
              public rout: Router) { }

  ngOnInit() {
    this.companyService.company = {   
      companyName : ' ',
      rcNumber: ' ',
      email : ' ',
      phoneNumber : ' ',
      address : ' ',
      address1 : '',
      password : '',
      confirmPassword : ''

    };
    this.resetForm();
  }
  onSubmit(form: any) {
    this.companyService.addCompany(form.value)
    .subscribe(
      (res) => {

        this.toastr.success('Sucessfully Saved', 'Company Profile');
        this.resetForm(form);
        this.rout.navigate(['dashboard']);
    },
    (err) => {

        this.showErrorMessage = true;

        setTimeout( () => this.showErrorMessage = false, 4000);

    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.companyService.company = {
        companyName : ' ',
        rcNumber: '',
        email : '',
        phoneNumber : '',
        address : '',
        address1 : '',
        password : '',
        confirmPassword : ''
      };
    }
  }
}
