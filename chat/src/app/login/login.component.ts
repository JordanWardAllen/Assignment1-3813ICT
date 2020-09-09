import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from "../service/register.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from "rxjs";


const backend_url = "http://localhost:3000";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email="";
  pwd="";
  test = {}
  credentials = {}
  ioConnection: any;
  isValid = ""
  

  constructor(private router: Router, public registerService: RegisterService, private http:HttpClient) { }


  ngOnInit() {  
  this.initToConnection();

  }


  private initToConnection(){

    this.registerService.initSocket();
    if (localStorage.getItem('valid') == "true"){
        this.isValid == "true"
        this.router.navigateByUrl('chat');
    } else {
        this.isValid == "false"
    }

  }

public loginfunc(email, pwd){
  
    this.credentials = { email: this.email, pwd: this.pwd}
    this.registerService.sendAuth(this.credentials);

    this.ioConnection = this.registerService.onLogin().subscribe((auth: any)=> {
      localStorage.setItem('username', auth.username);  
      localStorage.setItem('role', auth.role);  
      localStorage.setItem('valid', auth.valid); 
      console.log(localStorage.getItem('email'));
      if (localStorage.getItem('valid') == "true"){
        this.isValid == "true"
        this.router.navigateByUrl('chat');
      } else {
        this.isValid == "false"
      }
    });

  }
}
  

