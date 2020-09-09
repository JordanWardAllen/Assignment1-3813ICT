import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../service/register.service";




@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private registerService : RegisterService) { }
  currentUserCount = Number(localStorage.getItem('userCount'))
  username ="";
  userId : number = this.currentUserCount + 1;
  email = "";
  pwd = "";
  role = "Group Admin";
  newUser = {};
  isSuper : boolean = false;
  elseBlock ="";


  ioConnection: any;
 
  ngOnInit(): void {
    this.initToConnection();
    if (localStorage.getItem('role') == "Super"){
      this.isSuper = true;   
  } else {
      this.isSuper = false;
  }
  }

  private initToConnection(){
    this.registerService.initSocket();
    
    }

  public createUser(){
    this.newUser = {email: this.email, pwd: this.pwd, userId: this.userId, role: this.role, username: this.username, valid : "true"};
    this.registerService.sendNewUser(this.newUser);
    this.newUser = null;
    this.username ="";
    this.userId = 0;
    this.email = "";
    this.pwd = "";
    this.role = "";
    
  }

}
