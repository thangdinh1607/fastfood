import { Injectable } from '@angular/core';
import {LoginRequest} from "../model/loginRequest";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TokenStorageServiceService} from "./token-storage-service.service";
const API_URl = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLonggedIn=true;
  httpOptions: any;
  constructor(private httpClient: HttpClient , private tokenStorage: TokenStorageServiceService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(API_URl + 'api/auth/login', loginRequest,this.httpOptions)
  }
}
