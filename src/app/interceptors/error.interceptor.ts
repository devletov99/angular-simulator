import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { APP_CONFIG } from '../app.token';
import { IAppConfig } from '../interfaces/IAppConfig';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);

  const appConfig: IAppConfig = inject(APP_CONFIG);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (appConfig.enableNotifications && error.status >= 500 && error.status < 600) {
        messageService.showError(error.message);
      }
      return throwError(() => error);
    }),
  );
};
