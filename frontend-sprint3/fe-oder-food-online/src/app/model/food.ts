import {Restaurant} from "./restaurant";
import {Promotion} from "./promotion";

export interface Food {
  id:number;
  name:string;
  price:number;
  description:string;
  img:string;
  restaurant : Restaurant;
  promotions : Promotion[];
}
