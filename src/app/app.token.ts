import { InjectionToken } from '@angular/core';
import { IAppConfig } from './shared/interfaces/IAppConfig';

export const APP_CONFIG: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('APP_CONFIG');