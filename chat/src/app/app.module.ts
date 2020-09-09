import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { MessageService } from "./service/message.service";
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ProfilesComponent } from './profiles/profiles.component'

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    NewUserComponent,
    ProfilesComponent
  ],
  imports: [
    BrowserModule, RouterModule,AppRoutingModule, FormsModule, HttpClientModule, CommonModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
