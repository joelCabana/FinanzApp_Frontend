import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Operatio } from 'src/app/models/operatio';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
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
 categories:Array<Category> = new Array<Category>();
 operatio:Operatio = new Operatio();
 isDeposit:boolean;

  constructor(public loginService: LoginService,private _userService:UserService,
    private _categoryService:CategoryService) {
    this.user = new User();
    this.isDeposit = true;
    this.getUserById();
    this.getCategories();
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
    this.total = this.calculateAccount(this.type[0]) - this.calculateAccount(this.type[1]);
  }

  public calculateAccount(type:string):number{
    var total = 0;
    for(let i =0 ; i< this.user.operation.length;i++){
      if(this.user.operation[i].type == type)
         total = total + this.user.operation[i].amount;
   }
    return total;
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      (result) => {
          var c:Category = new Category();
          result.forEach(element => {
          Object.assign(c,element);
          this.categories.push(c);
          c = new Category();
          });

          console.log(this.categories);
      },
      (error) => { console.log(error); }
   )
   
  }

  updateUser(){
    this._userService.updateUser(this.user).subscribe(
      (result)=>{
          this.getUserById();
      },
      (error)=>{
        console.log(error);
      }
    );
    this.operatio = new Operatio();
  }

  depositOrwithdraw(type:number){
    this.operatio.date = new Date();
    this.operatio.type = this.type[type];
    this.user.operation.push(this.operatio);
    this.updateUser();
    this.operatio = new Operatio();
  }

  reset(){
    this.operatio = new Operatio();
  }


}
