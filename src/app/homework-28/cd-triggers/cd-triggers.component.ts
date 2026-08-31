import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cd-triggers',
  imports: [],
  templateUrl: './cd-triggers.component.html',
  styleUrl: './cd-triggers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdTriggersComponent {

  private http: HttpClient = inject(HttpClient);
  private cDRef = inject(ChangeDetectorRef);

  count: number = 0;

  ngDoCheck(): void {
    console.log('сработал ngDoCheck');
  }

  incrementCount(): void {
    this.count++;

    // 1. Обновился автоматически. 
    // 2. Один раз ngDoCheck. 
    // 3. Не понадобился ChangeDetectorRef.
    // 4. Событие click > изменеия байндинга в компоненте. 
  }

  countUpdateTimeout(): void {
    setTimeout(() => {
      this.count ++;
      console.log('setTimeot');
    }, 1000);

    // 1. Обновился автоматически. 
    // 2. Два раза ngDoCheck. 
    // 3. Не понадобился ChangeDetectorRef.
    // 4. Первый ngDoCheck вызвало событие click, а второе setTimeout через секунду. 
  }

  updateCountPromise(): void {
    new Promise<number>((resolve) => {
      resolve(1);
    }).then((value: number) => {
      this.count += value;
      console.log(value, this.count);
    });

    // 1. Обновился автоматически. 
    // 2. Один раз ngDoCheck. 
    // 3. Не понадобился ChangeDetectorRef.
    // 4. Событие click > изменеия байндинга в компоненте. 
  }

  updateCountInterval(): void {
    setInterval(() => {
      this.count++;
      this.cDRef.detectChanges();
    }, 1000);

    // 1. Обновился автоматически. 
    // 2. Два раза ngDoCheck (второй ngDoCheck запускается каждую секунду). 
    // 3. Не понадобился ChangeDetectorRef.
    // 4. Первый ngDoCheck вызвало событие click, а второе setInterval каждую секунду, то есть бесконечно пока не прекратим действие setInterval. 
  }

  httpIncrement(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        tap(() => this.count++),
      ).subscribe();


    // 1. Обновился автоматически. 
    // 2. Три раза ngDoCheck. 
    // 3. Не понадобился ChangeDetectorRef.
    // 4. Первый ngDoCheck вызвало событие click, второй подписка subscribe(), третий завершение http запроса.  
  }

  combinedUpdate(): void {
    this.incrementCount();
    this.countUpdateTimeout();
    this.updateCountPromise();
    this.updateCountInterval();
  }

}
