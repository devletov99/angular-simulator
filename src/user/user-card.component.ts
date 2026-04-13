import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../app/assets/interfaces/IUser'; 

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input() user!: IUser;
  @Output() deletUser: EventEmitter<IUser> = new EventEmitter<IUser>();

}