import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ShareLayoutComponent} from "./share-layout/share-layout.component";
import {ShopComponent} from "./share-layout/component/shop/shop.component";
import {HomeComponent} from "./share-layout/component/home/home.component";
import {IntroComponent} from "./share-layout/component/intro/intro.component";
import {CartComponent} from "./share-layout/component/cart/cart.component";
import {InfoshipComponent} from "./infoship/infoship.component";
import {BillComponent} from "./share-layout/component/bill/bill.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},

  {path:'lay-out',component:ShareLayoutComponent,
    children:[
      {path:'shop',component:ShopComponent},
      {path:'home',component:HomeComponent},
      {path:'intro',component:IntroComponent},
      {path:'cart',component:CartComponent},
      {path:'infoship',component:InfoshipComponent},
      {path:'bill',component:BillComponent},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
