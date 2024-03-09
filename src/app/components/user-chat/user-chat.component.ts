import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LiveChatServiceService} from "../../services/live-chat-service.service";
import {Customer} from "../../common/customer";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent implements OnInit {

  message:String = "";

  chosenCustomerId: number= 2;

  showChat = false;

  constructor(protected liveChatService: LiveChatServiceService, private authenticationService: AuthenticationService) {
  }

  @ViewChild('chatContainer', { static: false }) private chatContainer!: ElementRef;


  scrollToBottom(): void {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
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
    this.scrollToBottom();
  }

  ngOnInit(): void {

    this.authenticationService.getCurrentUserRolesRequest();
    this.authenticationService.getCurrentUserId();
    this.authenticationService.CurrentUserId.subscribe(
      data => {
        this.chosenCustomerId = parseInt(data);
        this.liveChatService.getMessagesHistory(this.chosenCustomerId);
      }
    );
    if(this.authenticationService.decodeJwtToken().roles === 'USER') {
      this.liveChatService.disconnectWebSocketConnection();
      this.liveChatService.initializeWebSocketConnection();
    }
  }

}

