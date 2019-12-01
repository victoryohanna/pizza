import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staffmodel } from '../models/addstaffmodel';
import { Productmodel } from '../models/addpizzamodel';
import { Companymodel } from '../models/companymodel';
import { Customermodel } from '../models/customermodel';
import { Transactionmodel } from '../models/transactionmodel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MypizzaService {

  constructor(private http: HttpClient) { }

  url = 'api'; 

  selectedStaff: Staffmodel;
  listId: Staffmodel;
  productList: Productmodel;
  customers: Customermodel;
  company: Companymodel;
  lists: Productmodel[];
  selectedProduct: any;

  addStaff(staff: Staffmodel) {
    return this.http.post(this.url + '/staff', staff );
  }

  postProduct(productId: string, productTitle: string,
              size: string, price: string, description: string, companyName: string, fileToUpload: File) {

    const formData = new FormData();
    formData.append('productImage', fileToUpload, fileToUpload.name);
    formData.append('productId', productId);
    formData.append('productTitle', productTitle);
    formData.append('size', size);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('companyName', companyName);

    return this.http.post(this.url + '/product', formData);
  }

  addCompany(company: Companymodel) {
    return this.http.post(this.url + '/company', company);
  }

  addCustomer(customer) {
    return this.http.post<any>(this.url + '/customer', customer);
  }

  /*RETRIEVE DETAILS FROM DATABASE COLLECTION*/
  getStaff() {
    return this.http.get<Staffmodel[]>(this.url + '/staffs');
  }

  // get user by id
  getStaffId() { 
    return this.http.get<Staffmodel>(this.url + 'staffs' + '/:id')
    .subscribe(data => {
      this.listId = data;
    });
  }

  getTransaction(): Observable<Transactionmodel[]> {
    return this.http.get<Transactionmodel[]>(this.url + '/transactions');
  }

  getProducts() {
    return this.http.get<Productmodel[]>(this.url + '/list');
  }

}
