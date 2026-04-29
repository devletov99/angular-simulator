import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { updatePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import Aura from "@primeuix/themes/aura";
import Nora from "@primeuix/themes/nora";
import Lara from "@primeuix/themes/lara";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStorageService.getValue('dark-mode') ?? false);
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  private presetSubject: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(this.localStorageService.getValue<Preset>('preset') ?? Aura);
  preset$: Observable<Preset> = this.presetSubject.asObservable();

  setMode(value: boolean): void {
    this.isDarkModeSubject.next(value);
    this.localStorageService.setValue('dark-mode', value);
  }

  getDarkMode(): boolean {
    return this.isDarkModeSubject.getValue();
  }

  toggleMode(): void {
    this.setMode(!this.getDarkMode());
  }

  setPreset(value: Preset): void {
    this.presetSubject.next(value);
    this.localStorageService.setValue('preset', value);
  }

  getPreset(): Preset {
    return this.presetSubject.getValue();
  }

  syncPreset(): void {
    updatePreset(this.getPreset());
  }

}