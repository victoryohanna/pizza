import { AuthenticationService } from './../../services/authentication.service';
import { Staffmodel } from './../../models/addstaffmodel';
import { MypizzaService } from '../../services/mypizza.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stafflist',
  templateUrl: './stafflist.component.html',
  styleUrls: ['./stafflist.component.css']
})
export class StafflistComponent implements OnInit {

  constructor(private stflist: MypizzaService, private authService: AuthenticationService) { }

  staffList = new Array();
  p = 1;
  searchText: any;

  ngOnInit() {
    this.getStaffList();
  }
  getStaffList() {
     this.stflist.getStaff().subscribe(
      data => {
        const name = this.authService.user.companyName;
        for ( const staff of data) {
          if (staff.companyName == name) {
            const staffs = staff;
            this.staffList.push(staffs);
          }
       }
    });
  }
  onEdit(emp: Staffmodel ) {
    this.stflist.listId = emp;
    console.log(this.stflist.listId);
  }
}
