import { Component, DestroyRef, inject, OnInit, output, OutputEmitterRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  readonly formControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  readonly productSearch: OutputEmitterRef<string> = output<string>();

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(300),
        map((value: string) => value.toLowerCase().trim()),
        distinctUntilChanged(),
        tap((value: string) => this.productSearch.emit(value)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
  }

}
