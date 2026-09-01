import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  const authService: AuthService = inject(AuthService);

  const isAuth: boolean = authService.isAuthenticated();

  if (isAuth) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
