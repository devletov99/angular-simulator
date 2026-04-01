import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loader$: Observable<boolean> = this.isLoadingSubject.asObservable();

  loaderOn(): void {
    this.isLoadingSubject.next(true);
    document.documentElement.style.overflow = 'hidden';
  }

  loaderOff(): void {
    this.isLoadingSubject.next(false);
    document.documentElement.style.overflow = '';
  }

};