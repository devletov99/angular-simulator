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

  private localStorage: LocalStorageService = inject(LocalStorageService);
  
  private modeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStorage.getValue('darkMode') ?? false);
  mode$: Observable<boolean> = this.modeSubject.asObservable();

  private presetSubject: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(this.localStorage.getValue<Preset>('preset') ?? Aura);
  preset$: Observable<Preset> = this.presetSubject.asObservable();

  setMode(value: boolean): void {
    this.modeSubject.next(value)
    this.localStorage.setValue('darkMode', value);
  }

  getMode(): boolean {
    return this.modeSubject.getValue();
  }

  toggleMode(): void {
    this.setMode(!this.getMode());
  }

  setPreset(value: Preset): void {
    this.presetSubject.next(value);
    this.localStorage.setValue('preset', value);
  }

  getPreset(): Preset {
    return this.presetSubject.getValue()
  }

  updatePrime(): void {
    updatePreset(this.getPreset())
  }

}