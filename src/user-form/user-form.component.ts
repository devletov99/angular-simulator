import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../app/assets/interfaces/IUser';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
 
  @Input() userForm!: FormGroup;
  @Output() submitForm: EventEmitter<IUser> = new EventEmitter<IUser>();

  onSubmit() {
    this.submitForm.emit(this.userForm.getRawValue());
  }
}