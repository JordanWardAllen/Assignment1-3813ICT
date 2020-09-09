import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isValid: boolean = false
  sender =  localStorage.getItem('username');
  messagecontent: string = "";
  messages  = [];
  newMessage = {};
  ioConnection: any;
  stringJson: any;
  stringObj: any[];


  constructor(private messageService : MessageService, private router: Router) { }

  ngOnInit(): void {
    this.initToConnection();
    this.getMsg();
    if (localStorage.getItem('valid')){
      this.isValid = true
      console.log(localStorage.getItem('valid'))
    }
  }

private initToConnection(){
  this.messageService.initSocket();
  // this.ioConnection = this.messageService.onChat().subscribe((chat: any)=> {
  //   this.messages.push(chat);
  // });

}

public getMsg(){
  this.messages = [];
  this.ioConnection = this.messageService.onChat().subscribe((chat: any)=> {
    console.log(chat)
    // localStorage.setItem('userCount', getUsers.length)
    for (let i = 0; i< chat.length; i++){
      
      this.messages = chat;

    }
  });
}


public chat(messagecontent){
  this.newMessage = {sender: this.sender, messagecontent: this.messagecontent};
  console.log(this.sender)
    if (this.messagecontent){
      console.log(this.messagecontent)
      this.messageService.sendChat(this.newMessage);
      this.messagecontent = null;
      
      // this.getMsg();
      // this.router.navigateByUrl('chat');

    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }
}
