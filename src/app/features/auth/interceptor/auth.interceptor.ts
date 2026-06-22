import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, exhaustMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);

  const token = authService.getTokens();

  if (token !== null) {
    const authReq: HttpRequest<unknown> = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${ token.accessToken }`)
    });

    return next(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return authService.refresh()
              .pipe(
                exhaustMap(() => {
                  const newToken: string | undefined = authService.getTokens()?.accessToken;
                  const retryReq: HttpRequest<unknown> = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${newToken}`)
                  });
                  return next(retryReq);
                }),
                catchError(() => {
                  authService.logout();
                  return throwError(() => error);  
                })
              )
          }
         return throwError(() => error);
        })
      );
  }

  return next(req);
};
