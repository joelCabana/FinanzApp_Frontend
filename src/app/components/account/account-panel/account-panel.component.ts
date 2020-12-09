import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Operatio } from 'src/app/models/operatio';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent implements OnInit {

 user:User;
 total:number = 0;
 type:Array<string> = ['deposito','retiro'];
 categories:Array<Category> = new Array<Category>();
 operatio:Operatio = new Operatio();
 isDeposit:boolean;
 isEdit:boolean;
 loading:boolean;
 idSelected:string;
 category:string;

 filterCategory:string ="all";
 filterType:string = "all";
 filterList:Array<Operatio>;
 ALL:string = "all";

 totaldeposit:number;
 totalWithdraw:number;

 returnUrl: string;

  constructor(public loginService: LoginService,private _userService:UserService,
    private _categoryService:CategoryService,private _toastr : ToastrService,
    private route: ActivatedRoute,private router: Router) {

      if(!this.loginService.userLoggedIn){
        this.router.navigateByUrl('/home')
      }
  
    this.user = new User();
    this.category ="all";
    this.isDeposit = true;
    this.isEdit = false;
    this.loading = true;
    this.getUserById();
    this.getCategories();

   
   }

   
  ngOnInit(): void {

  }
  
  public getUserById(){
    this._userService.getUserById(this.loginService.userLogged._id).subscribe(
      (result) => {
        this.user = result;
        this.filterList = this.user.operation;
        this.totalAccount();
        this.loading = false;
      },
      (error) => { console.log(error); }
   )}

  public totalAccount(){
    this.total = this.calculateAccount(this.type[0]) - this.calculateAccount(this.type[1]);
    this.totaldeposit = this.calculateAccount(this.type[0]);
    this.totalWithdraw = this.calculateAccount(this.type[1]);
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
      },
      (error) => { console.log(error); }
   )
   
  }

  updateUser(){
    this._userService.updateUser(this.user).subscribe(
      (result)=>{
          this.getUserById();
          this.deleteFilter();
          this._toastr.success("the operation was successful.","Success!");
      },
      (error)=>{
        console.log(error);
        this._toastr.error("the operation was not performed","Error!");
      }
    );
    this.operatio = new Operatio();
  }

  depositOrwithdraw(type:number){
    this.operatio.date = new Date();
    this.operatio.type = this.type[type];
    this.operatio.category = new Category();
    this.operatio.category._id = this.category;
    this.user.operation.push(this.operatio);
    this.updateUser();
    this.deleteFilter();
    this.operatio = new Operatio();
  }

  reset(){
    this.operatio = new Operatio();
    this.category = "all";
  }

  selectOperatio(item){
    let auxOperatio = new Operatio();
    Object.assign(auxOperatio, item);
    this.operatio = auxOperatio;
    this.idSelected = this.operatio.category._id; 
  }

  updateOperatio(operation:Operatio){
    this.operatio.category._id = this.idSelected;
    var indice = this.user.operation.findIndex((element)=> element._id == operation._id);
    this.user.operation.splice(indice,1,operation);
    this.updateUser();
  }

  deleteOperation(operation:Operatio){
    var indice = this.user.operation.findIndex((element)=> element._id == operation._id);
    this.user.operation.splice(indice,1);
    this.updateUser();
  }

  filter(){
    this.filterList = new Array<Operatio>();
    this.filterList = this.user.operation;
    if(this.filterCategory != this.ALL && this.filterType == this.ALL){
      this.filterByCategory();
    }else{
      if(this.filterType != this.ALL && this.filterCategory == this.ALL){
        this.filterByType();
      }else {
        this.filterByCategoryAndType();
      }
    }
  }

  filterByCategory(){
    this.filterList = this.filterList.filter(operatio => operatio.category._id === this.filterCategory);
  }

  filterByType(){
    this.filterList = this.filterList.filter(operatio => operatio.type === this.filterType);
  }

  filterByCategoryAndType(){
    this.filterList = this.filterList.filter(operatio => operatio.category._id === this.filterCategory && operatio.type === this.filterType);
  }

  deleteFilter(){
    this.filterType ="all";
    this.filterCategory ="all";
    this.filterList = new Array<Operatio>();
    this.filterList = this.user.operation;
  }

}
