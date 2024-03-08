import {Component, OnInit} from '@angular/core';
import {LiveChatServiceService} from "../../services/live-chat-service.service";
import {Customer} from "../../common/customer";

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit {

  message:String = "";
  liveChatService: LiveChatServiceService;
  chosenCustomerId: number = 3;

  customers: Customer[] = [];

  showChat = false;

  constructor(liveChatService: LiveChatServiceService) {
    this.liveChatService = liveChatService;
    this.liveChatService.getMessagesHistory(this.chosenCustomerId);
  }

  sendMessageToManager(){
    if(this.message.length > 0){
      this.liveChatService.sendMessageToManager({
        receiverId: null,
        content: this.message,
        senderId: this.chosenCustomerId
      });
      this.message = "";
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

