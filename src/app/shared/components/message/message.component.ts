import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IMessage } from '../../interfaces/IMessage';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  private messageService: MessageService = inject(MessageService);
  messages$: Observable<IMessage[]> = this.messageService.messages$;
  faMessage: IconDefinition = faMessage;
  faXmark: IconDefinition = faXmark;

  closeMessage(message: IMessage): void {
    this.messageService.closeMessage(message);
  }

}
