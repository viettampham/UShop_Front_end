import { Component, OnInit } from '@angular/core';
import {ApiService} from "../Services/api.service";
import {FormBuilder} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {CreateBillRequest} from "../../Models/RequestModels/CreateBillRequest";
import {Order} from "../../Models/Order";

@Component({
  selector: 'app-infoship',
  templateUrl: './infoship.component.html',
  styleUrls: ['./infoship.component.scss']
})
export class InfoshipComponent implements OnInit {
  ListOrder: Order[] = [];
  totalBill: number = 0;
  displayTotalBill: string = '';
  FormInfoTranfer = this.fb.group({
    city: [''],
    district: [''],
    ward: ['']
  })

  FormCreateBill = this.fb.group({
    userID:[''],
    addressTranfer:[''],
    addressDetail:[''],
    nameCustomer:[''],
    phoneNumber:['']
  })

  citys: any;
  quans: any;
  wards: any;

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private route: Router,
              private jwtHelperService: JwtHelperService) {
  }

  ngOnInit(): void {
    this.GetOrder();
    this.GetCity()
  }

  GetOrder(){
    var userID = sessionStorage.getItem('userID')
    // @ts-ignore
    this.api.GetOrderByUser(userID).subscribe(res=>{
      this.ListOrder = res
      this.ListOrder.forEach(o=>{
        o.displayPrice = o.price.toLocaleString('vi',{style:'currency',currency:'VND'})
        o.displayTotalMoneyOrder = o.totalMoney.toLocaleString('vi',{style:'currency',currency:'VND'})
        this.totalBill = this.totalBill + o.totalMoney
      })
      this.displayTotalBill = this.totalBill.toLocaleString('vi', { style: 'currency', currency: 'VND' })
      /*console.log(this.ListOrder)
      console.log(this.totalCart)
      console.log(this.ListOrder)*/
    })
  }
  GetCity() {
    this.api.getCity().subscribe(res => {
      this.citys = res;
      //console.log(this.citys)
    })
  }
  GetDistrict(event: any) {
    this.api.getDistrict(event.target?.value).subscribe(res => {
      this.quans = res
      this.FormInfoTranfer.value.city = this.quans.name
      //console.log(this.FormInfoTranfer.value.city)
    })
  }
  GetWard(event: any) {
    this.api.getWard(event.target.value).subscribe(res => {
      this.wards = res
      this.FormInfoTranfer.value.district = this.wards.name
      /*console.log(this.FormInfoTranfer.value.district)*/
    })
  }

  GetInfoWard(event: any) {
    for (var x in this.wards.wards) {
      if (this.wards.wards[x].code == event.target.value) {
        this.FormInfoTranfer.value.ward = this.wards.wards[x].name
      }
    }
  }

  Book()
  {
    // @ts-ignore
    var x = document.forms["forminfo"]["infoRecipient"].value
    // @ts-ignore
    var y = document.forms["forminfo"]["phoneNumber"].value
    // @ts-ignore
    var z = document.forms["forminfo"]["addressDetail"].value

    if (x == '') {
      alert("Bạn chưa nhập thông tin người nhận.")
      return
    } else if (y == '') {
      alert("Bạn chưa nhập số điện thoại liên lạc.")
      return
    } else if (z == '') {
      alert("Bạn chưa nhập thông tin địa chỉ cị thể.")
      return
    } else if (this.FormInfoTranfer.value.city == '') {
      alert("Bạn chưa nhập thành phố.")
      return
    } else if (this.FormInfoTranfer.value.district == '') {
      alert("Bạn chưa nhập phường, quận, huyện.")
      return
    } else if (this.FormInfoTranfer.value.ward == '') {
      alert("Bạn chưa nhập xã.")
      return
    } else {
      this.route.navigate(['/bill'])
    }

    var userID = sessionStorage.getItem('userID')

    this.FormCreateBill.value.userID = userID;
    // @ts-ignore
    this.FormCreateBill.value.addressTranfer = this.FormInfoTranfer.value.city +" - "+ this.FormInfoTranfer.value.ward +" - "+ this.FormInfoTranfer.value.district
    this.FormCreateBill.value.nameCustomer = x
    this.FormCreateBill.value.phoneNumber = y
    this.FormCreateBill.value.addressDetail = z

    this.api.CreateBill(this.FormCreateBill.value as CreateBillRequest)
      .subscribe(res=>{
        alert("Success")
        this.route.navigate(['lay-out/bill'])
      },error => {
        alert("error")
      })
    console.log(this.FormCreateBill.value)
  }
}
