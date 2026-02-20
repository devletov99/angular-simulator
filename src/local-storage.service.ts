import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  
  setValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: string): T | null {
   const value = localStorage.getItem(key); 
   
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  removeElement(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}