import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../model/food";
import {TokenStorageServiceService} from "./token-storage-service.service";

const API_URl = `${environment.apiURL}`

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  httpOptions: any;
  constructor(private httpClient: HttpClient , private tokenStorage: TokenStorageServiceService) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }


  getAllFoods(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(API_URl + 'food')
  }
  findFoodById(id:number): Observable<Food>{
    return this.httpClient.get<Food>(API_URl +'food/' +`${id}`)
  }
  getFoodBySearch(keyword: string , promotion: string , address: string , typeSort:string , limit1:number):Observable<Food[]>{
    return this.httpClient.get<Food[]>(API_URl + 'food/search?keyword='+`${keyword}`+
      '&promotion='+`${promotion}`+'&address='+`${address}` +'&typeSort='+ `${typeSort}`+'&limit1='+`${limit1}` )
  }
  getNumberOfList(keyword: string , promotion: string , address: string , typeSort:string , limit1:number) : Observable<number>{
    return this.httpClient.get<number>(API_URl + 'food/count?keyword='+`${keyword}`+
      '&promotion='+`${promotion}`+'&address='+`${address}` +'&typeSort='+ `${typeSort}`+'&limit1='+`${limit1}` )
  }
}
