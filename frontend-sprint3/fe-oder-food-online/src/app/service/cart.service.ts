import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../model/message";
import {environment} from "../../environments/environment";
const API_URl = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient : HttpClient) {
  }

  addToCart(id:number) : Observable<Message>{
    return this.httpClient.get<Message>(API_URl + 'cart/' + `${id}`)
  }
}
