import {Component, OnInit} from '@angular/core';
import {Message} from "../../common/message";
import {LiveChatServiceService} from "../../services/live-chat-service.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Customer} from "../../common/customer";


@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit {
  messagesFromManager: {content:String}[] = [];
  messagesFromCustomer: {content:String}[] = [];
  messagesHistory: String[] = [];
  messageManager : string = "";
  messageCustomer : string = "";
  liveChatService: LiveChatServiceService;

  customers: Customer[] = [];



  constructor(liveChatService: LiveChatServiceService) {
    this.liveChatService = liveChatService;
  }

  sendMessageToCustomer(){
    if(this.messageManager.length > 0){
      this.liveChatService.sendMessageToCustomer({
        receiverId: 3,
        content: this.messageManager,
        senderId: 3
      });
      this.messageManager = "";
    }
  }



  sendMessageToManager(){
    if(this.messageCustomer.length > 0){
      this.liveChatService.sendMessageToManager({
        content: this.messageCustomer,
        senderId: 3
      });
      this.messageCustomer = "";
    }
  }

  ngOnInit(): void {
      this.liveChatService.Customers.subscribe(
        data => {
          this.customers = data;
        }
      );
}


}
