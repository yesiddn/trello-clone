import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const token: string | unknown = inject(TokenService).getToken();
  if (token) {
    inject(Router).navigate(['/app']);
    return false;
  }

  return true;
};
