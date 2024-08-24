import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from '@enviroment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  apiURL = environment.API_URL;

  constructor() { }

  getUsers() {
    const token = this.tokenService.getToken();
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(`${this.apiURL}/api/v1/users`, { headers });
  }
}
