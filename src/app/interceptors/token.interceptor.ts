import {
  HttpContext,
  HttpContextToken,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

// es buena practica crear contextos para los tokens
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  // se asigna el contexto
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TOKEN)) {
    const tokenService = inject(TokenService);
    const accessToken = tokenService.getToken();

    if (accessToken) {
      // se clona el request y se le agrega el header de Authorization
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next(authRequest);
    }
    return next(req);
  }
  return next(req);
};
