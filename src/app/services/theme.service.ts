import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { updatePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { IPresetOption } from '../interfaces/IPresetOption';
import { LocalStorageService } from './local-storage.service';
import { APP_CONFIG } from '../app.token';
import { IAppConfig } from '../interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private appConfig: IAppConfig = inject(APP_CONFIG);

  presetOption: IPresetOption[] = [
    {
      name: 'Aura',
      value: Aura,
    },
    {
      name: 'Lara',
      value: Lara,
    },
    {
      name: 'Nora',
      value: Nora,
    },
  ];

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.localStorageService.getValue('dark-mode') ?? false,
  );

  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  private presetSubject: BehaviorSubject<Preset> = new BehaviorSubject<Preset>(
    this.localStorageService.getValue<Preset>('preset') ?? {},
  );

  preset$: Observable<Preset> = this.presetSubject.asObservable();

  constructor() {
    const isDark: boolean = this.getDarkMode();
    document.documentElement.classList.toggle('dark', isDark);
  }

  setMode(value: boolean): void {
    if (!this.appConfig.enableTheming) {
     return;
    }

    this.isDarkModeSubject.next(value);
    this.localStorageService.setValue('dark-mode', value);
    document.documentElement.classList.toggle('dark', value);
  }

  getDarkMode(): boolean {
    return this.isDarkModeSubject.getValue();
  }

  setPreset(value: Preset): void {
    if (!this.appConfig.enableTheming) {
     return;
    }

    this.presetSubject.next(value);
    this.localStorageService.setValue('preset', value);
    updatePreset(this.getPreset());
  }

  getPreset(): Preset {
    return this.presetSubject.getValue();
  }

}
