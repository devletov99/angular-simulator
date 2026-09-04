import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  destroyRef: DestroyRef = inject(DestroyRef);

  formControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  @Output() filterUser: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap((value: string) => this.filterUser.emit(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

}
