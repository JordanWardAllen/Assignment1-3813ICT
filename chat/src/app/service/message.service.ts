import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
// import * as exampleData from '../src/assets/data'

const SERVER_URL = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private socket;

  stringJson: any;
  stringObj: any[];
  


// public jsonfile = exampleData;

  constructor(private http: HttpClient ) {
    // var obj;
    
  //   this.getJSON().subscribe(data=> obj=data, error => console.log(error))
   }



  //  public getJSON(): Observable<any> {
  //   return this.http.get("../data")
  //   .map((res:any) => res.json())
  //  }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }
  // public getJSON(): Observable<any> {
  //   return this.http.get("../assets/data.json")
      
  //  }
   public sendChat(chat: any): void {
    this.socket.emit('chat', chat);
  }

  public onChat(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('chat', (data:any) => observer.next(data));
    })
    return observable;
  }



  public send(message: string): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string) => observer.next(data));
    })
    return observable;
  }


}
