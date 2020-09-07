import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from "../service/register.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User';
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

  constructor(private router: Router, public registerService: RegisterService, private http:HttpClient) { }


  ngOnInit() {  
  }
  
  public loginfunc(){
    let user = { pwd: this.pwd, email: this.email};
    this.http.post(backend_url + '/api/login', user, httpOptions).subscribe((data: any) => {
      console.log(data)

      if (data.valid){  
      // alert("Correct");
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('pwd', data.pwd);
        sessionStorage.setItem('age', data.age);
        sessionStorage.setItem('birthdate', data.birthdate);
        sessionStorage.setItem('username', data.username);   
        this.router.navigateByUrl('/chat');
      } else {
        alert("Wrong credentials");
        
      }
    })
  }
}