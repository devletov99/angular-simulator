import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormatPhonePipe } from '../../pipes/format-phone.pipe';
import { PhoneFormat } from '../../enums/PhoneFormat';
import { AnimatedGradientDirective } from '../../directive/animated-gradient.directive';
import { IUser } from '../../interfaces/IUser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  imports: [UpperCasePipe, FormatPhonePipe, AnimatedGradientDirective, TranslatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  phoneFormat: typeof PhoneFormat = PhoneFormat;

}
