import { Injectable } from '@angular/core';
import { IMessage } from './app/assets/interfaces/IMessage';
import { Message } from './enums/Message';

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
      this.currentMessages.pop();
    }, 5000);
  }
  
  addMessage(type: Message): void {
    const message = this.messages.find((message: IMessage) => message.type === type);
    if (message) {
      this.currentMessages.unshift({ ...message });
    } else {
        return;
      }
  }

  closeMessage(index: number): void {
    this.currentMessages.splice(index, 1);
  }

}
