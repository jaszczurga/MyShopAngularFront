import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "./authentication.service";
import {Customer} from "../common/customer";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {ProductCategory} from "../common/product-category";

declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class LiveChatServiceService {

  public stompClient: any;
  public msgManager :String[] = [];
  public msgCustomer :String[] = [];
  public roles: string = 'USER';
  Customers: Subject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(private cookieService: CookieService,
              private authenticationService: AuthenticationService,
              private http: HttpClient
  ) {
    this.roles = this.authenticationService.decodeJwtToken().roles;
    this.initializeWebSocketConnection();
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





