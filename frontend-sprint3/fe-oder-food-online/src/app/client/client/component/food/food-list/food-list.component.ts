import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../../../service/food.service";
import {Food} from "../../../../../model/food";
import {MatDialog} from "@angular/material/dialog";
import {FoodViewComponent} from "../food-view/food-view.component";
import {District} from "../../../../../model/district";
import {DataService} from "../../../../../service/data.service";
import {CartService} from "../../../../../service/cart.service";
import {Message} from "../../../../../model/message";
import {FoodCart} from "../../../../../model/food-cart";
import {TokenStorageServiceService} from "../../../../../service/token-storage-service.service";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Promotion} from "../../../../../model/promotion";


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  district1: District[] = []
  district = [
    [{id: 1, name: 'Sơn Trà'},
      {id: 2, name: 'Ngũ Hành Sơn'},
      {id: 3, name: 'Thanh Khê'},
      {id: 4, name: 'Hải Châu'}],

    [{id: 1, name: 'Q1'},
      {id: 2, name: 'Q2'},
      {id: 3, name: 'Q3'},
      {id: 4, name: 'Q4'}],

    [{id: 1, name: 'Thanh Xuân'},
      {id: 2, name: 'Bắc Từ liêm'},
      {id: 3, name: 'Hoàng Mai'},
      {id: 4, name: 'Đống Đa'}]
  ]
  foods : Food[] = [];
  page: number = 6;
  address: string = '';
  city: string = '';
  keyword: string = '';
  promotion: string = '';
  typeSort: string = '';
  numberOfSearch: number = 0;
  advanced: any = 'display : none';
  id: number;
  food: Food;

  foodCart: FoodCart;
  cart: FoodCart[] = [];

  constructor(private foodService: FoodService,
              private dialog: MatDialog,
              private data: DataService,
              private cartService: CartService,
              private token: TokenStorageServiceService,
              private toast : ToastrService) {
  }

  ngOnInit(): void {
    this.numberOfSearch = this.foods.length
    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
    this.getCartFromLocalstorage()
    this.sendNumberOfCartToHeader();
  }

  findFoodById(id: number) {
    this.foodService.findFoodById(id).subscribe(data => {
      this.food = data
    }, error => {
      console.log(error)
    })
  }

  getAllFood() {
    this.foodService.getAllFoods().subscribe(data => {
      this.foods = data
      console.log(this.foods)
    }, error => {
      console.log(error)
    })
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(FoodViewComponent, {
      width: 'auto', height: 'auto',
      data: {id},
    });
  }

  search(keyword: string, promotion: string, address: string, typeSort: string, page: number) {
    this.foodService.getFoodBySearch(keyword, promotion, address, typeSort, page).subscribe(data => {
      this.foods = data
      console.log(data)
    }, error => {
      console.log(error)
    })
    this.getNumberOfSearch(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  getNumberOfSearch(keyword: string, promotion: string, address: string, typeSort: string, page: number) {
    this.foodService.getNumberOfList(keyword, promotion, address, typeSort, page).subscribe(data => {
      this.numberOfSearch = data
    }, error => {
      console.log(error)
    })
  }

  sendCity(city: string) {
    this.page = 6;
    this.address = city
    this.city = city;
    if (city === "Đà Nẵng") {
      this.district1 = this.district[0]
    }
    if (city === "Sài Gòn") {
      this.district1 = this.district[1]
    }
    if (city === "Hà Nội") {
      this.district1 = this.district[2]
    }

    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  sendDistrict(district: string) {
    this.page = 6;
    if (district === '') {
      this.address = this.city
    } else {
      this.address = district;
    }

    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  sendKeyword(keyword: string) {
    this.page = 6;
    this.keyword = keyword;
    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  sendPromotion(promotion: string) {
    this.page = 6;
    this.promotion = promotion;
    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  sendTypeSort(typeSort: string) {
    this.page = 6;
    this.typeSort = typeSort;

    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  upPage() {
    this.page += 6
    this.search(this.keyword, this.promotion, this.address, this.typeSort, this.page)
  }

  sendId(id: number) {
    this.id = id;
    this.findFoodById(this.id);
    this.addFoodToLocalstorage(id)
    this.sendNumberOfCartToHeader();
  }

  ///add id vào mảng và gửi tới header

  sendNumberOfCartToHeader() {
    this.data.changeNumber(this.cart.length);
  }

  addFoodToLocalstorage(id: number) {
    let check = true;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].idFood === id) {
        this.cart[i].count += 1
        check = false;
        this.toast.success("Sản phẩm đã có trong giỏ hàng + 1" , "Thông báo")
      }
    }

    if (check) {
      this.foodCart = {idFood: id, name: '', count: 1, price: 0, promotion: 0, img: ''}
      this.cart.push(this.foodCart)
      this.toast.success("Thêm vào giỏ hàng thành công" , "Thông báo")
    }

    const cart = JSON.stringify(this.cart)
    localStorage.setItem('CART', cart)
  }

  getCartFromLocalstorage() {
      const value = JSON.parse(<string>localStorage.getItem('CART'))
    if(value){
      this.cart =value
    }
  }

  showAdvancedSearch() {
    if(this.advanced == null  ){
      this.advanced = 'display : none';
    }else {
      this.advanced =null;
    }
  }
}
