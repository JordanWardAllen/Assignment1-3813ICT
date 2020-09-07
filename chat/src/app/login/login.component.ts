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
  

  constructor(private router: Router, public registerService: RegisterService, private http:HttpClient) { }


  ngOnInit() {  
  }
  
  public loginfunc(){
    let user = { pwd: this.pwd, email: this.email};
    this.http.post(backend_url + '/api/login', user, httpOptions).subscribe((data: any) => {
      console.log(data)

      if (data.valid){  
      // alert("Correct");
        localStorage.setItem('email', data.email);
        localStorage.setItem('pwd', data.pwd);
        localStorage.setItem('age', data.age);
        localStorage.setItem('birthdate', data.birthdate);
        localStorage.setItem('username', data.username);  
        localStorage.setItem('valid', data.valid); 
        // this.authenticUser = true; 
        this.router.navigateByUrl('/');
      } else {
        alert("Wrong credentials");
        
      }
    })
  }
}