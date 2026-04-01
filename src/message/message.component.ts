import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../app/assets/interfaces/IMessage';


@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  private messageService: MessageService = inject(MessageService);
  messages$: Observable<IMessage[]> = this.messageService.messages$;

  closeMessage(message: IMessage): void {
    this.messageService.closeMessage(message);
  }

};