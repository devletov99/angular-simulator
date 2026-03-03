import { Injectable } from '@angular/core';
import { IMessage } from './app/assets/interfaces/IMessage';

@Injectable()
export class MessageService {

  messages: IMessage[] = [];
  
  addMessage(currentMessage: IMessage): void {
    this.messages = [currentMessage, ...this.messages];

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  closeMessage(currentMessage: IMessage): void {
    this.messages = this.messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
  }

};