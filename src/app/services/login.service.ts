import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  URL_API:string = 'http://localhost:3000/api/user/login';
  userLoggedIn: boolean = false;
  userLogged: User;


  constructor(private _http:HttpClient) { 

  }

  public login(email: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
       })
    }
      let body = JSON.stringify({ email: email, password: password });
      return this._http.post(this.URL_API, body,httpOption);
  }

  public logout() {
    this.userLogged = new User();
    this.userLoggedIn = false;
    sessionStorage.removeItem("token");
  } 

  getToken():string{
    return sessionStorage.getItem("token");
    }
   
}
