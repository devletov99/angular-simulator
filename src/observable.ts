import { filter, interval, map, Observable, of, take } from "rxjs";

export const obs$ = new Observable<string>(observer => {
  observer.next('Hello');
	observer.next('RxJS');
	observer.complete();
});

obs$.subscribe({
	next: (value) => console.log(value),
	complete: () => console.log('Поток завершён'),
});

const num$ = of(1, 2, 3, 4, 5);

num$.pipe(
	map(num => num * 10),
);

num$.subscribe(console.log);

const evenNumbers$: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8);

evenNumbers$.pipe(
	filter(num => num % 2 === 0),
);

evenNumbers$.subscribe(console.log);

const inter$: Observable<number> = interval(1000).pipe(
	take(5),
);

inter$.subscribe(nuber$ => console.log(nuber$));