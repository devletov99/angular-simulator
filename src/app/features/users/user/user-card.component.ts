import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormat } from '../../../shared/enums/PhoneFormat';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimatedGradientDirective } from '../../../shared/directives/animated-gradient.directive';
import { FormatPhonePipe } from '../../../shared/pipes/format-phone.pipe';
import { IUser } from '../interface/IUser';

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
