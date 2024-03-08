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

  message:String = "";
  chosenCustomerId: number = 2;

  customers: Customer[] = [];



  constructor(protected liveChatService: LiveChatServiceService,private authenticationService: AuthenticationService) {
    this.liveChatService.getMessagesHistory(this.chosenCustomerId);
    this.authenticationService.getCurrentUserRolesRequest();
  }

  sendMessageToCustomer(){
    if(this.message.length > 0){
      this.liveChatService.sendMessageToCustomer({
        receiverId: this.chosenCustomerId,
        content: this.message,
        senderId: 1
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


  selectedUser(id: number | undefined) {
    this.chosenCustomerId = id || 3;
    this.liveChatService.getMessagesHistory(this.chosenCustomerId);
  }
}
