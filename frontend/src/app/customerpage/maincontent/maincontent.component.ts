import { AuthenticationService } from './../../services/authentication.service';
import { Productmodel } from './../../models/addpizzamodel';
import { MypizzaService } from './../../services/mypizza.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit {

  //url = ' https://localhost/8080/';

  p = 1;
  count = 0;
  trndate = new Date().toDateString();
  selectedProducts: any;
  quantity: number = 1;
  searchItem : '';
  productList: Productmodel[];

  constructor(private service: MypizzaService,
              private interactionService: InteractionService,
              private sanitizeDOM: DomSanitizer, private route: Router, private auth: AuthenticationService) { }

  ngOnInit() {

    this.getAllProducts();
  }
  getAllProducts() {
    return this.service.getProducts().subscribe(
      data => {
        this.productList = data;
      }
    );
  }
  showOrder(product) {  
   this.interactionService.selectedProduct = product;
   this.count = 1;
  }

  onNavBack() {
    this.count = 0;
  }

  // Concatenate image path to the base url
  imageLink(image) {
    return this.sanitizeDOM.bypassSecurityTrustUrl(`/${image}`);
    //return this.sanitizeDOM.bypassSecurityTrustUrl(`${this.url}/${image}`);
  }
}
