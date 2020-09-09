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
  userId = (Math.random()*(10)).toString();
  email = "";
  pwd = "";
  role = "";
  newUser = {}


  ioConnection: any;
 
  ngOnInit(): void {
    this.initToConnection();
  }

  private initToConnection(){
    this.registerService.initSocket();
    
    }

  public createUser(){
    this.newUser = {email: this.email, pwd: this.pwd, userId: this.userId , role: this.role, username: this.username, valid : "true"};
    this.registerService.sendNewUser(this.newUser);
    this.newUser = null;
    this.username ="";
    this.userId = "";
    this.email = "";
    this.pwd = "";
    this.role = "";
    
  }

}
