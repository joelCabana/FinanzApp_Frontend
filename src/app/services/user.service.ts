import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL_API:string = "http://localhost:3000/api/user/";

  constructor(private _http:HttpClient) {

  }

   getUserById(id:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({

      })
    }   
    return this._http.get(this.URL_API+id,httpOptions);
   }
}
