import { Component, OnInit } from '@angular/core';
import {Order} from "../../../../Models/Order";
import {ApiService} from "../../../Services/api.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  ListOrder:Order[] = [];
  totalCart:number = 0;
  disPlayTotalCart:any;
  nothingPage = false
  constructor(private api:ApiService,
              private route: Router,
              private fb:FormBuilder,
              private jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {
    this.GetOrder();

  }

  GetOrder(){
    var userID = sessionStorage.getItem('userID')
    // @ts-ignore
    this.api.GetOrderByUser(userID).subscribe(res=>{
      this.ListOrder = res
      if (this.ListOrder.length == 0){
        this.nothingPage = true
      }
      if (this.ListOrder.length > 0){
        this.nothingPage = false
      }
      //console.log(this.ListOrder.length)
      //console.log(this.nothingPage)
      this.ListOrder.forEach(o=>{
        o.displayPrice = o.price.toLocaleString('vi',{style:'currency',currency:'VND'})
        o.displayTotalMoneyOrder = o.totalMoney.toLocaleString('vi',{style:'currency',currency:'VND'})
        this.totalCart = this.totalCart + o.totalMoney
      })
      this.disPlayTotalCart = this.totalCart.toLocaleString('vi', { style: 'currency', currency: 'VND' })
    })
  }
  hanleCreateBill() {
    this.route.navigate(['lay-out/infoship'])
  }
  DeleteOrderByID(orderID: string) {
    //console.log(orderID)
    if (confirm("Bạn có muốn xóa sản phầm này khỏi giỏ hàng ?")){
      this.api.DeleteOrderByID(orderID).subscribe(res=>{
        alert("Xóa thành công")
        location.reload()
      })
    }
  }

}
