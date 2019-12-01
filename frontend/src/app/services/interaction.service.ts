import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

   url = 'api';
    
   uniqueID: String;

  selectedProduct = {
       productTitle : '',
       productId : '',
       size : '',
       price  : '',
       description: '',
       trnstatus : '',
       trndate : '',
       productImage : null,
       customerName : '',
       address : '',
       quantity : '',
       phoneNumber : '',
       companyName : ''
  };

  public  selectedProdPrice : number = parseInt(this.selectedProduct.price);
  
  currentUser = {};


  constructor(private http: HttpClient) { }

  postTransaction(transaction: any) {
    return this.http.post(this.url + '/transactions', transaction);
  }

}
