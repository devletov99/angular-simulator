import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { AuthRole } from '../../features/auth/enums/authRole';

export const adminGuard: CanActivateFn = () => {
  const router: Router = inject(Router);

  const authService: AuthService = inject(AuthService);

  if (authService.getUser()?.role === AuthRole.ADMIN) {
    return true;
  }

  return router.createUrlTree(['/']);
};
