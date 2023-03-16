import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../Services/api.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Category} from "../../../../Models/Category";
import {Product} from "../../../../Models/Product";
import {DialogDetailProductComponent} from "../../../dialog/dialog-detail-product/dialog-detail-product.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  opened = false;
  Product:any;
  ListProduct: Product[] = [];
  ListCategory: Category[]= [];
  listbrand: string[] = [];
  title = '';
  constructor(private dialog:MatDialog,
              private api:ApiService,
              private route:Router) { }

  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
    this.getBrand();
    const iFiller = document.querySelector('.icon-sidebar');
    const iArrow = document.querySelector('.icon-arrow');

    // @ts-ignore
    iFiller.addEventListener('click',()=>{
      // @ts-ignore
      iFiller.classList.add('hidden');
      // @ts-ignore
      iArrow.classList.remove('hidden');
    })

    // @ts-ignore
    iArrow.addEventListener('click',()=>{
      // @ts-ignore
      iArrow.classList.add('hidden');
      // @ts-ignore
      iFiller.classList.remove('hidden')
    })

  }

  getBrand(){
    this.api.GetBrand().subscribe(res=>{
      this.listbrand = res;
    })
  }



  getProduct(){
    this.title = '';
    this.isLoadding = true;
    this.api.GetProduct().subscribe(res=>{
      this.ListProduct = res
      this.isLoadding = false
      this.ListProduct.forEach(p=>{
        p.displayPrice = p.price.toLocaleString('vi',{style:'currency',currency:'VND'})
      })
    },error => {
      this.isnothing = true
    })
    if (this.ListProduct.length = 0){
      this.isnothing = true
    }
  }


  getCategory(){
    this.api.GetCategoryProduct().subscribe(res=>{
      this.ListCategory = res
    })
  }

  isLoadding = false;
  isnothing = false;


  HandleGetByBrand(brand: string) {
    this.title = brand
    this.api.GetProductByBrand(brand).subscribe(res=>{
      this.ListProduct = res
      //console.log(res)
    })
  }

  HandleGet(category: Category) {
    this.title = category.name
    this.api.GetProductByCategoryID(category.categoryID).subscribe(res=>{
      this.ListProduct = res
    })
  }

  openDialogAdd(product: Product) {
    this.dialog.open(DialogDetailProductComponent,{
      data:product
    })
  }
}
