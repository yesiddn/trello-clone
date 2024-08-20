import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@enviroment';

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
}
