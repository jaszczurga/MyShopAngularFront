import {Component, OnInit} from '@angular/core';
import {Message} from "../../common/message";
import {LiveChatServiceService} from "../../services/live-chat-service.service";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit {
  messagesFromManager: {content:String}[] = [];
  messagesFromCustomer: {content:String}[] = [];
  messageManager : string = "";
  messageCustomer : string = "";
  liveChatService: LiveChatServiceService;

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




    // this.liveChatService.getMessagesFromManager().subscribe(data => {
    //   this.messagesFromManager.push(data);
    // });
    //
    // this.liveChatService.getMessagesFromCustomer().subscribe(data => {
    //   this.messagesFromCustomer.push(data);
    // });
  }

  // sendMessageToManager() {
  //   const message = new Message(this.message, 'managerId', 'customerId');
  //   this.liveChatService.sendMessageToManager(message);
  // }
  //
  // sendMessageToCustomer() {
  //   const message = new Message(this.message, "3", "3");
  //   this.liveChatService.sendMessageToCustomer(message);
  // }
}
