import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../Services/api.service";

@Component({
  selector: 'app-dialog-view-info-user',
  templateUrl: './dialog-view-info-user.component.html',
  styleUrls: ['./dialog-view-info-user.component.scss']
})
export class DialogViewInfoUserComponent implements OnInit {
 user:any;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    var userID = sessionStorage.getItem('userID')
    this.api.GetUserById(userID!).subscribe(res=>{
      this.user = res
      console.log(res)
    })
  }

}
