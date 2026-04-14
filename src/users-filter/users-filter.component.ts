import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-filter',
  imports: [FormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  value!: string;

  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();

  onInput(newValue: string): void {
    this.value = newValue;
    this.valueChanges.emit(newValue);
  }

}
