import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User2} from "../model/user2";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
const API_URl = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUserById(id:number):Observable<User2>{
    console.log(API_URl + 'user?id=' +`${id}`)
    return  this.httpClient.get<User2>(API_URl + 'user?id=' +`${id}`)

  }
}
