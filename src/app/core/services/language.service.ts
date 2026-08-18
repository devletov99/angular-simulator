import { DestroyRef, inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ILanguage } from '../interfaces/ILanguage';
import { Language } from '../enums/Language';
import { PrimeNG } from 'primeng/config';
import { tap } from 'rxjs';
import { Translation } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private translateService: TranslateService = inject(TranslateService);
  private primeNG: PrimeNG = inject(PrimeNG);
  private destroyRef: DestroyRef = inject(DestroyRef);
  languages!: ILanguage[];
  currentLang: string | null = this.localStorageService.getItem('lang');

  constructor() {
    if (this.currentLang) {
      this.translateService.use(this.currentLang);  
    }

    this.translatePrime();
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.localStorageService.setValue('lang', lang);
  }
  
  translatePrime(): void {
    this.translateService.stream('PRIME_NG')
      .pipe(
        tap((lang: Translation) => this.primeNG.setTranslation(lang)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
  }

}
  