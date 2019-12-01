import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Productmodel } from './../../models/addpizzamodel';
import { MypizzaService } from '../../services/mypizza.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  p = 1;
  searchText: any;
  lists = new Array();

  url = 'http://localhost:4000';


  constructor(private prodService: MypizzaService,
              private sanitization: DomSanitizer,
              private route: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {

    this.products();
  }

   // Get all list of products
   products() {
    return this.prodService.getProducts().subscribe(
      data => {
        for (const product of data) {
          const name = this.authService.user.companyName;
          if (product.companyName == name) {
            const products = product;
            this.lists.push(products);
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

  imageLink(image) {
    return this.sanitization.bypassSecurityTrustUrl(`${this.url}/${image}`);
  }
}
