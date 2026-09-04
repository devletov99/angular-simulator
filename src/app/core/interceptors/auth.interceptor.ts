import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { IToken } from '../../features/auth/interfaces/IToken';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService: AuthService = inject(AuthService);

  const token: IToken | null = authService.getTokens();

  if (!token) {
    return next(req);
  }

  const authReq: HttpRequest<unknown> = addToken(req, token.accessToken);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresh().pipe(
          exhaustMap(() => {
            const newToken: string | undefined = authService.getTokens()?.accessToken;

            if (!newToken) {
              authService.logout();
              return throwError(() => error);
            }
            const retryReq: HttpRequest<unknown> = addToken(req, newToken);
            return next(retryReq);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};

const addToken = (req: HttpRequest<unknown>, token: string | undefined): HttpRequest<unknown> =>
  req.clone({
    headers: req.headers.set('Authorization', `Bearer ${ token }`),
  });
