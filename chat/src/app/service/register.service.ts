import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";


interface POST {
  title: string;
  body: string
};


interface POST {
  title: string;
  body: string
};


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = "";
  body = "";
  jsonItems = {};

  setItem(key, item){
    this.jsonItems[key] = item
  }
  getItem(key){
    return this.jsonItems[key];
  }

  getData(){
    this.http.get<POST>(this.url).subscribe(res => {
      this.body = res.body;
      console.log(res.body);
    })
  }
  // constructor() { }
  constructor(private http: HttpClient) { }
  postData(){
    this.http.post<POST>(this.url , this.body).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
  );
  }

}
