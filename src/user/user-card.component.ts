import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../app/assets/interfaces/IUser'; 
import { LowerCasePipe } from '@angular/common';
import { FormatPhonePipe } from '../pipes/format-phone.pipe';
import { AnimatedGradientDirective } from '../directive/animated-gradient.directive';

@Component({
  selector: 'app-user',
  imports: [LowerCasePipe, FormatPhonePipe, AnimatedGradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

}