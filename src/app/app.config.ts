import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { updatePreset } from '@primeuix/themes';
import Aura from "@primeuix/themes/aura";
import Nora from "@primeuix/themes/nora";
import Lara from "@primeuix/themes/lara";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Lara, 
        options: { 
          darkModeSelector: '.dark'
        }
      }
    })
  ]
};