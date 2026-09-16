import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { APP_CONFIG } from './app.token';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor])),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.getCurrentUser();
    }),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      }
    },
    {
      provide: APP_CONFIG,
      useValue: {
        companyName: 'HEADER.LOGO_COMPANY',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: false,
        sessionTimeout: 3600,
      }

    },
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ],
};
