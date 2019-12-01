
import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { MenuComponent } from './customerpage/menu/menu.component';
import { MaincontentComponent } from './customerpage/maincontent/maincontent.component';
import { LoginComponent } from './login/login.component';
import { CompanyprofileComponent } from './user/companyprofile/companyprofile.component';
import { CustomerprofileComponent } from './user/customerprofile/customerprofile.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CustomerpageComponent } from './customerpage/customerpage.component';
import { AddpizzaComponent } from './admindashboard/addpizza/addpizza.component';
import { AddstaffComponent } from './admindashboard/addstaff/addstaff.component';
import { TransactionsComponent } from './admindashboard/transactions/transactions.component';
import { ManageorderComponent } from './admindashboard/manageorder/manageorder.component';
import { StafflistComponent } from './admindashboard/stafflist/stafflist.component';
import { ProductlistComponent} from './admindashboard/productlist/productlist.component';
import { UserComponent } from './user/user.component';
import { SigncompanyComponent } from './login/signcompany/signcompany.component';
import { SigncustomerComponent } from './login/signcustomer/signcustomer.component';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderComponent } from './customerpage/order/order.component';
import { OrderSuccessComponent } from './customerpage/order-success/order-success.component';

// import { OrdersummaryComponent } from './customerpage/ordersummary/ordersummary.component';

const routes: Routes = [
  //
  { path: 'dashboard', component: AdmindashboardComponent, canActivate : [AuthGuard],
    children : [
      { path : '', component : TransactionsComponent},
      {path: 'addpizza', component: AddpizzaComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'staff', component: AddstaffComponent},
      {path: 'order', component: ManageorderComponent},
      {path: 'staffs/list', component: StafflistComponent},
      {path: 'products', component: ProductlistComponent}
    ]
  },
  { path: 'signup', component: UserComponent,
    children : [
      { path: '', component : CompanyprofileComponent},
      {path: 'customer-profile', component : CustomerprofileComponent},
      { path: 'company', component: CompanyprofileComponent}
    ]
  },

  {path: 'home', component: CustomerpageComponent,
    children: [
      {path: '', component: MaincontentComponent},
      {path: 'menu', component: MenuComponent},
      {path: 'ordersummary', component: OrderComponent},
      {path: 'transaction-complete', component: OrderSuccessComponent}
    ]
  },

  { path: 'login', component: LoginComponent,
    children : [
      {path : '', component : SigncompanyComponent},
      {path : 'admin', component : SigncompanyComponent},
      {path : 'customer', component : SigncustomerComponent},
    ]
  },

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

