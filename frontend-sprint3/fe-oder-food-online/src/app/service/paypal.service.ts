import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
const API_URl = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private http: HttpClient) { }
  payment(price: any): Observable<any> {
    return this.http.get<any>( `${API_URl}pay` + '?price=' + price);
  }
}
