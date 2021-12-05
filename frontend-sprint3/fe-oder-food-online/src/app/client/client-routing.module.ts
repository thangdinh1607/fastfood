import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {FooterComponent} from "../common/footer/footer.component";
import {FoodListComponent} from "./client/component/food/food-list/food-list.component";
import {CartComponent} from "./client/component/cart/cart.component";
import {PaypalComponent} from "./client/component/paypal/paypal.component";


const routes: Routes = [
  {
    path:'' ,component: ClientComponent,children: [
      {
        path:'food' , component: FoodListComponent
      },
      {
        path:'cart' , component: CartComponent
      },
      {
        path:'paypal' , component: PaypalComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
