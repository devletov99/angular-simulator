import { Component, signal } from '@angular/core';
import { ILogin } from '../ILogin';
import { form, FormField } from '@angular/forms/signals';


@Component({
  selector: 'app-signal-forms',
  imports: [FormField],
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss',
})
export class SignalFormsComponent {

  loginModel = signal<ILogin>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);

}
