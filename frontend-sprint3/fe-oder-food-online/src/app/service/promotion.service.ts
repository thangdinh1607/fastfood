import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Promotion} from "../model/promotion";
const API_URl = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private httpClient : HttpClient) { }


}
