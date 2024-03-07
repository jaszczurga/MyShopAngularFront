import {Component, OnInit} from '@angular/core';
import {Message} from "../../common/message";
import {LiveChatServiceService} from "../../services/live-chat-service.service";

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit {
  messagesFromManager: {content:String}[] = [];
  messagesFromCustomer: {content:String}[] = [];
  message : string = '';

  constructor(private liveChatService: LiveChatServiceService) {
  }

  ngOnInit(): void {
    this.liveChatService.getMessagesFromManager().subscribe(data => {
      this.messagesFromManager.push(data);
    });

    this.liveChatService.getMessagesFromCustomer().subscribe(data => {
      this.messagesFromCustomer.push(data);
    });
  }

  sendMessageToManager() {
    const message = new Message(this.message, 'managerId', 'customerId');
    this.liveChatService.sendMessageToManager(message);
  }

  sendMessageToCustomer() {
    const message = new Message(this.message, "3", "3");
    this.liveChatService.sendMessageToCustomer(message);
  }
}
