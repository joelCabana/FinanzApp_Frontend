import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent implements OnInit {

 user:User;
 total:number = 0;
 type:Array<string> = ['entry','exit'];
 

  constructor(public loginService: LoginService,private _userService:UserService) {
    this.user = new User();
    this.getUserById();
   }

  ngOnInit(): void {

  }


  public getUserById(){
    this._userService.getUserById(this.loginService.userLogged._id).subscribe(
      (result) => {
        this.user = result;
        this.totalAccount();
      },
      (error) => { console.log(error); }
   )}


   public totalAccount(){
    for(let i =0 ; i< this.user.operation.length;i++){
       if(this.user.operation[i].type == this.type[0]){
          this.total =  this.user.operation[i].amount;
       }
    }
   }
}
