import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {FoodCart} from "../../model/food-cart";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {TokenStorageServiceService} from "../../service/token-storage-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  numberOfCart: number;
  cart: FoodCart[] = [];
  role: string = '';
  img: string = '';

  constructor(private data: DataService
    , private dialog: MatDialog,
              private tokenStogare: TokenStorageServiceService) {
  }


  ngOnInit(): void {
    this.receiveDataFromFoodList();
    // this.receiveDataFromLogin();
  }

///nhận dữ liệu từ component food list
  receiveDataFromFoodList() {
    this.data.currentNumber.subscribe(data => {
      this.numberOfCart = data
    });
  }

  // receiveDataFromLogin() {
  //   this.data.currentImage.subscribe(data => {
  //     this.img = data
  //   })
  //   this.data.currentRole.subscribe(data => {
  //       this.role = data
  //     console.log(data)
  //   })
  // }
  getRoleAndImg() {
    if (this.tokenStogare.getUser()==null) {
      this.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png';
    } else {
      this.img = this.tokenStogare.getUser().customer.image
    }
    if (this.tokenStogare.getUser()== null) {
      this.role = 'None'
    } else {
      this.role = this.tokenStogare.getUser().roles[0]
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {});

  }

  ngDoCheck(): void {
    this.getRoleAndImg();
  }
}
