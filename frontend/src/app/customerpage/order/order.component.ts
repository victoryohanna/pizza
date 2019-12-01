
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InteractionService } from 'src/app/services/interaction.service';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  //url = 'http://localhost:8080';

  // transaction : Transactionmodel
  customer = {  
    name : '',
    address : '',
    phoneNumber : '',
    trnStatus : '',
    trndate : new Date().toDateString()
  };
  showMessage: boolean;
  counter  = 0;    
  productQuantity  = 1 ;
  productCount: any;
  price : any  ;
  totalPrice : number ;
  constructor(private route: Router, private toast: ToastrService,
              private sanitizeDOM: DomSanitizer,
              public interactionServece: InteractionService ) { }

  ngOnInit() {

     this.customer = {
       name : '',
       address : '',
       phoneNumber : '',
       trnStatus : '',
       trndate : new Date().toDateString()
     };
  }
  // add and subtract number items to purchase
  onAdd() {
    this.productQuantity = this.productQuantity + 1;
    
  }
  onSub() {
    this.productQuantity = this.productQuantity - 1;
    if (this.productQuantity == 0) {
      this.productQuantity = 1;
    }
  }


  onClick(customer) {

    // Assign customer data to selectedProduct object
    this.interactionServece.selectedProduct.customerName = customer.name;
    this.interactionServece.selectedProduct.address = customer.address;
    this.interactionServece.selectedProduct.phoneNumber = customer.phoneNumber;
    this.interactionServece.selectedProduct.trndate = customer.trndate;
    this.interactionServece.selectedProduct.trnstatus = customer.trnStatus;

    // Price
    this.price = parseInt(this.interactionServece.selectedProduct.price);
    //this.price = this.price * this.productQuantity;
    //this.interactionServece.selectedProduct.price = this.price;
    //this.totalPrice = this.price * this.productQuantity;   
    console.log(this.price)
    //this.interactionServece.selectedProduct.price = this.totalPrice; 

    // Number of products  
    this.productCount = this.productQuantity;
    this.interactionServece.selectedProduct.quantity = this.productCount;

    // Submit transaction
    this.interactionServece.postTransaction(this.interactionServece.selectedProduct)
    .subscribe(data => {
     // console.log(data);
      this.route.navigate(['home/transaction-complete']);
    });
  }

  // set link to image url
  imageLink(image) {
    return this.sanitizeDOM.bypassSecurityTrustUrl(`/${image}`);
    //return this.sanitizeDOM.bypassSecurityTrustUrl(`${this.url}/${image}`);
  }
}
