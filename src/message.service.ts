import { Injectable } from '@angular/core';
import { IMessage } from './app/assets/interfaces/IMessage';

@Injectable()
export class MessageService {

  currentMessages: IMessage[] = [];
  
  addMessage(currentMessage: IMessage): void {
    this.currentMessages = [ currentMessage, ...this.currentMessages];

    setTimeout((): void => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  closeMessage(message: IMessage): void {
    this.currentMessages = this.currentMessages.filter((object: IMessage) => object !== message);
  }

};