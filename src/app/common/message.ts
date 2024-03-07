export class Message {
  content: string;
  receiverId: string;
  senderId: string;

  constructor(content: string, receiverId: string, senderId: string) {
    this.content = content;
    this.receiverId = receiverId;
    this.senderId = senderId;
  }
}
