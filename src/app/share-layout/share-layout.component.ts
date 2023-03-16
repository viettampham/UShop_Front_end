import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../Services/api.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Product} from "../../Models/Product";
import {MatDialog} from "@angular/material/dialog";
import {DialogViewInfoUserComponent} from "../dialog/dialog-view-info-user/dialog-view-info-user.component";
import {style} from "@angular/animations";

@Component({
  selector: 'app-share-layout',
  templateUrl: './share-layout.component.html',
  styleUrls: ['./share-layout.component.scss']
})

export class ShareLayoutComponent implements OnInit {
  isClick = false;
  ListProduct : Product[] = [];
  ListProductTarget: Product[] = [];
  ListProductDisplay :Product[]=[];
  displayname:any;
  userID:any;
  constructor(private api:ApiService,
              private route:Router,
              private dialog:MatDialog,
              private jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {
    /*const tokenObj = this.token();
    var userID = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    var displayname = tokenObj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];*/
    //console.log(tokenObj)
    //console.log(userID)
    //.log(displayname)
    this.displayname = sessionStorage.getItem('username')
    this.userID = sessionStorage.getItem('userID')
    this.api.GetProduct().subscribe(res=>{
      this.ListProduct = res
      this.ListProduct.forEach(p=>{
        p.displayPrice = p.price.toLocaleString('vi',{style:'currency',currency:'VND'})
        /*console.log(p.displayPrice)*/
      })
      for (var i = 0;i<4;i++){
        this.ListProductDisplay.push(this.ListProduct[i]);
      }
      /*console.log(this.ListProductDisplay)*/
    })
  }


  public token = () => {
    const token = localStorage.getItem('token') ?? '';
    const objectToken = this.decodeToken(token);
    return objectToken;
  }

  public decodeToken = (rawToken: string) => this.jwtHelperService?.decodeToken(rawToken);
  trantoCart() {
    const tokenUser = sessionStorage.getItem('token')
    if (tokenUser == null){
      this.route.navigate(['login'])
    }else{
      this.route.navigate(['lay-out/cart'])
    }
  }

  trantoBill() {
    const tokenUser = sessionStorage.getItem('token')
    if (tokenUser == null){
      this.route.navigate(['login'])
    }else{
      this.route.navigate(['lay-out/bill'])
    }
  }

  logout() {
    sessionStorage.clear()
    this.route.navigate(['login'])
  }

  ODinfouser() {
    this.dialog.open(DialogViewInfoUserComponent,{
      width:"60%",
    })
  }
}
