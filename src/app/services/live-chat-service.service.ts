import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "./authentication.service";
import {Customer} from "../common/customer";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {ProductCategory} from "../common/product-category";
import {Message} from "../common/message";

declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class LiveChatServiceService {

  public stompClient: any;
  public roles: string = 'USER';
  public messageHistory: Message[] = [];
  Customers: Subject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(private cookieService: CookieService,
              private authenticationService: AuthenticationService,
              private http: HttpClient
  ) {
    this.roles = this.authenticationService.decodeJwtToken().roles;
    //this.initializeWebSocketConnection();
    this.getCustomers();
  }


  getCustomers(pageOfUsers: number = 0, numberOfUsers: number = 10){
    this.http.get<{ "list" : Customer[] }>(`http://localhost:8080/api/users/allUsers?pageOfUsers=${pageOfUsers}&numberOfUsers=${numberOfUsers}`).subscribe(
      data => {
        console.log(data.list);
        this.Customers.next(data.list);
      }
    )
  }

  //get all messages for chosen customer his id from manager panel
getMessagesHistory(customerId: number){
  this.http.get<{ conversationId: number, user1: any, user2: any, messages: Message[] }>(`http://localhost:8080/api/users/conversationByUserId?userId=${customerId}&pageNumberOfMessages=0&pageSizeOfMessages=200`).subscribe(
    data => {
      console.log(data.messages);
      this.messageHistory = data.messages;
    }
  )
}



  initializeWebSocketConnection(chatId?: number) {
    const serverUrl = 'http://localhost:8080/socket?token=Bearer '+ this.cookieService.get('jwtToken');
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/user/topic/messages-from-manager', (message:any) => {
        if (message) {

          that.messageHistory.push(JSON.parse(message.body));
        }
      });
      that.stompClient.subscribe('/user/topic/messages-from-customers', (message:any) => {
        if (message ) {
          console.log(JSON.parse(message.body));
          console.log(chatId);
          if(JSON.parse(message.body).senderId === String(chatId)){
            console.log('message from customer passss');
            that.messageHistory.push(JSON.parse(message.body));
          }
        }
      });
    });
  }
  disconnectWebSocketConnection() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  sendMessageToCustomer(message: any) {
    this.messageHistory.push(message);
    //save message to db
    this.stompClient.send('/ws/send-message-to-customer', {}, JSON.stringify(message));
  }
  sendMessageToManager(message: any) {
    this.messageHistory.push(message);
    this.stompClient.send('/ws/send-message-to-shop-manager', {}, JSON.stringify(message));
  }

}





