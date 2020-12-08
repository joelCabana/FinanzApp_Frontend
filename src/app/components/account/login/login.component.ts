import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: User = new User();
  returnUrl: string;
  found:boolean = true;
  loading:boolean;

  constructor(private route: ActivatedRoute,private router: Router,private loginService:LoginService) { 
    this.loading = false;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'accountPanel'; 
  }

  login() {
    this.loading = true;
    this.loginService.login(this.userform.email, this.userform.password)
    .subscribe( 
               (result) => {
                var user = result;
                console.log(user);
                if (user.status == 1){
                  this.loginService.userLoggedIn = true;
                  this.loginService.userLogged = user;
                  this.loading = false;
                   this.router.navigateByUrl(this.returnUrl);
    } else {
        this.found = false;
        this.loading = false;
   }
    },
    error => {
      console.log("error en conexion");
      console.log(error);
    });
  }
   

}
