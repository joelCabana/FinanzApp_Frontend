import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 URL_API:string = "https://finanzapp-web.herokuapp.com/api/user/";
 // URL_API:string = "http://localhost:3000/api/user/";
  constructor(private _http:HttpClient) {

  }

   getUserById(id:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.URL_API+id,httpOptions);
   }


   updateUser(user:User){
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }; 
    var body = JSON.stringify(user);
    return this._http.put(this.URL_API+user._id,body,httpOptions);
  }

  createUser(user:User){
    const httpOptions  = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    var body = JSON.stringify(user);
    return this._http.post(this.URL_API,body,httpOptions);
  }
}
