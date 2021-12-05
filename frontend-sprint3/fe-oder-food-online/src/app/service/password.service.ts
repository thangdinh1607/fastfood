import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PasswordDto} from "../model/password-dto";
import {Message} from "../model/message";


const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  sendPassword(id: number, password: PasswordDto): Observable<Message> {
    return this.http.patch<Message>(`${API_URL}api/password/${id}`, password);
    console.log(`${API_URL} + api/password/${id}`, password);
    console.log(id)
  }
}
