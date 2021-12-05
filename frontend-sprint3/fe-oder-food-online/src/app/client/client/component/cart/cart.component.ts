import {Component, DoCheck, OnInit} from '@angular/core';
import {DataService} from "../../../../service/data.service";
import {Food} from "../../../../model/food";
import {FoodCart} from "../../../../model/food-cart";
import {FoodService} from "../../../../service/food.service";
import {DateFilterFn} from "@angular/material/datepicker";
import {FoodViewComponent} from "../food/food-view/food-view.component";
import {MatDialog} from "@angular/material/dialog";
import {PaypalService} from "../../../../service/paypal.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,DoCheck {
  cart: FoodCart[] = [];
  total: number = 0
  nameDelete: string;

  constructor(private foodService: FoodService, private data: DataService, private dialog: MatDialog,
              private paypalService: PaypalService) {
  }

  ngOnInit(): void {
    this.getLocalStorage();
    this.getCart();
    this.sendNumberOfCartToHeader()
    console.log(this.total)
  }

  getLocalStorage() {
    const value = JSON.parse(<string>localStorage.getItem('CART'))
    if (value) {
      this.cart = value
    }

  }

  setLocalStorage() {
    const value = JSON.stringify(this.cart)
    localStorage.setItem('CART', value)
  }

  getCart() {
    for (let i = 0; i < this.cart.length; i++) {
      this.foodService.findFoodById(this.cart[i].idFood).subscribe(data => {
        this.cart[i].name = data.name;
        this.cart[i].price = data.price;
        this.cart[i].img = data.img
        this.cart[i].promotion = data.promotions[0].value
      }, error => {
        console.log(error)
      })
    }

    this.getTotal();
  }

  sendNumberOfCartToHeader() {
    this.data.changeNumber(this.cart.length);
  }

  decrement(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].idFood === id) {
        if (this.cart[i].count > 1) {
          this.cart[i].count -= 1
        } else {
          this.cart.splice(i, 1)
        }
      }
    }
    this.setLocalStorage();
    this.sendNumberOfCartToHeader()
    this.getTotal();
  }

  increment(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].idFood === id) {
        this.cart[i].count += 1
      }
    }
    this.setLocalStorage();
    this.sendNumberOfCartToHeader()
    this.getTotal();
  }

  getTotal() {
    let total1 = 0
    for (let i = 0; i < this.cart.length; i++) {
      total1 += this.cart[i].price * this.cart[i].count * (100 - this.cart[i].promotion) / 100
    }
    this.total = total1
  }

  removeFood(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].idFood === id) {
        this.cart.splice(i, 1)
      }
    }
    this.setLocalStorage();
    this.sendNumberOfCartToHeader()
    this.getTotal();
  }

  getNameDelete(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].idFood === id) {
        this.nameDelete = this.cart[i].name
      }
    }
  }

  payment() {
    this.paypalService.payment(this.total).subscribe(data => {
      window.location.href = data.link
      console.log(data.link)
    })
  }

  ngDoCheck(): void {
    this.getTotal()
  }
}
