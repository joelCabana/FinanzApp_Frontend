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
 
  constructor(private route: ActivatedRoute,private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || ''; 
  }

  login() {
    this.loginService.login(this.userform.email, this.userform.password)
    .subscribe( 
               (result) => {
                var user = result;
                console.log(user);
                if (user.status == 1){
                  //vbles para mostrar-ocultar cosas en el header
                  this.loginService.userLoggedIn = true;
                  this.loginService.userLogged = user;
                  //redirigimos a home o a pagina que llamo
                   this.router.navigateByUrl(this.returnUrl);
    } else {
    //usuario no encontrado muestro mensaje en la vista
   }
    },
    error => {
      console.log("error en conexion");
      console.log(error);
    });
  }
   

}
