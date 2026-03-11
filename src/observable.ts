import { filter, interval, map, Observable, of, Subscriber, take } from "rxjs";

export const obs$ = new Observable<string>((observer: Subscriber<string>) => {
  observer.next('Hello');
	observer.next('RxJS');
	observer.complete();
})
obs$.subscribe({
	next: (value: string) => console.log(value),
	complete: (): void => console.log('Поток завершён'),
});

const num$: Observable<number> = of(1, 2, 3, 4, 5);

num$.pipe(
	map((num: number) => num * 10),
).subscribe(console.log);

const evenNumbers$: Observable<number> = of(1, 2, 3, 4, 5, 6, 7, 8);

evenNumbers$.pipe(
	filter((num: number) => num % 2 === 0),
).subscribe(console.log);

interval(1000).pipe(
	take(5),
).subscribe((value: number) => console.log(value));