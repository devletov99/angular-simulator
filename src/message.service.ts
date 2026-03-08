import { Injectable } from '@angular/core';
import { IMessage } from './app/assets/interfaces/IMessage';
import { Message } from './enums/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: IMessage[] = [];

  
  private addMessage(currentMessage: IMessage): void {
    this.messages = [currentMessage, ...this.messages];

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  closeMessage(currentMessage: IMessage): void {
    this.messages = this.messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
  }

  showWarn(text: string): void {
    this.addMessage({ type: Message.WARN, text });
  }

  showError(text: string): void {
    this.addMessage({ type: Message.ERROR, text });
  }

  showSuccess(text: string): void {
    this.addMessage({ type: Message.SUCCESS, text });
  }

  showInfo(text: string): void {
    this.addMessage({ type: Message.INFO,  text });
  }

};