import { Injectable } from '@angular/core';
import { IMessage } from './app/assets/interfaces/IMessage';
import { Message } from './app/enums/Message';
import { BehaviorSubject, Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();
  
  private addMessage(currentMessage: IMessage): void {
    this.messagesSubject.next([currentMessage, ...this.messagesSubject.getValue()]);

    setTimeout(() => {
      this.closeMessage(currentMessage);
    }, 5000);
  }

  closeMessage(currentMessage: IMessage): void {
    const messages: IMessage[] = this.messagesSubject.value;
    const message: IMessage[] = messages.filter((messageToRemove: IMessage) => messageToRemove !== currentMessage);
    this.messagesSubject.next(message);
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