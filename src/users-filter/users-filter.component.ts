import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { debounce } from '@angular/forms/signals';
import { BehaviorSubject, debounceTime, delay, distinctUntilChanged, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  inputValue: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  
  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputValue.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value: string) => this.onFilter.emit(value))
    ).subscribe();
  }

}