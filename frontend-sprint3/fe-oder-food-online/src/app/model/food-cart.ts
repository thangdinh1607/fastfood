import {Promotion} from "./promotion";

export interface FoodCart {
  idFood: number;
  name:string;
  count : number
  price : number;
  promotion: number;
  img: string;
}
