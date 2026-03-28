import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private isLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoader$: Observable<boolean> = this.isLoaderSubject.asObservable();

  loaderOn(): void {
    this.isLoaderSubject.next(true);
    document.documentElement.style.overflow = 'hidden';
  }

  loaderOff(): void {
    this.isLoaderSubject.next(false);
    document.documentElement.style.overflow = '';
  }

};