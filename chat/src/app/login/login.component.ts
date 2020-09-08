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

}

public loginfunc(email, pwd){
  
    this.credentials = { email: this.email, pwd: this.pwd}
    this.registerService.send(this.credentials);

    this.ioConnection = this.registerService.onLogin().subscribe((auth: any)=> {
      localStorage.setItem('email', auth.email);
      localStorage.setItem('pwd', auth.pwd);
      localStorage.setItem('age', auth.age);
      localStorage.setItem('birthdate', auth.birthdate);
      localStorage.setItem('username', auth.username);  
      localStorage.setItem('valid', auth.valid); 
      console.log(localStorage.getItem('email'))
      if (localStorage.getItem('valid') == "true"){
        this.isValid == "true"
        this.router.navigateByUrl('/');
      } else {
        this.isValid == "false"
      }
    });

  }
}
  

