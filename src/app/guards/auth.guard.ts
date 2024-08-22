import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

// functional guards
export const authGuard: CanActivateFn = (route, state): boolean => {
  const token: string | unknown = inject(TokenService).getToken();
  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
