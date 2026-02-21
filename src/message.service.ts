import { Injectable } from '@angular/core';
import { IMessage } from './app/assets/interfaces/IMessage';
import { Message } from './enums/Message';
import { filter } from 'rxjs';

@Injectable()
export class MessageService {

  currentMessages: IMessage[] = [];

  private messages: IMessage[] = [
    {
      type: Message.WARN,
      title: 'Warn',
      message: 'Программа не доступна',
    },
    {
      title: 'Info',
      type: Message.INFO,
      message: 'Стоимость отправлена на почту',
    },
    {
      title: 'Success',
      type: Message.SUCCESS,
      message: 'Направления получены',
    },
    {
      type: Message.ERROR,
      title: 'Error',
      message: 'Материалы недоступны',
    },
  ];

  constructor() {
    setInterval(() => {
      this.currentMessages = this.currentMessages.filter(m => m !== this.currentMessages[0]);
    }, 5000);
  }
  
  addMessage(type: Message): void {
    const message = this.messages.find((message: IMessage) => message.type === type);
    if (message) {
      this.currentMessages = [{ ...message }, ...this.currentMessages];
    } else {
        return;
      }
  }

  closeMessage(message: IMessage): void {
    this.currentMessages = this.currentMessages.filter(m => m !== message);
  }

}