import { Category } from './category';

export class Operatio {
    _id:string;
    concept:string;
    amount:number;
    date:Date;
    type:string;
    category:Category;

    constructor(concept?:string,amount?:number,date?:Date,type?:string,category?:Category){
            this.concept = concept;
            this.amount = amount;
            this,date = date;
            this.category = category;
            this.type = type;
    }
}