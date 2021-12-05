import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { FoodListComponent } from './client/component/food/food-list/food-list.component';
import {HeaderComponent} from "../common/header/header.component";
import {FooterComponent} from "../common/footer/footer.component";
import { FoodViewComponent } from './client/component/food/food-view/food-view.component';
import { CartComponent } from './client/component/cart/cart.component';
import { UserViewComponent } from './client/component/user-view/user-view.component';
import { ChangePasswordComponent } from './client/component/change-password/change-password.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PaypalComponent } from './client/component/paypal/paypal.component';



@NgModule({
  declarations: [
    ClientComponent,
    FoodListComponent,
    HeaderComponent,
    FooterComponent,
    FoodViewComponent,
    CartComponent,
    UserViewComponent,
    ChangePasswordComponent,
    PaypalComponent,

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
