import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../Models/Product";
import {ApiService} from "../../../Services/api.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material/dialog";
import {DialogDetailProductComponent} from "../../../dialog/dialog-detail-product/dialog-detail-product.component";
import {style} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ListProduct : Product[] = [];
  ListProductTarget: Product[] = [];
  ListProductDisplay :Product[]=[];
  ListVans : Product[] = [];
  ListVansDisplay : Product[] = [];
  ListNike : Product[] = [];
  ListNikeDisplay : Product[] = [];
  constructor(private api:ApiService,
              private route:Router,
              private dialog:MatDialog,
              private jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {

    const tokenObj = this.token();
    var userID = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    var displayname = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.api.GetProduct().subscribe(res=>{
      this.ListProduct = res
      this.ListProduct.forEach(x=>{
        if (x.brand == "NIKE"){
          this.ListNike.push(x)
        }
        if (x.brand == "VANS"){
          this.ListVans.push(x)
        }
      })
      for (let i = 0; i < 4; i++) {
        this.ListProductDisplay.push(this.ListProduct[i])
      }
      for (let i = 0; i < 4; i++) {
        this.ListVansDisplay.push(this.ListVans[i])
      }
      for (let i = 0; i < 4; i++) {
        this.ListNikeDisplay.push(this.ListNike[i])
      }
    })
    console.log(this.ListNikeDisplay)

  }

  public token = () => {
    const token = localStorage.getItem('token') ?? '';
    const objectToken = this.decodeToken(token);
    return objectToken;
  }

  public decodeToken = (rawToken: string) => this.jwtHelperService?.decodeToken(rawToken);
  displayname: any;
  isClick = true;

  getProduct(){
    this.api.GetProduct().subscribe(res=>{
      this.ListProduct = res
      //console.log(res)
    })
  }

  /*getNike() {
    this.route.navigate(['/shop'])
    //console.log(this.ListProduct)
    this.ListProduct.forEach(p=>{
      if (p.brand == 'NIKE'){
        this.ListProductTarget.push(p)
      }
    })
    console.log(this.ListProductTarget)
  }*/

  ODVproduct(product : any) {
    this.dialog.open(DialogDetailProductComponent,{
      data:product
    })
  }
}
