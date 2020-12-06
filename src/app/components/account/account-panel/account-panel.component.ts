import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent implements OnInit {

  constructor(public loginService: LoginService,private _userService:UserService) { }

  ngOnInit(): void {

  }

  //Carga la lista de los afiliados
  public getUserById(){
    this._userService.getUserById(this.loginService.userLogged._id).subscribe(
      (result) => {
        
        //  Object.assign(aux,e);
       
        });
      },
      (error) => { console.log(error); }
    )
  }


}
