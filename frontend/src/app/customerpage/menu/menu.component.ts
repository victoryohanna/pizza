
import { Component, OnInit } from '@angular/core';
import { Productmodel } from './../../models/addpizzamodel';
import { MypizzaService } from './../../services/mypizza.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  url = 'http://localhost:4000';
  p = 1;
  searchText: any;
  lists: Productmodel[];
  constructor(public prodService: MypizzaService, private sanitizeDOM: DomSanitizer) { }

  ngOnInit() {
    this.prodService.getProducts();
  }

  // Concatenate image path to the base url
  imageLink(image) {
    return this.sanitizeDOM.bypassSecurityTrustUrl(`${this.url}/${image}`);
  }
}
