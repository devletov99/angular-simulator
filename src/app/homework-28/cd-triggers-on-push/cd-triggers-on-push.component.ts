import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { interval, tap } from 'rxjs';
import { CdTriggersComponent } from '../cd-triggers/cd-triggers.component';

@Component({
  selector: 'app-cd-triggers-on-push',
  templateUrl: './cd-triggers-on-push.component.html',
  styleUrl: './cd-triggers-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdTriggersOnPushComponent { 
   
  private http: HttpClient = inject(HttpClient);
  private cDRef = inject(ChangeDetectorRef);

  count: number = 0;

  ngDoCheck(): void {
    console.log('Chenge Detection');
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
      this.cDRef.markForCheck();
    }, 1000);

    // 1. Компонент и его родители были помеены diry, то есть выставляет флаг чтобы angular на втором цикле проверил этот компонет. 
    // 2. Нет, не обновился. Только на втором цикле
    // 3. После колбека setTimeout zone.js перехватывает макрозадачу и запускает проверку.
    // 4. При CD OnPush setTimeout не вызывает проверку изменеий в данном компоненте и из за этого интерфейс не обновляется. Для того чтобы вызвать проверку изменений нам нужно вручную пометить компонент dirty внутри setTimeout, вызвав markForCheck. 
  }

  updateCountPromise(): void {
    Promise.resolve().then(() => {
      this.count ++;
    });

    // 1. Обновился автоматически. 
    // 2. Один раз ngDoCheck, из за нажатии на click. 
    // 3. Не понадобился ChangeDetectorRef.
    // 4. Событие click. 
  }

  updateCountInterval(): void {
    setInterval(() => {
      this.count++;
      this.cDRef.detectChanges();
    }, 1000);

    // 1. detectChanges говорит angular чтобы он немедленно проверил компонент и его дочерние компонеты, то есть проверка идёт сверху вниз и ещё одно отличие, то что не вызывается ngDoCheck. ngDoCheck вызовится у дочерних компонентов. 
    // 2. Да, выполнится сразу. 
    // 3. Этот компонент и все дочерние.
    // 4. Использованеие detecteChanges() предподчтителен в тех случаях, когда необходимо локально и сразу обновить ui для конкретного компонента и его дочерних элементов, не запуская при этом глобальную проверку во всём приложении. 
  }

  httpIncrement(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        tap(() => { 
          this.count++;
          this.cDRef.markForCheck();
        }),
      ).subscribe();
      
    // 1. Не обновился автоматически. 
    // 2. Два раза выполнился ngDoCheck. 
    // 3. Понадобился ChangeDetectorRef.
    // 4. Первый ngDoCheck вызвало событие click, второй завершающий HTTP запрос.  
  }

  combinedUpdate(): void {
    this.incrementCount();
    this.countUpdateTimeout();
    this.updateCountPromise();
    this.updateCountInterval();
  }

  disableDetection() {
    this.cDRef.detach();

    // интерфейс обновляется где вызывается detecteChanges(). 
    // ngDoCheck выполняется у click и detectChamges(). 
    // Потому что мы выключили проверку изменения. 
    // Ни один из способов не работает, если не вызвать detectChanges().
  }

  turnOnDetection() {
    this.cDRef.reattach();

    // Angular возвращает компонент в дерево проверок. 
    // Сразу же при выполнении этого метода. 
    // Нет, не нужно вызывать detectChanges() или markForCheck(), если только нужно обновить компонент. 
  }

}
