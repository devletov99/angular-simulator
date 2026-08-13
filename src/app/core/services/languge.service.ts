import { inject, Injectable } from '@angular/core';
import { Language, TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ILaungauge } from '../ILangauge';

@Injectable({
  providedIn: 'root',
})
export class LangugeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private translateService: TranslateService = inject(TranslateService);

  languages: ILaungauge[] = [
    {
      lang: 'English',
      value: 'en'
    },
    {
      lang: 'German',
      value: 'de'
    },
    {
      lang: 'Russian',
      value: 'ru'
    },
 
  ];

  constructor() {
    const curentLang: string | null = this.localStorageService.getItem('lang');

    if (curentLang) {
      this.translateService.use(curentLang);  
    }
  }

  changeLanguge(lang: string): void {
    this.translateService.use(lang);
    this.localStorageService.setValue('lang', lang);
  }

}
