import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { MessageService } from '../service/message.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  isValid: boolean = false
  current =  0;
  messagecontent: string = "";
  messages: string[] = [];
  currentTime: number[] = [];
  ioConnection: any;


  date = Math.round(new Date().getTime()/1000);

  

  constructor(private messageService : MessageService) { }

  ngOnInit(): void {
    
    this.initToConnection();
    if (sessionStorage.getItem('valid')){
      this.isValid = true
      console.log(sessionStorage.getItem('valid'))
    }
  }
private initToConnection(){
  this.messageService.initSocket();
  this.ioConnection = this.messageService.onMessage().subscribe((message: string)=> {
    this.messages.push(message);

    
  });
}


chat(messagecontent){
  this.current = Date.now()
  this.currentTime.push(this.current);
  this.current = null;
    if (this.messagecontent){
      this.messageService.send(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log('Failed to send message. Make sure text box is not empty.')
    }
  }




}
