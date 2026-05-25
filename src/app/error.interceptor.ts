import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService: MessageService = inject(MessageService);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        messageService.showError(error.message);
        return throwError(() => error);
      })
    );

};
