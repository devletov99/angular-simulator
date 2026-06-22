import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  
  const authService: AuthService = inject(AuthService);

  const isAuth: boolean = authService.isAuthenticated();

  if (isAuth) {
    return router.createUrlTree([''])
  }

  return true
};
