import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

// functional guards
export const authGuard: CanActivateFn = (route, state): boolean => {
  // const token: string | unknown = inject(TokenService).getToken();
  const isValidToken: string | unknown = inject(TokenService).isValidRefreshToken();
  if (!isValidToken) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
