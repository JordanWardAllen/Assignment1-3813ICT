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
  usernames = [];
  userIds = [];
  userRole = [];
  deletedUserId = "";
  ioConnection: any;
  isSuper : boolean = false;


  ngOnInit(): void {
    this.initToConnection();
    this.getUsers();
    if (localStorage.getItem('role') == "Super"){
      this.isSuper = true;   
  } else {
      this.isSuper = false;
  }

}

  private initToConnection(){
    this.registerService.initSocket();
    }


  public getUsers(){
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      localStorage.setItem('userCount', getUsers.length)
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username);
        this.userIds.push(getUsers[i].userId);
        this.userRole.push(getUsers[i].role);
      }
    });
  }

  public upgradeUser(userIdToUpgrade){
    this.registerService.sendUpgradeUser(this.userIdToUpgrade)
    this.userIdToUpgrade = null
        this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      this.usernames = [];
      this.userIds = [];
      this.userRole = [];
      
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username)
        this.userIds.push(getUsers[i].userId)
        this.userRole.push(getUsers[i].role)
        
      }
    }); 
    

  }
  public deleteUser(deletedUserId){
    this.registerService.sendDeletedUser(this.deletedUserId);
    this.deletedUserId = null;
    // this.router.navigateByUrl('profiles');
    this.ioConnection = this.registerService.onInit().subscribe((getUsers: any)=> {
      this.usernames = [];
      this.userIds = [];
      this.userRole = [];
      
      for (let i = 0; i< getUsers.length; i++){
        this.usernames.push(getUsers[i].username)
        this.userIds.push(getUsers[i].userId)
        this.userRole.push(getUsers[i].role)
        
      }
    }); 
  }
}
