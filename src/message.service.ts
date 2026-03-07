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
    const messageWarn: IMessage = { type: Message.WARN, text };
    this.addMessage(messageWarn);
  }

  showError(text: string): void {
    const messageError: IMessage = { type: Message.ERROR, text };
    this.addMessage(messageError);
  }

  showSuccess(text: string): void {
    const messageSuccess: IMessage = { type: Message.SUCCESS, text };
    this.addMessage(messageSuccess);
  }

  showInfo(text: string): void {
    const messageInfo: IMessage = { type: Message.INFO,  text};
    this.addMessage(messageInfo);
  }

};