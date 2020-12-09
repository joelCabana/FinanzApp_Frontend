import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private loginService:LoginService) { 
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeReq = req.clone({
    setHeaders:{
    Authorization: `Bearer ${this.loginService.getToken()}`
    }
    });
    return next.handle(tokenizeReq);
   }
}
