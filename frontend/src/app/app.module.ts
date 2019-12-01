
// Build in  imports
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Components imports
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
import { ProductlistComponent } from './admindashboard/productlist/productlist.component';
import { UserComponent } from './user/user.component';
import { SigncompanyComponent } from './login/signcompany/signcompany.component';
import { SigncustomerComponent } from './login/signcustomer/signcustomer.component';
import { MenuComponent } from './customerpage/menu/menu.component';
import { MaincontentComponent } from './customerpage/maincontent/maincontent.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderComponent } from './customerpage/order/order.component';
import { HeaderComponent } from './header/header.component';
import { OrderSuccessComponent } from './customerpage/order-success/order-success.component';

// Providers
import { MypizzaService } from './services/mypizza.service';
import { InterceptorService } from './services/interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { InteractionService } from './services/interaction.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyprofileComponent,
    CustomerprofileComponent,
    AdmindashboardComponent,
    CustomerpageComponent,
    AddpizzaComponent,
    AddstaffComponent,
    TransactionsComponent,
    ManageorderComponent,
    StafflistComponent,
    ProductlistComponent,
    UserComponent,
    SigncompanyComponent,
    SigncustomerComponent,
    MenuComponent,
    MaincontentComponent,
    OrderComponent,
    PageNotFoundComponent,
    OrderSuccessComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ],
  providers: [MypizzaService, InteractionService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
