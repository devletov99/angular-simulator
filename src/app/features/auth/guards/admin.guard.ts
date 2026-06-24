import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const authService: AuthService = inject(AuthService);
  
  if (authService.getUser()?.role === 'admin') {
    return true;
  }

  return router.navigate(['/']);
};
