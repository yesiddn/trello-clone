import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroment';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  apiURL = environment.API_URL;

  constructor() { }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiURL}/api/v1/auth/login`, { email, password })
      .pipe(
      // otro metodo de rxjs que nos permite hacer algo con la respuesta, en este caso guardar el token
        // tap es un operador que nos permite hacer algo antes de devolver la respuesta sin afectar el flujo de datos
        tap(response => {
          this.tokenService.saveToken(response.access_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, { name, email, password });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password)
      .pipe(
        switchMap(() => this.login(email, password)) //muchas veces necesitas hacer un solicitud y con la información devuelta hacer otra, el switchMap nos permite hacer esto de forma asíncrona, muy similar al PromiseAll
      );
  }

  isAvailable(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiURL}/api/v1/auth/is-available`, { email });
  }

  recovery(email: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/recovery`, { email });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/change-password`, { token, newPassword });
  }

  logout() {
    this.tokenService.removeToken();
  }
}
