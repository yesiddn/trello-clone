import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { TokenService } from './token.service';
import { environment } from '@enviroment';
import { User } from '../model/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  // private tokenService = inject(TokenService);
  apiURL = environment.API_URL;

  constructor() { }

  getUsers() {
    // const token = this.tokenService.getToken();
    // let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // ahora todas las peticiones que hagamos a la API y que queramos que se envíe el token, debemos pasar el contexto checkToken()
    return this.http.get<User[]>(`${this.apiURL}/api/v1/users`, { context: checkToken() });
  }
}
