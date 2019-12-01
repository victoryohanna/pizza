import { AuthenticationService } from './../../services/authentication.service';
import { MypizzaService } from '../../services/mypizza.service';
import { Component, OnInit } from '@angular/core';
import { Transactionmodel } from 'src/app/models/transactionmodel';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public lists = new Array();

  constructor( private trnService: MypizzaService,
               private route: Router, private auth: AuthenticationService) { }

  p = 1;
  searchText: any;

  ngOnInit() {
    this.transactionDetails();
  }
// Retrieve all transactions
  transactionDetails() {
    return this.trnService.getTransaction().subscribe(
      data => {
        for (const item of data) {
           const name = this.auth.user.companyName;
           if (item.companyName == name) {
              const items  = item;
              this.lists.push(items);
          }
        }
    },
    err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.route.navigate(['/login']);
        }
      }
    });
  }

}
