import { Operatio } from './operatio';

export class User {
    _id:string;
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    operation:Array<Operatio> = new Array<Operatio>();


    constructor(first_name?:string,last_name?:string, email?:string,password?:string,operation?:Array<Operatio>){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.operation = operation;
    }
}
