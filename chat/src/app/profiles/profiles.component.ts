import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../service/register.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(public registerService: RegisterService, private router :Router) { }

  ListOfusers = [];
  userIdToUpgrade = "";
  usernames = []
  userIds = []
  deletedUserId = "";
  ioConnection: any;
  isSuper : boolean = false;
  isSuperOrGroup : boolean = false;

  ngOnInit(): void {
    this.initToConnection();
    this.getUsers();
    if (localStorage.getItem('role') == "Group"){
      // this.isSuper = true;
      this.isSuperOrGroup = true;
      console.log(localStorage.getItem('role'))
    } else if (localStorage.getItem('role') == "Super"){
        this.isSuperOrGroup = true;
        this.isSuper = true;
    
  } else {

      this.isSuper = false;
      this.isSuperOrGroup = false;
  }

}

  private initToConnection(){
    this.registerService.initSocket();
    
    
    
    }


  public getUsers(){
    console.log("fired")
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username)
        this.userIds.push(getUsers[i].userId)
      }
    });
  }

  public upgradeUser(userIdToUpgrade){
    this.registerService.sendUpgradeUser(this.userIdToUpgrade)
    this.userIdToUpgrade = ""

  }
  public deleteUser(deletedUserId){
    this.registerService.sendDeletedUser(this.deletedUserId);
    this.deletedUserId = null;
    this.router.navigateByUrl('profiles');
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      this.usernames = [];
      this.userIds = [];
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username)
        this.userIds.push(getUsers[i].userId)
        console.log(getUsers)
      }
    });
    
  }

}