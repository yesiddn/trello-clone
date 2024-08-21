import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  apiURL = environment.API_URL;

  constructor() { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiURL}/api/v1/auth/login`, { email, password });
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
}
