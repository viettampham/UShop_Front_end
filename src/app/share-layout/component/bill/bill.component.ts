import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../../../Services/api.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {DialogDetailBillComponent} from "../../../dialog/dialog-detail-bill/dialog-detail-bill.component";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  ListBill: any = [];
  nothingPage = false
  constructor(private api:ApiService,
              private dialog:MatDialog,
              private route:Router,
              private jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {
    this.GetAllNoPayed();
  }

  GetAllNoPayed(){
    var userID = sessionStorage.getItem('userID')
    if (userID == null){
      this.route.navigate(['login'])
    }
    // @ts-ignore
    this.api.GetBillNoPayedUser(userID).subscribe(res=>{
      this.ListBill = res
      if (this.ListBill.length == 0){
        this.nothingPage = true
      }
      if (this.ListBill.length > 0){
        this.nothingPage = false
      }
      // @ts-ignore
      //console.log(this.ListBill)
    })
  }

  ViewDetailBill(bill: any) {
    console.log(bill)
    this.dialog.open(DialogDetailBillComponent,{
      data:bill
    })
  }

  GetAllPayed() {
    var userID = sessionStorage.getItem('userID')
    // @ts-ignore
    this.api.GetBillPayedUser(userID).subscribe(res=>{
      this.ListBill = res
      if (this.ListBill.length == 0){
        this.nothingPage = true
      }
      if (this.ListBill.length > 0){
        this.nothingPage = false
      }
      //console.log(this.ListBill)
    })
  }

  randomColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }
}
