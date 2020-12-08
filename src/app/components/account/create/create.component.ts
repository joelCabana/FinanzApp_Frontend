import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user:User;
  created:boolean;
  loading:boolean;

  userExists:boolean;

  constructor(private userService:UserService) {
    this.user = new User();
    this.created = false;
    this.loading = false;
    this.userExists = false;
   }

  ngOnInit(): void {
  }

  createUser(){
    this.loading = true;
    this.userService.createUser(this.user).subscribe(
      (result) =>{
        if(result['status'] == 1){
              this.userExists = true;
        }else{
          this.reset()
          this.created = true;
          this.loading = false;
        }
          console.log(result['status']);
      },
      error=>{
        console.log(error);
        alert("ERROR");
        this.loading = false;
      }
    );
    this.loading = false;
  }

  reset(){
    this.user = new User();
  }

}
