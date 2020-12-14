import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL_API:string = "https://finanzapp-web.herokuapp.com/api/category/";
  //URL_API:string = "http://localhost:3000/api/category/";

  constructor(private _http:HttpClient) { 
    
  }

  getCategories():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      })
    }   
    return this._http.get(this.URL_API,httpOptions);
   }
}
