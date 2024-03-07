import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {Observable} from "rxjs";
import {Message} from "../common/message";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LiveChatServiceService {

  constructor(private cookieService: CookieService) { }
  //token to url
  private jwtToken = "?token=Bearer "+this.cookieService.get('jwtToken');

  private socket = io('http://localhost:8080');


  sendMessageToManager(message: Message){
    this.socket.emit('/ws/send-message-to-shop-manager', message);
  }

  sendMessageToCustomer(message: Message){
    this.socket.emit('/ws/send-message-to-customer', message);
  }

  getMessagesFromManager() {
    let observable = new Observable<{content:String}>(observer => {
      this.socket.on('/topic/messages-from-manager', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  getMessagesFromCustomer() {
    let observable = new Observable<{content:String}>(observer => {
      this.socket.on('/topic/messages-from-customers', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }


}
