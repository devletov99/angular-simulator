import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean> = this.loaderSubject.asObservable();

  loaderOn() {
    this.loaderSubject.next(true);
    document.documentElement.style.overflow = 'hidden';
  }

  loaderOff(): void {
    this.loaderSubject.next(false);
    document.documentElement.style.overflow = '';
  }

};