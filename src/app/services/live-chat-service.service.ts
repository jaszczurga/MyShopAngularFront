import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class LiveChatServiceService {

  public stompClient: any;
  public msgManager :String[] = [];
  public msgCustomer :String[] = [];
  cookieService: CookieService;


  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket?token=Bearer '+ this.cookieService.get('jwtToken');
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/user/topic/messages-from-manager', (message:any) => {
        if (message) {
          console.log("wiadomosc dodawana do listy:")
          console.log(JSON.parse(message.body).content);
          that.msgCustomer.push(JSON.parse(message.body).content);
        }
      });
      that.stompClient.subscribe('/user/topic/messages-from-customers', (message:any) => {
        if (message) {
          console.log("wiadomosc dodawana do listy:")
          console.log(JSON.parse(message.body).content);
          that.msgManager.push(JSON.parse(message.body).content);
        }
      });
    });
  }

  sendMessageToCustomer(message: any) {
    this.stompClient.send('/ws/send-message-to-customer', {}, JSON.stringify(message));
  }
  sendMessageToManager(message: any) {
    this.stompClient.send('/ws/send-message-to-shop-manager', {}, JSON.stringify(message));
  }

}




  // constructor(private cookieService: CookieService) { }
  // //token to url
  // private jwtToken = "?token=Bearer "+this.cookieService.get('jwtToken');
  //
  // private socket = io('http://localhost:8080');
  //
  //
  // sendMessageToManager(message: Message){
  //   this.socket.emit('/ws/send-message-to-shop-manager', message);
  // }
  //
  // sendMessageToCustomer(message: Message){
  //   this.socket.emit('/ws/send-message-to-customer', message);
  // }
  //
  // getMessagesFromManager() {
  //   let observable = new Observable<{content:String}>(observer => {
  //     this.socket.on('/topic/messages-from-manager', (data) => {
  //       observer.next(data);
  //     });
  //     return () => { this.socket.disconnect(); };
  //   });
  //   return observable;
  // }
  //
  // getMessagesFromCustomer() {
  //   let observable = new Observable<{content:String}>(observer => {
  //     this.socket.on('/topic/messages-from-customers', (data) => {
  //       observer.next(data);
  //     });
  //     return () => { this.socket.disconnect(); };
  //   });
  //   return observable;
  // }



