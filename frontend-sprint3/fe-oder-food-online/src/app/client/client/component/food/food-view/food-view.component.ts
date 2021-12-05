import {Component, Inject, OnInit} from '@angular/core';
import {Food} from "../../../../../model/food";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {TokenStorageServiceService} from "../../../../../service/token-storage-service.service";

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css']
})
export class FoodViewComponent implements OnInit {
  food: Food;
  abc="background-image: url(../src/assets/img/H366.jpg)";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FoodViewComponent>,
              private foodService: FoodService,

  ) {
  }

  ngOnInit(): void {
    this.getFoodById()
  }

  getFoodById() {

    return this.foodService.findFoodById(this.data.id).subscribe(data => {
      this.food = data;
    }, error => {
      console.log(error)
    })
  }

}
