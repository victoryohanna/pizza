
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';   
import { MypizzaService } from '../../services/mypizza.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {

  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  customerData = {
    firstName : '',
    lastName : '',
    email : '',
    phoneNumber : '',
    password : ''
  };
  constructor(private customerService: MypizzaService, private toastr: ToastrService,
              private rout: Router) { }

  ngOnInit() {

  }

  onSubmit() {
    this.customerService.addCustomer(this.customerData).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
    // this.showSuccessMessage = true;
    // setTimeout( ()=>this.showSuccessMessage = false,4000);
      this.toastr.success('Saved Successfuly', 'Your Profile');
      this.rout.navigate(['customer']);
    },
    (err) => {
      this.showErrorMessage = true;
      setTimeout( () => this.showErrorMessage = false, 4000);
    });
  }

}

