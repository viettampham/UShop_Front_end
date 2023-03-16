import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShareLayoutComponent } from './share-layout/share-layout.component';
import { InfoshipComponent } from './infoship/infoship.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JwtModule} from "@auth0/angular-jwt";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import { DialogDetailProductComponent } from './dialog/dialog-detail-product/dialog-detail-product.component';
import {ShopComponent} from "./share-layout/component/shop/shop.component";
import {HomeComponent} from "./share-layout/component/home/home.component";
import { IntroComponent } from './share-layout/component/intro/intro.component';
import { CartComponent } from './share-layout/component/cart/cart.component';
import { BillComponent } from './share-layout/component/bill/bill.component';
import { DialogDetailBillComponent } from './dialog/dialog-detail-bill/dialog-detail-bill.component';
import { DialogViewInfoUserComponent } from './dialog/dialog-view-info-user/dialog-view-info-user.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShareLayoutComponent,
    HomeComponent,
    InfoshipComponent,
    DialogDetailProductComponent,
    ShopComponent,
    IntroComponent,
    CartComponent,
    BillComponent,
    DialogDetailBillComponent,
    DialogViewInfoUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
