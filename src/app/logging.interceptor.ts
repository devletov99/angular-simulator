import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

const REQUEST_START_TIME: HttpContextToken<number> = new HttpContextToken(() => 0);

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const cloneReq: HttpRequest<unknown> = req.clone({
    context: req.context.set(REQUEST_START_TIME, Date.now())
  });

  const startTime: number = cloneReq.context.get(REQUEST_START_TIME);
  const duration: number = Date.now() - startTime;

  return next(cloneReq)
    .pipe(
      tap({
        next: (event: HttpEvent<unknown>): void => {
          if (event instanceof HttpResponse) {
            console.log(`Метод: ${ cloneReq.method } Статус: ${ event.status } Запрос ${ cloneReq.url } выполнился за ${ duration }ms`);
          }
        },

        error: (error: HttpErrorResponse): void => {
          const statusInfo: string = `Статус ${ error.status }`;

          console.error(`[HTTP ERROR] Метод: ${ cloneReq.method } URL: ${ cloneReq.url } ${ statusInfo } Время ${ duration }ms`);
        }
      })
    )

};