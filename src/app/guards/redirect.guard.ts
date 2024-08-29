import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  // const token: string | unknown = inject(TokenService).getToken();
  const isValidToken: string | unknown = inject(TokenService).isValidToken();
  if (isValidToken) {
    inject(Router).navigate(['/app']);
  }

  return true;
};
