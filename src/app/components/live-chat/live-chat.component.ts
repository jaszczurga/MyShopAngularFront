import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  chosenCustomerId: number = 0;
  chosenCustomerChatListNumber: number = 0


  customers: Customer[] = [];


  @ViewChild('chatContainer', { static: false }) private chatContainer!: ElementRef;
  constructor(protected liveChatService: LiveChatServiceService,private authenticationService: AuthenticationService) {
    this.liveChatService.getMessagesHistory(this.chosenCustomerId);
    this.authenticationService.getCurrentUserRolesRequest();
  }

  scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
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
    this.scrollToBottom();
  }



  ngOnInit(): void {
      this.liveChatService.Customers.subscribe(
        data => {
          this.customers = data;
        }
      );
      this.liveChatService.disconnectWebSocketConnection();
      this.liveChatService.initializeWebSocketConnection(this.chosenCustomerId);
}


  selectedUser(id: number | undefined) {
    this.chosenCustomerId = id || 0;
    this.chosenCustomerChatListNumber = this.customers.findIndex((c:Customer) => c.id==id)
    this.liveChatService.getMessagesHistory(this.chosenCustomerId);
    this.liveChatService.disconnectWebSocketConnection();
    this.liveChatService.initializeWebSocketConnection(this.chosenCustomerId);
  }
}
