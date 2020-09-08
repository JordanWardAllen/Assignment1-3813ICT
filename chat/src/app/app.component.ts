import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  
  // user: User = {username: sessionStorage.getItem("username"), birthdate: sessionStorage.getItem("birthdate"), age: sessionStorage.getItem("age"), email: sessionStorage.getItem("email"), pwd: sessionStorage.getItem("pwd"), valid: sessionStorage.getItem("valid") }
  constructor(private router: Router){}

  clearAndMove(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

  
}
