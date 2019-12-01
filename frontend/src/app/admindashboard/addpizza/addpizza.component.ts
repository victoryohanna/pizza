
import { Component, OnInit } from '@angular/core';
import { MypizzaService } from '../../services/mypizza.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-addpizza',
  templateUrl: './addpizza.component.html',
  styleUrls: ['./addpizza.component.css']
})
export class AddpizzaComponent implements OnInit {

  imageUrl = '';
  fileToUpload: File = null;
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  productData: any;
  selectedFile: File = null;

  productId = this.auth.uniqueID;
  title: string;
  size: string;
  description: string;
  price: string;  
  companyName = this.auth.user.companyName;

  productImage: File;
  constructor(private productservice: MypizzaService, private toastr: ToastrService,
              private auth: AuthenticationService ) { }

  ngOnInit() {
    this.formReset();
    // this.resetForm();
  }

  onSubmit() {
    this.productservice.postProduct(this.productId, this.title, this.size, this.price,
               this.description, this.companyName, this.fileToUpload).subscribe(
      (data) => {

        this.toastr.success('Successfuly Added', 'Product');
        this.formReset();
      },
      (err) => {
        this.showErrorMessage = true;
        // console.log(err);
        setTimeout(() => this.showErrorMessage = false, 4000);
      }
    );
  }

  // Show Image
  fileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  formReset() {
    this.productId = '',
    this.title = '',
    this.size = '',
    this.price = '',
    this.description = '',
    this.imageUrl = '',
    this.productImage = null;
  }

}
