import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../service/register.service";



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private registerService : RegisterService) { }

  username ="";
  age = "";
  email = "";
  pwd = "";
  birthdate = "";
  newUser = {}


  ioConnection: any;
 
  ngOnInit(): void {
    this.initToConnection();
  }

  private initToConnection(){
    this.registerService.initSocket();
    
    }

  public createUser(){
    this.newUser = {email: this.email, pwd: this.pwd, age: this.age , birthdate: this.birthdate, username: this.username, valid : "true"};
    // console.log(this.newUser)
    this.registerService.sendNewUser(this.newUser);
    this.username ="";
    this.age = "";
    this.email = "";
    this.pwd = "";
    this.birthdate = "";
    
  }

}
